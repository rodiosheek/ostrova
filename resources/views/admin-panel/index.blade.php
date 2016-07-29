@extends('layouts.app')

@section('content')
    <div style="width: 300px;margin-left: 40px;">
        {!! Form::open(array('url' => '/admin-panel/store')) !!}
        <div class="form-group">
            {!! Form::label('section', 'Section') !!}
            {!! Form::text('section', null, array('class' => 'form-control'))  !!}
        </div>
        <div class="form-group">
            {!! Form::label('floor', 'Floor') !!}
            {!! Form::text('floor', null,  array('class' => 'form-control')) !!}
        </div>
        <div class="form-group">
            {!! Form::label('number', 'Number') !!}
            {!! Form::text('number', null,  array('class' => 'form-control')) !!}
        </div>
        <div class="form-group">
            {!! Form::label('rooms', 'Rooms') !!}
            {!! Form::text('rooms', null,  array('class' => 'form-control'))  !!}
        </div>
        <div class="form-group">
            {!! Form::label('area', 'Area')  !!}
            {!! Form::text('area', null,  array('class' => 'form-control')) !!}
        </div>
        <div class="form-group">
            {!! Form::label('onSale', 'onSale') !!}
            {!! Form::checkbox('onSale', 0, true) !!}
        </div>
        <div class="form-group">
            {!! Form::label('sales', 'Sales') !!}
            {!! Form::checkbox('sales', 1, true) !!}
        </div>
        {!! Form::submit('Add flat', array('class' => 'btn btn-default')) !!}
        {!! Form::close() !!}
    </div>


    <table class="table table-striped" style="width: 700px; margin-left: 40px;">
        <tr>
            <th>ID</th>
            <th>Section</th>
            <th>Floor</th>
            <th>Number</th>
            <th>Rooms</th>
            <th>Area</th>
            <th>onSale</th>
            <th>sales</th>
        </tr>
        @foreach($flats as $flat)
        <tr >

            <td>{{$flat['id']}}</td>
            <td>{{$flat['section']}}</td>
            <td>{{$flat['floor']}}</td>
            <td>{{$flat['number']}}</td>
            <td>{{$flat['rooms']}}</td>
            <td>{{$flat['area']}}</td>
            <td>{{$flat['onSale']}}</td>
            <td>{{$flat['sales']}}</td>

        </tr>
        @endforeach

    </table>
    @endsection