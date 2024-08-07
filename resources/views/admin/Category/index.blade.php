@extends('admin.layouts.giaodien')
@section('content')
@include('admin.partials.content-header',['name' => 'Danh mục','key'=>'Danh sách'])
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h5>Danh mục sản phẩm</h5>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <a href="{{route('categories.create')}}" class="btn btn-success float-right m-2">Thêm danh mục</a>
                </div>
            </div>
            <div class="row">
                <div class="card-body table-border-style">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên danh mục</th>
                                    <th>Chức năng</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($categories as $category)
                                <tr class="table-active">
                                    <td>{{$category->id}}</td>
                                    <td>{{$category->name}}</td>
                                    
                                    <td>
                                        <a href="{{route('categories.edit',  ['id'=>$category->id])}}" class="btn btn-success">Chỉnh sửa</a>
                                        <a href="{{route('categories.delete',  ['id'=>$category->id])}}" class="btn btn-danger">Xóa</a>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
                <div class="card-body table-border-style">
                    {{ $categories->links('pagination::bootstrap-4') }}
                </div>
        </div>
    </div>
</div>
@endsection