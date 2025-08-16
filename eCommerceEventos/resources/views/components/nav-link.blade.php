<?php
/** @var string $route */
?>

<a class="nav-link {{ request()->routeIs($route) ? 'active' : '' }}  fs-5" href="{{ route($route) }}"
    {!! request()->routeIs($route) ? 'aria-current="page"' : '' !!}
>
{{ $slot }}
</a>
