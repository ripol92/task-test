<?php

namespace App\Enums;

enum OrderStatus: string
{
    case New = 'new';
    case Driving = 'driving';
    case Canceled = 'canceled';
    case Completed = 'completed';
}
