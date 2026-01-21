<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * @phpstan-type ReleaseData array{tag_name: string, name: string, published_at: string, url: string, source: string}
 */
final class GithubReleaseService
{
    private const string CACHE_KEY = 'github_latest_release';

    private const int CACHE_TTL = 3600;

    /**
     * Simple method that returns just the version string
     */
    public static function getLatestVersion(): string
    {
        /** @var ReleaseData $release */
        $release = resolve(self::class)->fetchLatest();

        return $release['tag_name'];
    }

    public static function clearCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    /**
     * Full method that returns all release data
     *
     * @return array{tag_name: string, name: string, published_at: string, url: string, source: string}
     */
    public function fetchLatest(): array
    {
        /** @var array{tag_name: string, name: string, published_at: string, url: string, source: string} $release */
        $release = Cache::remember(self::CACHE_KEY, self::CACHE_TTL, function (): array {
            /** @var string|null $repo */
            $repo = config('services.github.repository');
            /** @var string|null $token */
            $token = config('services.github.token');

            if ($repo === null || $token === null || $repo === '' || $token === '') {
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
                    Log::warning('GitHub release fetch failed', ['body' => $response->body()]);

                    return $this->fallbackVersion('GitHub API error.');
                }

                /** @var array<string, mixed> $release */
                $release = $response->json();

                $tagName = isset($release['tag_name']) && is_string($release['tag_name'])
                    ? $release['tag_name']
                    : 'Unknown';

                $name = isset($release['name']) && is_string($release['name'])
                    ? $release['name']
                    : '';

                $publishedAt = isset($release['published_at']) && is_string($release['published_at'])
                    ? $release['published_at']
                    : now()->toIso8601String();

                $url = isset($release['html_url']) && is_string($release['html_url'])
                    ? $release['html_url']
                    : '';

                return [
                    'tag_name' => $tagName,
                    'name' => $name,
                    'published_at' => $publishedAt,
                    'url' => $url,
                    'source' => 'github',
                ];
            } catch (Throwable $throwable) {
                Log::error('Failed to fetch latest GitHub release', ['error' => $throwable->getMessage()]);

                return $this->fallbackVersion('Network or timeout error.');
            }
        });

        return $release;
    }

    /**
     * @return array{tag_name: string, name: string, published_at: string, url: string, source: string}
     */
    private function fallbackVersion(string $reason): array
    {
        /** @var string|null $version */
        $version = config('app.version');

        if ($version === null || $version === '') {
            $composerPath = base_path('composer.json');
            if (file_exists($composerPath)) {
                /** @var array<string, mixed>|null $composer */
                $composer = json_decode((string) file_get_contents($composerPath), true);
                if (is_array($composer) && isset($composer['version']) && is_string($composer['version'])) {
                    $version = $composer['version'];
                }
            }
        }

        $version = $version !== null && $version !== '' ? $version : 'v1.0.0';

        Log::info('Using fallback version', ['version' => $version, 'reason' => $reason]);

        return [
            'tag_name' => $version,
            'name' => 'Local version',
            'published_at' => now()->toIso8601String(),
            'url' => '',
            'source' => 'fallback',
        ];
    }
}
