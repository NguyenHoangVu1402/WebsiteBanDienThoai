@extends('admin.layouts.giaodien')
@section('content')
@include('admin.partials.content-header',['name' => 'Danh mục','key'=>'Thêm'])
<div class="row">
    
        <div class="col-sm-8">
            <div class="card">
                <div class="card-header">
                    <h5>Thêm danh mục</h5>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <a href="{{route('categories.index')}}" class="btn btn-success float-right m-2">Quản lý danh mục</a>
                    </div>
                </div>
                <form action="{{route('categories.store')}}" method="POST">
                    @csrf
                <div class="card-body">
                    
                    <div class="form-group">
                        <label>Tên danh mục</label>
                        <input type="text" class="form-control" name="name" placeholder="Nhập tên danh mục">
                    </div>
                    
                    <div class="form-group">
                        <label >Chọn danh mục cha</label>
                        <select class="form-control" id="exampleSelect1" name="parent_id">
                            <option value="0">Chọn danh mục cha</option>
                            {!!$htmlOption!!}
                        </select>
                    </div>
                    
                <div class="card-footer">
                    <button type="submit" class="btn btn-primary mr-2">Thêm</button>
                    {{-- <button type="reset" class="btn btn-light">Reset</button> --}}
                </div>
            </form>
            </div>
        </div>
    
</div>

@endsection