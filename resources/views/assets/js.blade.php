{{-- HOME --}}
<!-- Js Config -->
<script type="text/javascript">
    var NN_FRAMEWORK = NN_FRAMEWORK || {};
    var CONFIG_BASE = 'https://traidepbaniphone.com/';
    var WEBSITE_NAME = 'TRAI ĐẸP bán iPhone';
    var TIMENOW = '19/07/2024';
    var SHIP_CART = true;
    var GOTOP = '{{asset('assets/images/top.png')}}';
    var LANG = {
        'no_keywords': "Chưa nhập từ khóa tìm kiếm",
        'delete_product_from_cart': "Bạn muốn xóa sản phẩm này khỏi giỏ hàng ? ",
        'no_products_in_cart': "Không tồn tại sản phẩm nào trong giỏ hàng !",
        'wards': "Phường/xã",
        'back_to_home': "Về trang chủ",
    };
</script>

<!-- Js Files -->
<script type="text/javascript" src="{{asset('assets/js/jquery.min.js?v=ETsdgBeNz6')}}"></script>
<script type="text/javascript" src="{{asset('assets/bootstrap/bootstrap.js?v=dqm9vPacx6')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/wow.min.js?v=goRZgW6eBz')}}"></script>
<script type="text/javascript" src="{{asset('assets/owlcarousel2/owl.carousel.js?v=Eo0c7Qwfqz')}}"></script>
<script type="text/javascript" src="{{asset('assets/magiczoomplus/magiczoomplus.js?v=CUsrk3ZhzO')}}"></script>
<script type="text/javascript" src="{{asset('assets/simplyscroll/jquery.simplyscroll.js?v=tndDo1y3xH')}}"></script>
<script type="text/javascript" src="{{asset('assets/slick/slick.js?v=n0FeeRfxNX')}}"></script>
<script type="text/javascript" src="{{asset('assets/fancybox3/jquery.fancybox.js?v=gwJUl8vMve')}}"></script>
<script type="text/javascript" src="{{asset('assets/toc/toc.js?v=EjLv5U8i0')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/lazyload.min.js?v=ABRym7mEky')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/functions.js?v=4PujKWdf7B')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/apps.js?v=w8OIuEak6d')}}"></script>
<script src="{{asset('assets/js/lazyload.min.js')}}"></script>
<script>
    var myLazyLoad = new LazyLoad({
        elements_selector: ".lazy"
    });
</script>


<script type="text/javascript">
    $(document).ready(function() {
        $('.slider-for').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3500,
            infinite: true,
            autoPlay: true,
            centerPadding: '0px',
            asNavFor: '.slider-nav',
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                        centerMode: false,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                    }
                }
            ]
        });
        $('.slider-nav').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3500,
            infinite: true,
            autoPlay: true,
            centerPadding: '0px',
            asNavFor: '.slider-for',
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        centerMode: false,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    });
</script>

<script type="text/javascript">
    $(document).ready(function() {
        jQuery(document).ready(function() {
            jQuery('.catagory-title').on("click", function() {
                if ($('.catagory-list__fix').css('display') == 'none') {
                    $('.catagory-list__fix').animate({
                        height: 'show'
                    }, 400);
                } else {
                    $('.catagory-list__fix').animate({
                        height: 'hide'
                    }, 200);
                }
            });
            jQuery('.catagory-list__fix li span').on("click", function() {
                let id = $(this).attr('data-id');
                if ($('#cat2__fix_' + id).css('display') == 'none') {
                    $('#cat2__fix_' + id).animate({
                        height: 'show'
                    }, 400);
                } else {
                    $('#cat2__fix_' + id).animate({
                        height: 'hide'
                    }, 200);
                }
            });
            jQuery('.catagory-list li span').on("click", function() {
                let id = $(this).attr('data-id');
                if ($('#cat2_' + id).css('display') == 'none') {
                    $('#cat2_' + id).animate({
                        height: 'show'
                    }, 400);
                } else {
                    $('#cat2_' + id).animate({
                        height: 'hide'
                    }, 200);
                }
            });
        });
    });
    // $(document).ready(function() {

    //     $('.support-content').hide();

    //     $('a.btn-support').click(function(e) {
    //         e.stopPropagation();
    //         $('.support-content').slideToggle();
    //     });
    //     $('.support-content').click(function(e) {
    //         e.stopPropagation();
    //     });
    //     $(document).click(function() {
    //         $('.support-content').slideUp();
    //     });

    //     $('.tailvideo_item_owl').click(function() {
    //         let id = $(this).attr('data-src');
    //         let img = $(this).attr('data-image');
    //         let name = $(this).attr('data-name');
    //         $('.pic-video').attr('data-src', id);
    //         $('.pic-video img').attr('src', img);
    //         $('.name-video').html(name);
    //     });
    // });

    $(document).on('click', '.menu_mobi .menulicha', function(event) {
        $('.close_menu').trigger('click');
        return false;
    });

    var menu_mobi = $('.menu_cap_cha').html();
    $('.menu_mobi_add').append('<span class="close_menu">X</span><ul>' + menu_mobi + '</ul>');

    $('.menu_mobi_add ul li ul').removeClass('menu_cap_con');
    $('.menu_mobi_add ul li ul').css({
        'display': 'none'
    });
    $('.menu_mobi_add ul li ul li ul').removeClass('menu_cap_2');
    $('.menu_mobi_add ul li ul li ul').css({
        'display': 'none'
    });
    $('.menu_mobi_add ul li ul li ul li ul').removeClass('menu_cap_3');
    $('.menu_mobi_add ul li ul li ul li ul').css({
        'display': 'none'
    });

    $(".menu_mobi_add ul li").each(function(index, element) {
        if ($(this).children('ul').children('li').length > 0) {
            $(this).children('a').append('<i class="fas fa-chevron-right"></i>');
        }
    });
    $(".menu_mobi_add ul li a i").click(function() {
        if ($(this).parent('a').hasClass('active2')) {
            $(this).parent('a').removeClass('active2');
            if ($(this).parent('a').parent('li').children('ul').children('li').length > 0) {
                $(this).parent('a').parent('li').children('ul').css({
                    display: 'none',
                });
                //$(this).parent('a').parent('li').children('ul').hide(300);
                return false;
            }
        } else {
            $(this).parent('a').addClass('active2');
            if ($(this).parents('li').children('ul').children('li').length > 0) {
                //$(".menu_m ul li ul").hide(0);
                //$(this).parents('li').children('ul').show(300);
                $(".menu_m ul li ul").css({
                    display: 'none',
                });
                $(this).parents('li').children('ul').css({
                    display: 'block',
                });
                return false;
            }
        }
    });

    $('.icon_menu_mobi,.close_menu,.menu_baophu').click(function() {
        if ($('.menu_mobi_add').hasClass('menu_mobi_active')) {
            $('.menu_mobi_add').removeClass('menu_mobi_active');
            $('.menu_baophu').fadeOut(300);
        } else {
            $('.menu_mobi_add').addClass('menu_mobi_active');
            $('.menu_baophu').fadeIn(300);
        }
        return false;
    });

    const input_code_bh = document.getElementById("code_bh");
    const input_name_bh = document.getElementById("name_bh");
    $(document).on('click', '#btn_card_bh', function(event) {
        event.preventDefault();
        var formBH = $('.form_bh').serialize();

        if (input_code_bh.value == "") {
            erorr_input("Vui lòng nhập mã số thẻ", "Lỗi")
            input_code_bh.focus();
            return false;
        }
        // if (input_name_bh.value == "") {
        //     erorr_input("Vui lòng nhập năm sinh", "Lỗi")
        //     input_name_bh.focus();
        //     return false;
        // }


        $.ajax({
            url: 'ajax/ajax_the_bh.php',
            type: 'POST',
            data: formBH,
            beforeSend: function() {
                $(".loading").show();
            },
            success: function(data) {
                $(".loading").hide();
                if (data.length > 0) {
                    $(".thong_tin_tra_cuu").html(data);
                }

            }

        });
    });

    // autocomplete
    $(document).ready(function() {
        $("#keyword2").keyup(function() {
            $.ajax({
                type: "POST",
                url: "ajax/readCountry.php",
                data: 'keyword=' + $(this).val(),
                beforeSend: function() {
                    $("#keyword2").css("background", "#FFF url(LoaderIcon.gif) no-repeat 165px");
                },
                success: function(data) {
                    $("#suggesstion-box").show();
                    $("#suggesstion-box").html(data);
                    // $("#keyword2").css("background", "#FFF");
                }
            });
        });
    });

    $(document).ready(function() {
        $("#keyword3").keyup(function() {
            $.ajax({
                type: "POST",
                url: "ajax/readCountry.php",
                data: 'keyword=' + $(this).val(),
                beforeSend: function() {
                    $("#keyword3").css("background", "#FFF url(LoaderIcon.gif) no-repeat 165px");
                },
                success: function(data) {
                    $("#suggesstion-box-slide").show();
                    $("#suggesstion-box-slide").html(data);
                    // $("#keyword3").css("background", "#FFF");
                }
            });
        });
    });

    $(document).on('click', '#proprice_item_gb', function(event) {
        $.ajax({
            url: 'ajax/ajax_delete.php',
            type: 'POST',
            // data: formBH,
            beforeSend: function() {
                $(".loading").show();
            },
            success: function(data) {
                $(".loading").hide();
                // $(".thong_tin_tra_cuu").html(data);
            }
        });
    });



    let elementH1 = document.getElementsByClassName('count_tet');
    let thangtrian = document.getElementById('thangtrian');
    let tet = document.getElementById('ngaykttrian').value;

    // console.log(dateta);

    var timeTet = new Date(tet).getTime();
    var x = setInterval(() => {
        var today = new Date().getTime();
        var kq = timeTet - today;
        var day = Math.floor(kq / (1000 * 60 * 60 * 24));
        var hours = Math.floor((kq % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((kq % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((kq % (1000 * 60)) / 1000);
        // elementH1.innerText = `còn ${day} ngày ${hours} giờ ${minutes} phút ${seconds} giây nữa là đến tết`;
        for (i = 0; i < elementH1.length; i++) {
            elementH1[i].innerText = `${day} ngày ${hours}:${minutes}:${seconds}`;
        }
        // elementH1.innerText = `${day} ngày ${hours}:${minutes}:${seconds}`;

        if (kq < 0) {

            $(".countdown_trian").css({
                display: 'none',
            });
            $("#thangtrian").css({
                display: 'none',
            });
            // thangtrian.style = "display:none";
            clearInterval(x);
        }
        // console.log(`${day} ngày ${hours}:${minutes}:${seconds}`);
    }, 1000)

    let elementH2 = document.getElementsByClassName('count_tet_dealhot');
    let dealhot_sp = document.getElementById('dealhot_sp');
    let countdealhot = document.getElementById('count_dealhot');
    let dateta = document.getElementById('ngayktdealhot').value;

    var timedealhot = new Date(dateta).getTime();
    var xdealhost = setInterval(() => {
        var todaydelahot = new Date().getTime();
        var kqhost = timedealhot - todaydelahot;
        var dayhost = Math.floor(kqhost / (1000 * 60 * 60 * 24));
        var hourshost = Math.floor((kqhost % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minuteshost = Math.floor((kqhost % (1000 * 60 * 60)) / (1000 * 60));
        var secondshost = Math.floor((kqhost % (1000 * 60)) / 1000);
        // elementH1.innerText = `còn ${day} ngày ${hours} giờ ${minutes} phút ${seconds} giây nữa là đến tết`;
        for (i = 0; i < elementH2.length; i++) {
            elementH2[i].innerText = `${dayhost} ngày ${hourshost}:${minuteshost}:${secondshost}`;
        }
        // elementH1.innerText = `${day} ngày ${hours}:${minutes}:${seconds}`;

        if (kqhost < 0) {
            // dealhot_sp.style = "display:none";
            // countdealhot.style = "display:none";
            $(".countdown_dealhot").css({
                display: 'none',
            });
            $("#dealhot_sp").css({
                display: 'none',
            });
            clearInterval(xdealhost);
        }
        // console.log(`${dayhost} ngày ${hourshost}:${minuteshost}:${secondshost}`);
    }, 1000)
</script>
<script>
    // // popup
    const body = document.querySelector("body");
    const modal = document.getElementById("popup-all");
    // const modalButton = document.querySelector(".modal-button");
    const closeButton = document.querySelector(".close-button");
    // const scrollDown = document.querySelector(".scroll-down");
    let isOpened = false;
    console.log(body);

    const openModal = () => {
        modal.classList.add("is-open");
        body.style.overflow = "hidden";
    };

    const closeModal = () => {
        modal.classList.remove("is-open");
        body.style.overflow = "initial";
        clearTimeout(openModal);
    };

    // $.noConflict();
    $(window).on('load', function() {
        if (document.cookie.indexOf("popup") == -1) {
            document.cookie = "popunder1=popup";
            setTimeout(openModal, 0);
        }
    });
    // setTimeout(openModal, 0);
    closeButton.addEventListener("click", closeModal);
</script>


<!-- Js Structdata -->
<!-- General -->
<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "TRAI ĐẸP bán iPhone",
        "url": "https://traidepbaniphone.com/",
        "sameAs": [],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "127G Lê Văn Duyệt, Phường 03, Quận Bình Thạnh, TP. Hồ Chí Minh, Việt Nam",
            "addressRegion": "Ho Chi Minh",
            "postalCode": "70000",
            "addressCountry": "vi"
        }
    }
</script>

<!-- Js Addons -->
<div id="script-main"></div>
<script type="text/javascript">
    $(function() {
        var a = !1;
        $(window).scroll(function() {
            $(window).scrollTop() > 0.5 && !a && ($("#script-main").load("ajax/ajax_addons.php?type=script-main"), a = !0)
        })
    });
</script>
<!-- Js Body -->
{{-- HOME --}}


{{-- CHI TIẾT SẢN PHẨM --}}
<!-- Js Config -->
<script type="text/javascript">
    var NN_FRAMEWORK = NN_FRAMEWORK || {};
    var CONFIG_BASE = 'https://traidepbaniphone.com/';
    var WEBSITE_NAME = 'TRAI ĐẸP bán iPhone';
    var TIMENOW = '19/07/2024';
    var SHIP_CART = true;
    var GOTOP = 'assets/images/top.png';
    var LANG = {
        'no_keywords': "Chưa nhập từ khóa tìm kiếm",
        'delete_product_from_cart': "Bạn muốn xóa sản phẩm này khỏi giỏ hàng ? ",
        'no_products_in_cart': "Không tồn tại sản phẩm nào trong giỏ hàng !",
        'wards': "Phường/xã",
        'back_to_home': "Về trang chủ",
    };
</script>

<!-- Js Files -->
<script type="text/javascript" src="{{asset('assets/js/jquery.min.js?v=QqAfIYe0xO')}}"></script>
<script type="text/javascript" src="{{asset('assets/bootstrap/bootstrap.js?v=BSFtvyoRTy')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/wow.min.js?v=7nThlKaEB')}}"></script>
<script type="text/javascript" src="{{asset('assets/owlcarousel2/owl.carousel.js?v=vfQYuvtjzO')}}"></script>
<script type="text/javascript" src="{{asset('assets/magiczoomplus/magiczoomplus.js?v=rd5yseeP8x')}}"></script>
<script type="text/javascript" src="{{asset('assets/simplyscroll/jquery.simplyscroll.js?v=bktaOAtKOe')}}"></script>
<script type="text/javascript" src="{{asset('assets/slick/slick.js?v=Hwn4vVdHgf')}}"></script>
<script type="text/javascript" src="{{asset('assets/fancybox3/jquery.fancybox.js?v=8FdC6OxHNA')}}"></script>
<script type="text/javascript" src="{{asset('assets/toc/toc.js?v=TXgMwu6qm4')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/lazyload.min.js?v=faxDJ4Z0GL')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/functions.js?v=doQ9js67iW')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/apps.js?v=rq8umS96wt')}}"></script>
<script src="{{asset('assets/js/lazyload.min.js')}}"></script>
<script>
    var myLazyLoad = new LazyLoad({
        elements_selector: ".lazy"
    });
</script>

<script type="text/javascript">
    $(document).ready(function() {
        $('.slider-for').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3500,
            infinite: true,
            autoPlay: true,
            centerPadding: '0px',
            asNavFor: '.slider-nav',
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                        centerMode: false,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                    }
                }
            ]
        });
        $('.slider-nav').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3500,
            infinite: true,
            autoPlay: true,
            centerPadding: '0px',
            asNavFor: '.slider-for',
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        centerMode: false,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    });
</script>

<script type="text/javascript">
    $(document).ready(function() {
        jQuery(document).ready(function() {
            jQuery('.catagory-title').on("click", function() {
                if ($('.catagory-list__fix').css('display') == 'none') {
                    $('.catagory-list__fix').animate({
                        height: 'show'
                    }, 400);
                } else {
                    $('.catagory-list__fix').animate({
                        height: 'hide'
                    }, 200);
                }
            });
            jQuery('.catagory-list__fix li span').on("click", function() {
                let id = $(this).attr('data-id');
                if ($('#cat2__fix_' + id).css('display') == 'none') {
                    $('#cat2__fix_' + id).animate({
                        height: 'show'
                    }, 400);
                } else {
                    $('#cat2__fix_' + id).animate({
                        height: 'hide'
                    }, 200);
                }
            });
            jQuery('.catagory-list li span').on("click", function() {
                let id = $(this).attr('data-id');
                if ($('#cat2_' + id).css('display') == 'none') {
                    $('#cat2_' + id).animate({
                        height: 'show'
                    }, 400);
                } else {
                    $('#cat2_' + id).animate({
                        height: 'hide'
                    }, 200);
                }
            });
        });
    });
    // $(document).ready(function() {

    //     $('.support-content').hide();

    //     $('a.btn-support').click(function(e) {
    //         e.stopPropagation();
    //         $('.support-content').slideToggle();
    //     });
    //     $('.support-content').click(function(e) {
    //         e.stopPropagation();
    //     });
    //     $(document).click(function() {
    //         $('.support-content').slideUp();
    //     });

    //     $('.tailvideo_item_owl').click(function() {
    //         let id = $(this).attr('data-src');
    //         let img = $(this).attr('data-image');
    //         let name = $(this).attr('data-name');
    //         $('.pic-video').attr('data-src', id);
    //         $('.pic-video img').attr('src', img);
    //         $('.name-video').html(name);
    //     });
    // });

    $(document).on('click', '.menu_mobi .menulicha', function(event) {
        $('.close_menu').trigger('click');
        return false;
    });

    var menu_mobi = $('.menu_cap_cha').html();
    $('.menu_mobi_add').append('<span class="close_menu">X</span><ul>' + menu_mobi + '</ul>');

    $('.menu_mobi_add ul li ul').removeClass('menu_cap_con');
    $('.menu_mobi_add ul li ul').css({
        'display': 'none'
    });
    $('.menu_mobi_add ul li ul li ul').removeClass('menu_cap_2');
    $('.menu_mobi_add ul li ul li ul').css({
        'display': 'none'
    });
    $('.menu_mobi_add ul li ul li ul li ul').removeClass('menu_cap_3');
    $('.menu_mobi_add ul li ul li ul li ul').css({
        'display': 'none'
    });

    $(".menu_mobi_add ul li").each(function(index, element) {
        if ($(this).children('ul').children('li').length > 0) {
            $(this).children('a').append('<i class="fas fa-chevron-right"></i>');
        }
    });
    $(".menu_mobi_add ul li a i").click(function() {
        if ($(this).parent('a').hasClass('active2')) {
            $(this).parent('a').removeClass('active2');
            if ($(this).parent('a').parent('li').children('ul').children('li').length > 0) {
                $(this).parent('a').parent('li').children('ul').css({
                    display: 'none',
                });
                //$(this).parent('a').parent('li').children('ul').hide(300);
                return false;
            }
        } else {
            $(this).parent('a').addClass('active2');
            if ($(this).parents('li').children('ul').children('li').length > 0) {
                //$(".menu_m ul li ul").hide(0);
                //$(this).parents('li').children('ul').show(300);
                $(".menu_m ul li ul").css({
                    display: 'none',
                });
                $(this).parents('li').children('ul').css({
                    display: 'block',
                });
                return false;
            }
        }
    });

    $('.icon_menu_mobi,.close_menu,.menu_baophu').click(function() {
        if ($('.menu_mobi_add').hasClass('menu_mobi_active')) {
            $('.menu_mobi_add').removeClass('menu_mobi_active');
            $('.menu_baophu').fadeOut(300);
        } else {
            $('.menu_mobi_add').addClass('menu_mobi_active');
            $('.menu_baophu').fadeIn(300);
        }
        return false;
    });

    const input_code_bh = document.getElementById("code_bh");
    const input_name_bh = document.getElementById("name_bh");
    $(document).on('click', '#btn_card_bh', function(event) {
        event.preventDefault();
        var formBH = $('.form_bh').serialize();

        if (input_code_bh.value == "") {
            erorr_input("Vui lòng nhập mã số thẻ", "Lỗi")
            input_code_bh.focus();
            return false;
        }
        // if (input_name_bh.value == "") {
        //     erorr_input("Vui lòng nhập năm sinh", "Lỗi")
        //     input_name_bh.focus();
        //     return false;
        // }


        $.ajax({
            url: 'ajax/ajax_the_bh.php',
            type: 'POST',
            data: formBH,
            beforeSend: function() {
                $(".loading").show();
            },
            success: function(data) {
                $(".loading").hide();
                if (data.length > 0) {
                    $(".thong_tin_tra_cuu").html(data);
                }

            }

        });
    });

    // autocomplete
    $(document).ready(function() {
        $("#keyword2").keyup(function() {
            $.ajax({
                type: "POST",
                url: "ajax/readCountry.php",
                data: 'keyword=' + $(this).val(),
                beforeSend: function() {
                    $("#keyword2").css("background", "#FFF url(LoaderIcon.gif) no-repeat 165px");
                },
                success: function(data) {
                    $("#suggesstion-box").show();
                    $("#suggesstion-box").html(data);
                    // $("#keyword2").css("background", "#FFF");
                }
            });
        });
    });

    $(document).ready(function() {
        $("#keyword3").keyup(function() {
            $.ajax({
                type: "POST",
                url: "ajax/readCountry.php",
                data: 'keyword=' + $(this).val(),
                beforeSend: function() {
                    $("#keyword3").css("background", "#FFF url(LoaderIcon.gif) no-repeat 165px");
                },
                success: function(data) {
                    $("#suggesstion-box-slide").show();
                    $("#suggesstion-box-slide").html(data);
                    // $("#keyword3").css("background", "#FFF");
                }
            });
        });
    });

    $(document).on('click', '#proprice_item_gb', function(event) {
        $.ajax({
            url: 'ajax/ajax_delete.php',
            type: 'POST',
            // data: formBH,
            beforeSend: function() {
                $(".loading").show();
            },
            success: function(data) {
                $(".loading").hide();
                // $(".thong_tin_tra_cuu").html(data);
            }
        });
    });



    let elementH1 = document.getElementsByClassName('count_tet');
    let thangtrian = document.getElementById('thangtrian');
    let tet = document.getElementById('ngaykttrian').value;

    // console.log(dateta);

    var timeTet = new Date(tet).getTime();
    var x = setInterval(() => {
        var today = new Date().getTime();
        var kq = timeTet - today;
        var day = Math.floor(kq / (1000 * 60 * 60 * 24));
        var hours = Math.floor((kq % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((kq % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((kq % (1000 * 60)) / 1000);
        // elementH1.innerText = `còn ${day} ngày ${hours} giờ ${minutes} phút ${seconds} giây nữa là đến tết`;
        for (i = 0; i < elementH1.length; i++) {
            elementH1[i].innerText = `${day} ngày ${hours}:${minutes}:${seconds}`;
        }
        // elementH1.innerText = `${day} ngày ${hours}:${minutes}:${seconds}`;

        if (kq < 0) {

            $(".countdown_trian").css({
                display: 'none',
            });
            $("#thangtrian").css({
                display: 'none',
            });
            // thangtrian.style = "display:none";
            clearInterval(x);
        }
        // console.log(`${day} ngày ${hours}:${minutes}:${seconds}`);
    }, 1000)

    let elementH2 = document.getElementsByClassName('count_tet_dealhot');
    let dealhot_sp = document.getElementById('dealhot_sp');
    let countdealhot = document.getElementById('count_dealhot');
    let dateta = document.getElementById('ngayktdealhot').value;

    var timedealhot = new Date(dateta).getTime();
    var xdealhost = setInterval(() => {
        var todaydelahot = new Date().getTime();
        var kqhost = timedealhot - todaydelahot;
        var dayhost = Math.floor(kqhost / (1000 * 60 * 60 * 24));
        var hourshost = Math.floor((kqhost % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minuteshost = Math.floor((kqhost % (1000 * 60 * 60)) / (1000 * 60));
        var secondshost = Math.floor((kqhost % (1000 * 60)) / 1000);
        // elementH1.innerText = `còn ${day} ngày ${hours} giờ ${minutes} phút ${seconds} giây nữa là đến tết`;
        for (i = 0; i < elementH2.length; i++) {
            elementH2[i].innerText = `${dayhost} ngày ${hourshost}:${minuteshost}:${secondshost}`;
        }
        // elementH1.innerText = `${day} ngày ${hours}:${minutes}:${seconds}`;

        if (kqhost < 0) {
            // dealhot_sp.style = "display:none";
            // countdealhot.style = "display:none";
            $(".countdown_dealhot").css({
                display: 'none',
            });
            $("#dealhot_sp").css({
                display: 'none',
            });
            clearInterval(xdealhost);
        }
        // console.log(`${dayhost} ngày ${hourshost}:${minuteshost}:${secondshost}`);
    }, 1000)
</script>


<!-- Js Structdata -->
<!-- Product -->
<script type="application/ld+json">
    {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "iPhone 15 512GB",
        "image": [
            "https://traidepbaniphone.com/upload/product/anyconvcomiphone-15-pink-thumbtz0-650x650-3116.png"
        ],
        "description": "",
        "sku": "SP01108",
        "mpn": "925872",
        "brand": {
            "@type": "Thing",
            "name": "iPhone New"
        },
        "review": {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
            },
            "author": {
                "@type": "Person",
                "name": "TRAI ĐẸP bán iPhone"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.4",
            "reviewCount": "89"
        },
        "offers": {
            "@type": "Offer",
            "url": "https://traidepbaniphone.com/iphone-15-512gb",
            "priceCurrency": "VND",
            "price": "25900000",
            "priceValidUntil": "2020-11-05",
            "itemCondition": "https://schema.org/UsedCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Executive Objects"
            }
        }
    }
</script>

<!-- Js Addons -->
<div id="script-main"></div>
<script type="text/javascript">
    $(function() {
        var a = !1;
        $(window).scroll(function() {
            $(window).scrollTop() > 0.5 && !a && ($("#script-main").load("ajax/ajax_addons.php?type=script-main"), a = !0)
        })
    });
</script>
<!-- Js Body -->
{{-- CHI TIÊT SẢN PHẨM --}}