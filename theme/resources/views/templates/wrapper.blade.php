<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Pterodactyl') }} — Panel</title>

    <link rel="stylesheet" href="{{ asset('themes/premium/css/premium.css') }}?v=1.0.0">

    @yield('meta')
</head>
<body>
    <div id="app">
        @yield('content')
    </div>

    <script src="{{ asset('themes/premium/js/premium.js') }}?v=1.0.0" defer></script>
    @yield('scripts')
</body>
</html>