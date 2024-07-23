<!DOCTYPE html>
<html lang="vi|en">

<head>
   @include('assets.css')
</head>

<body>
    <div id="wrapper">
        
        <h1 class="hidden-seoh"></h1>
        @include('partials.header')
        @include('partials.slider')

        @yield('content')

        @include('partials.ship')
        @include('partials.footer')

        @include('partials.support')
        <!-- Modal notify -->
        @include('partials.thongbao')

        @include('partials.cart')

        @include('assets.js')
    </div>
</body>

</html>