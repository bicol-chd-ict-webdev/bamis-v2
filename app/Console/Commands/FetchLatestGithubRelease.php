<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Services\GithubReleaseService;
use Illuminate\Console\Command;

final class FetchLatestGithubRelease extends Command
{
    protected $signature = 'github:fetch-latest-release';

    protected $description = 'Fetch and cache the latest GitHub release for display on the login page.';

    public function handle(GithubReleaseService $github): int
    {
        $release = $github->fetchLatest();

        $this->info('✅ Latest release fetched successfully:');
        $this->line('Tag: '.$release['tag_name']);
        $this->line('Name: '.$release['name']);
        $this->line('Published: '.$release['published_at']);
        $this->line('URL: '.$release['url']);
        $this->line('Source: '.$release['source']);

        return self::SUCCESS;
    }
}
