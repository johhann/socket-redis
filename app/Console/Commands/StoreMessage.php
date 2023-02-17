<?php

namespace App\Console\Commands;

use App\Events\TestEvent;
use Illuminate\Console\Command;

class StoreMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'message:store {argument}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Store message to database';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // save to database
        $argument = $this->argument('argument');

        $data  = [
            'messageId' => str()->uuid(),
            'message' => $argument,
            'time' => now()
        ];
        //save

        event(new TestEvent($data));
    }
}
