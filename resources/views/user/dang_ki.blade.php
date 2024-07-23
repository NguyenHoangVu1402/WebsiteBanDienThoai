@extends('user.layouts.giaodien')
@section('content')
<section class="py-3 py-md-5 py-xl-8">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="mb-5">
            <h2 class="display-5 fw-bold text-center">Đăng Nhập</h2>
            <p class="text-center m-0">Bạn chưa có tài khoản? <a href="{{route('dangNhap')}}">Đăng nhập</a></p>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
          <div class="row gy-5 justify-content-center">
            <div class="col-12 col-lg-5">
              <form action="#!">
                <div class="row gy-3 overflow-hidden">
                    <div class="col-12">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control border-0 border-bottom rounded-0" name="username" id="email" placeholder="Tên đăng nhập" required>
                          <label for="text" class="form-label">Tên đăng nhập</label>
                        </div>
                      </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input type="email" class="form-control border-0 border-bottom rounded-0" name="email" id="email" placeholder="traidepbaniphone@gmail.com" required>
                      <label for="email" class="form-label">Email</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input type="password" class="form-control border-0 border-bottom rounded-0" name="matkhau" id="pass" value="" placeholder="Mật khẩu" required>
                      <label for="password" class="form-label">Mật khẩu</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input type="password" class="form-control border-0 border-bottom rounded-0" name="matkhauxacnhan" id="pass-confirm" value="" placeholder="Xác nhận mật khẩu" required>
                      <label for="password" class="form-label">Xác nhận mật khẩu</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row justify-content-between">
                      <div class="col-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" name="show-pass" onclick="togglepass()" >
                            <label class="form-check-label text-secondary" for="show-pass">
                              Hiển thị mật khẩu
                            </label>
                          </div>
                      </div>
                      <div class="col-6">
                        <div class="text-end">
                          <a href="#!" class="link-secondary text-decoration-none">Bạn quên mật khẩu?</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-grid">
                      <button class="btn btn-lg btn-dark rounded-0 fs-6" type="submit">Đăng kí</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://unpkg.com/bs-brain@2.0.4/components/logins/login-12/assets/css/login-12.css">
<script>
    const body = this.document.querySelector('body');
    //Đóng thông báo kết quả
    function closepopup() {
        const popup = this.document.querySelector('.popup.active.ketqua');
        popup.className = popup.className.replace(" active", "");
        body.style = "overflow: auto;";
    }

    function togglepass() {
        var x = document.getElementById("pass");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
        var y = document.getElementById("pass-confirm");
        if (y.type === "password") {
            y.type = "text";
        } else {
            y.type = "password";
        }
    }
</script>
@endsection