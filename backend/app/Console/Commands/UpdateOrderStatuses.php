<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Order;
use App\Enums\OrderStatus;
use Illuminate\Support\Facades\Date;

class UpdateOrderStatuses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'orders:update-statuses';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update order statuses from new to driving and from driving to completed';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $now = Date::now();

        // Orders created more than a minute ago move from "new" to "driving".
        Order::where('status', OrderStatus::New)
            ->where('created_at', '<=', $now->clone()->subMinute())
            ->update(['status' => OrderStatus::Driving]);

        // Orders that have been in "driving" status for more than a minute
        // (i.e. created more than two minutes ago) move to "completed".
        Order::where('status', OrderStatus::Driving)
            ->where('created_at', '<=', $now->clone()->subMinutes(2))
            ->update(['status' => OrderStatus::Completed]);

        return Command::SUCCESS;
    }
}
