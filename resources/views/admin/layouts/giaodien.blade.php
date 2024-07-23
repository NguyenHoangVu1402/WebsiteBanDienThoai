<!DOCTYPE html>
<html lang="en">
<head>
    <title>TRAIDEPBANIPHONE | ADMIN</title>
    @include('admin.assets.css')
</head>

<body class="">
	<div class="loader-bg">
		<div class="loader-track">
			<div class="loader-fill"></div>
		</div>
	</div>
	<div class="pc-mob-header pc-header">
		<div class="pcm-logo">
			<img src="{{asset('admin/assets/images/logo.svg')}}" alt="" class="logo logo-lg">
		</div>
		<div class="pcm-toolbar">
			<a href="#!" class="pc-head-link" id="mobile-collapse">
				<div class="hamburger hamburger--arrowturn">
					<div class="hamburger-box">
						<div class="hamburger-inner"></div>
					</div>
				</div>
			</a>
			<a href="#!" class="pc-head-link" id="headerdrp-collapse">
				<i data-feather="align-right"></i>
			</a>
			<a href="#!" class="pc-head-link" id="header-collapse">
				<i data-feather="more-vertical"></i>
			</a>
		</div>
	</div>
	@include('admin.partials.side-bar')
	@include('admin.partials.header')
<div class="pc-container">
    <div class="pcoded-content">
        @yield('content')
    </div>
</div>
</div>
    @include('admin.assets.js')
</body>

</html>
