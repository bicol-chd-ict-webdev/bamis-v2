<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Services\GithubReleaseService;
use Illuminate\Console\Command;

final class RefreshGithubRelease extends Command
{
    protected $signature = 'github:refresh-release';

    protected $description = 'Refresh cached GitHub latest release';

    public function handle(GithubReleaseService $service): int
    {
        $this->info('Refreshing GitHub release cache...');

        $release = $service->refresh();

        $this->info('✓ GitHub release cache refreshed successfully');
        $this->newLine();

        $this->table(
            ['Field', 'Value'],
            [
                ['Tag', $release['tag_name']],
                ['Name', $release['name']],
                ['Published', $release['published_at']],
                ['Source', $release['source']],
            ]
        );

        return self::SUCCESS;
    }
}
