<?php

declare(strict_types=1);

namespace App\Events;

use App\Models\Report;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

final class ReportUpdated implements ShouldBroadcastNow
{
    use Dispatchable;

    use InteractsWithSockets;

    use SerializesModels;

    public function __construct(
        public readonly Report $report,
        public ?string $downloadUrl = null,
    ) {}

    /**
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('reports'),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->report->id,
            'filename' => $this->report->filename,
            'type' => $this->report->type,
            'status' => $this->report->status->value,
            'error' => $this->report->error,
            'expires_at' => $this->report->expires_at,
            'download_link' => $this->report->download_link,
        ];
    }

    public function broadcastAs(): string
    {
        return 'report.updated';
    }
}
