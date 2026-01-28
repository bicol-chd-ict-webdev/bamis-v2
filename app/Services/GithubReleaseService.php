<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * @phpstan-type ReleaseData array{
 *     tag_name: string,
 *     name: string,
 *     published_at: string,
 *     url: string,
 *     source: string
 * }
 */
final class GithubReleaseService
{
    private const string CACHE_KEY = 'github_latest_release';

    private const string CACHE_LOCK_KEY = 'github_latest_release_lock';

    public static function getLatestVersion(): string
    {
        /** @var array{tag_name: string, name: string, published_at: string, url: string, source: string} $release */
        $release = resolve(self::class)->fetchLatest();

        return $release['tag_name'];
    }

    public static function clearCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    /**
     * Cached forever — no background refresh
     *
     * @return array{tag_name: string, name: string, published_at: string, url: string, source: string}
     */
    public function fetchLatest(): array
    {
        /** @var array{tag_name: string, name: string, published_at: string, url: string, source: string} $cached */
        $cached = Cache::rememberForever(self::CACHE_KEY, function (): array {
            /** @var array{tag_name: string, name: string, published_at: string, url: string, source: string} $result */
            $result = Cache::lock(self::CACHE_LOCK_KEY, 10)
                ->block(5, fn (): array => $this->fetchFromGithub());

            return $result;
        });

        return $cached;
    }

    /**
     * Force refresh (used by command)
     *
     * @return array{tag_name: string, name: string, published_at: string, url: string, source: string}
     */
    public function refresh(): array
    {
        Cache::forget(self::CACHE_KEY);

        return $this->fetchLatest();
    }

    /**
     * Actually performs the GitHub API request
     *
     * @return array{tag_name: string, name: string, published_at: string, url: string, source: string}
     */
    private function fetchFromGithub(): array
    {
        $repo = config('services.github.repository');
        $token = config('services.github.token');

        if (! is_string($repo) || ! is_string($token)) {
            return $this->fallbackVersion('Missing repository or token configuration.');
        }

        try {
            $response = Http::withHeaders([
                'Accept' => 'application/vnd.github+json',
                'Authorization' => 'Bearer '.$token,
                'X-GitHub-Api-Version' => '2022-11-28',
            ])
                ->timeout(5)
                ->get(sprintf('https://api.github.com/repos/%s/releases/latest', $repo));

            if (! $response->successful()) {
                Log::warning('GitHub release fetch failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return $this->fallbackVersion('GitHub API error.');
            }

            /** @var array<string, mixed> $release */
            $release = $response->json();

            return [
                'tag_name' => is_string($release['tag_name'] ?? null)
                    ? $release['tag_name']
                    : 'Unknown',

                'name' => is_string($release['name'] ?? null)
                    ? $release['name']
                    : '',

                'published_at' => is_string($release['published_at'] ?? null)
                    ? $release['published_at']
                    : now()->toIso8601String(),

                'url' => is_string($release['html_url'] ?? null)
                    ? $release['html_url']
                    : '',

                'source' => 'github',
            ];
        } catch (Throwable $throwable) {
            Log::error('Failed to fetch latest GitHub release', [
                'error' => $throwable->getMessage(),
            ]);

            return $this->fallbackVersion('Network or timeout error.');
        }
    }

    /**
     * @return array{tag_name: string, name: string, published_at: string, url: string, source: string}
     */
    private function fallbackVersion(string $reason): array
    {
        $version = config('app.version');

        if (! is_string($version)) {
            $composerPath = base_path('composer.json');
            if (file_exists($composerPath)) {
                $composer = json_decode(
                    (string) file_get_contents($composerPath),
                    true
                );

                if (is_array($composer) && is_string($composer['version'] ?? null)) {
                    $version = $composer['version'];
                }
            }
        }

        if (! is_string($version)) {
            $version = 'v1.0.0';
        }

        Log::info('Using fallback version', [
            'version' => $version,
            'reason' => $reason,
        ]);

        return [
            'tag_name' => $version,
            'name' => 'Local version',
            'published_at' => now()->toIso8601String(),
            'url' => '',
            'source' => 'fallback',
        ];
    }
}
