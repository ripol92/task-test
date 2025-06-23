<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Enums\OrderStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    // POST /order
    public function store(Request $request)
    {
        $data = $request->validate([
            'passenger_phone' => 'required|string',
            'from_address' => 'required|string',
            'from_lat' => 'required|numeric',
            'from_lng' => 'required|numeric',
            'from_description' => 'nullable|string',
            'to_address' => 'required|string',
            'to_lat' => 'required|numeric',
            'to_lng' => 'required|numeric',
            'to_description' => 'nullable|string',
        ]);

        $order = Order::create(array_merge($data, [
            'id' => (string) Str::uuid(),
            'created_at' => Date::now(),
            'status' => OrderStatus::New,
        ]));

        return response()->json($order, 201);
    }

    // GET /order/{uuid}
    public function show(string $uuid)
    {
        $order = Order::findOrFail($uuid);
        return response()->json($order);
    }

    // DELETE /order/{uuid}
    public function destroy(string $uuid)
    {
        $order = Order::findOrFail($uuid);

        if ($order->status === OrderStatus::Completed) {
            return response()->json(['message' => 'Order already completed'], 400);
        }

        $order->status = OrderStatus::Canceled;
        $order->save();

        return response()->noContent();
    }

    // GET /orders
    public function index(Request $request)
    {
        $query = Order::query();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($from = $request->query('from')) {
            $query->where('created_at', '>=', Date::parse($from));
        }

        if ($to = $request->query('to')) {
            $query->where('created_at', '<=', Date::parse($to));
        }

        $perPage = $request->query('per_page', 15);

        return response()->json($query->paginate($perPage));
    }
}
