@extends('user.layouts.giaodien')
@section('content')
<section class="py-3 py-md-5 py-xl-8">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="mb-5">
            <h2 class="display-5 fw-bold text-center">Đăng Nhập</h2>
            <p class="text-center m-0">Bạn chưa có tài khoản? <a href="{{route('dangKi')}}">Đăng kí</a></p>
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
                      <input type="email" class="form-control border-0 border-bottom rounded-0" name="email" id="email" placeholder="traidepbaniphone@gmail.com" required>
                      <label for="email" class="form-label">Email</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input type="password" class="form-control border-0 border-bottom rounded-0" name="password" id="pass" value="" placeholder="Mật khẩu" required>
                      <label for="password" class="form-label">Mật khẩu</label>
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
                      <button class="btn btn-lg btn-dark rounded-0 fs-6" type="submit">Đăng nhập</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-12 col-lg-2 d-flex align-items-center justify-content-center gap-3 flex-lg-column">
              <div class="bg-dark h-100 d-none d-lg-block" style="width: 1px; --bs-bg-opacity: .1;"></div>
              <div class="bg-dark w-100 d-lg-none" style="height: 1px; --bs-bg-opacity: .1;"></div>
              <div>Hoặc</div>
              <div class="bg-dark h-100 d-none d-lg-block" style="width: 1px; --bs-bg-opacity: .1;"></div>
              <div class="bg-dark w-100 d-lg-none" style="height: 1px; --bs-bg-opacity: .1;"></div>
            </div>
            <div class="col-12 col-lg-5 d-flex align-items-center">
              <div class="d-flex gap-3 flex-column w-100 ">
                <a href="#!" class="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google text-danger" viewBox="0 0 16 16">
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                  <span class="ms-2 fs-6 flex-grow-1">Continue with Google</span>
                </a>
                
              </div>
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

    function togglepass() {
        var x = document.getElementById("pass");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    function closepopup() {
        const popup = this.document.querySelector('.popup.active.ketqua');
        popup.className = popup.className.replace(" active", "");
        body.style = "overflow: auto;";
    }
</script>
@endsection