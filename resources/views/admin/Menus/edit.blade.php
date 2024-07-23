@extends('admin.layouts.giaodien')
@section('content')
@include('admin.partials.content-header',['name' => 'Menu','key'=>'Cập nhật'])
<div class="row">
        <div class="col-sm-8">
            <div class="card">
                <div class="card-header">
                    <h5>Cập nhật menu</h5>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <a href="{{route('menus.index')}}" class="btn btn-success float-right m-2">Quản lý menu</a>
                    </div>
                </div>
                <form action="{{route('menus.update', ['id' => $menuFollowIdEdit->id])}}" method="POST">
                    @csrf
                <div class="card-body">
                    
                    <div class="form-group">
                        <label>Tên menu</label>
                        <input type="text" value="{{$menuFollowIdEdit->name}}" class="form-control" name="name" placeholder="Nhập tên menu">
                    </div>

                    <div class="form-group">
                        <label >Chọn menu cha</label>
                        <select class="form-control" id="exampleSelect1" name="parent_id">
                            <option value="0">Chọn menu cha</option>
                            {!!$optionSelect!!}
                        </select>
                    </div>
                    
                <div class="card-footer">
                    <button type="submit" class="btn btn-primary mr-2">Cập nhật</button>
                    {{-- <button type="reset" class="btn btn-light">Reset</button> --}}
                </div>
            </form>
            </div>
        </div>
    
</div>

@endsection