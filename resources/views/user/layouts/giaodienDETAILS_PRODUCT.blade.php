<!DOCTYPE html>
<html lang="vi|en">

<head>
@include('assets.css')
</head>

<body>
    <div id="wrapper">
        
        <h1 class="hidden-seoh"></h1>
        @include('partials.header')
        @yield('content')
        @include('partials.ship')
        @include('partials.support')
        @include('partials.footer')
        

        
        <!-- Modal notify -->
        @include('partials.thongbao')

        <!-- Modal cart -->
        @include('partials.cart')

        
    </div>
</body>

</html>