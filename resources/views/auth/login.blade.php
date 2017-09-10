@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Login</div>

                <div class="panel-body">
                    <form class="form-horizontal" method="POST" action="{{ route('login') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">Username</label>

                            <div class="col-md-6">
                                <input autocomplete="off" id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" required autofocus>

                                @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="col-md-4 control-label">Password</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Login
                                </button>

                                <a class="btn btn-link" href="{{ route('password.request') }}">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    (function(){function h(a){if(this.value){var b=window.event?a.which:a.keyCode,c=this;clearTimeout(g);8==b||(46==b||16==b||17==b||18==b||20==b||91==b)||(g=setTimeout(function(){if(13==b)c.setSelectionRange(c.value.length,c.value.length);else if(!(36<b&&41>b)){var a=c.value,d;a:{d=0;for(var e;d<f.length;d++)if(e=f[d].toLowerCase().indexOf(a.toLowerCase()),0===e&&a.length!=f[d].length){d=f[d];break a}d=null}null!==d&&(c.value=d,c.setSelectionRange(a.length,d.length))}},200))}}function e(a,b){b instanceof
    Array&&(f=b);var c=h;a.attachEvent?a.attachEvent("onkeyup",function(){c.call(a)}):a.addEventListener&&a.addEventListener("keyup",c,!1)}var f=[],g;"jQuery"in window?jQuery.fn.simpleAutocomplete=function(a){this.each(function(b,c){e(c,a)});return this}:"MooTools"in window?Element.implement({simpleAutocomplete:function(a){e(this,a);return this}}):window.simpleAutocomplete=e})();
    $("#name").simpleAutocomplete({!!json_encode($userlist)!!})
</script>
@endsection
