<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

final class TestGitHubConnection extends Command
{
    protected $signature = 'github:test';

    protected $description = 'Test GitHub API connection and token';

    public function handle(): int
    {
        /** @var string|null $repo */
        $repo = config('services.github.repository');
        /** @var string|null $token */
        $token = config('services.github.token');

        $this->info('=== GitHub Configuration ===');
        $this->line('Repository: '.($repo ?? 'NOT SET'));
        $this->line('Token: '.($token ? (mb_strlen($token).' characters') : 'NOT SET'));
        $this->newLine();

        if (! $repo || ! $token) {
            $this->error('❌ Repository or token not configured!');
            $this->info('Add these to your .env file:');
            $this->line('GITHUB_REPOSITORY=bicol-chd-ict-webdev/bamis-v2');
            $this->line('GITHUB_TOKEN=your_token_here');

            return 1;
        }

        $this->info('=== Testing GitHub API ===');

        try {
            $url = sprintf('https://api.github.com/repos/%s/releases/latest', $repo);
            $this->line('URL: '.$url);
            $this->newLine();

            $response = Http::withHeaders([
                'Accept' => 'application/vnd.github+json',
                'Authorization' => 'Bearer '.$token,
                'X-GitHub-Api-Version' => '2022-11-28',
            ])
                ->timeout(10)
                ->get($url);

            $this->line('Status: '.$response->status());

            if ($response->successful()) {
                /** @var array<string, mixed> $release */
                $release = $response->json();
                $this->newLine();
                $this->info('✓ Successfully fetched release!');
                $this->table(
                    ['Field', 'Value'],
                    [
                        ['Tag', $release['tag_name'] ?? 'N/A'],
                        ['Name', $release['name'] ?? 'N/A'],
                        ['Published', $release['published_at'] ?? 'N/A'],
                        ['URL', $release['html_url'] ?? 'N/A'],
                    ]
                );

                return 0;
            }

            $this->error('❌ API request failed!');
            $this->newLine();
            $this->line('Response body:');
            $this->line($response->body());

            /** @var array<string, mixed> $json */
            $json = $response->json();
            if (isset($json['message']) && is_string($json['message'])) {
                $this->newLine();
                $this->error('Error: '.$json['message']);

                if (str_contains($json['message'], 'Not Found')) {
                    $this->warn('The repository might not exist or the token lacks access.');
                }

                if (str_contains($json['message'], 'Bad credentials')) {
                    $this->warn('The GitHub token is invalid.');
                }
            }

            return 1;

        } catch (Exception $exception) {
            $this->error('❌ Exception occurred!');
            $this->error($exception->getMessage());

            return 1;
        }
    }
}
