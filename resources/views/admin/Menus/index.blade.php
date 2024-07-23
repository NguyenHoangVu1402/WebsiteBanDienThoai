@extends('admin.layouts.giaodien')
@section('content')
@include('admin.partials.content-header',['name' => 'Menu','key'=>'Danh sách'])
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h5>Danh mục sản phẩm</h5>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <a href="{{route('menus.create')}}" class="btn btn-success float-right m-2">Thêm menu</a>
                </div>
            </div>
            <div class="row">
                <div class="card-body table-border-style">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên menu</th>
                                    <th>Chức năng</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($menus as $menu)
                                <tr class="table-active">
                                    <td>{{$menu->id}}</td>
                                    <td>{{$menu->name}}</td>
                                    
                                    <td>
                                        <a href="{{route('menus.edit',  ['id'=>$menu->id])}}" class="btn btn-success">Chỉnh sửa</a>
                                        <a href="{{route('menus.delete',  ['id'=>$menu->id])}}" class="btn btn-danger">Xóa</a>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
                <div class="card-body table-border-style">
                    {{ $menus->links('pagination::bootstrap-4') }}
                </div>
        </div>
    </div>
</div>
@endsection