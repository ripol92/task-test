<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Order;
use App\Enums\OrderStatus;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Date;

class OrderControllerTest extends TestCase
{
    public function test_order_can_be_created()
    {
        // Example payload for creating an order
        $payload = [
            'passenger_phone' => '555-1111',
            'from_address' => 'A street',
            'from_lat' => 10.0,
            'from_lng' => 20.0,
            'to_address' => 'B street',
            'to_lat' => 30.0,
            'to_lng' => 40.0,
        ];

        // Make request to the store endpoint
        $response = $this->postJson('/api/order', $payload);

        $response->assertCreated();
        $this->assertSame(OrderStatus::New->value, $response['status']);
        $this->assertDatabaseHas('orders', [
            'passenger_phone' => '555-1111',
            'status' => OrderStatus::New->value,
        ]);
    }

    public function test_order_can_be_canceled()
    {
        $order = Order::create([
            'id' => (string) Str::uuid(),
            'created_at' => Date::now(),
            'passenger_phone' => '555-2222',
            'from_address' => 'A',
            'from_lat' => 1,
            'from_lng' => 2,
            'to_address' => 'B',
            'to_lat' => 3,
            'to_lng' => 4,
            'status' => OrderStatus::New,
        ]);

        $response = $this->deleteJson('/api/order/'.$order->id);

        $response->assertNoContent();
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => OrderStatus::Canceled->value,
        ]);
    }
}
