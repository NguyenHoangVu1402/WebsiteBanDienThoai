@extends('user.layouts.giaodienDETAILS_PRODUCT')
@section('content')
<div class="breadCrumbs">
    <div class="wrap-content">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a class="text-decoration-none" href="{{url('/')}}"><span>Trang chủ</span></a></li>
            <li class="breadcrumb-item active"><a class="text-decoration-none" href=""><span>Giỏ hàng</span></a></li>
        </ol>
        {{-- <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [{
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Gi\u1ecf h\u00e0ng",
                    "item": "https:\/\/traidepbaniphone.com\/gio-hang"
                }]
            }
        </script> --}}
    </div>
</div>
<div class="wrap-main w-clear">
    <div class="fixwidth">
        <form class="form-cart validation-cart" novalidate method="post" action="" enctype="multipart/form-data">
            <div class="wrap-cart d-flex align-items-stretch justify-content-between">
                <!-- </?php var_dump($_SESSION['cart']); die(); ?> -->
                <a href="" class="empty-cart text-decoration-none">
                    <!-- <i class="fa fa-cart-arrow-down"></i> -->
                    <img src="{{asset('assets/images/giohang.png')}}" alt="">
                    <!-- <p>Không tồn tại sản phẩm nào trong giỏ hàng !</p>
        <span>Về trang chủ</span> -->
                </a>
            </div>
        </form>
    </div>
</div>
@endsection