<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">

        <title>Laravel</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    </head>
    <div id="app" >
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <ul class="nav navbar-nav navbar-righ">
                    <li><a href="/reports">Report list</a></li>
                    @if (Auth::user()['admin'] == 1)
                        <li><a href="/patients">Patient list</a></li>
                    @endif
                    @if (Auth::check())
                        <li><a href="{{ url('/logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();">Logout</a></li>
                        <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">{{ csrf_field() }}</form>
                    @endif

                </ul>
            </div>
        </nav>
        <div class="container" id="reactcontainer" style="margin-top:80px;">

        </div>
    </div>
    <script type="text/javascript">
        var APP_URL = {!! json_encode(url('/')) !!}
    </script>
    <script type="text/javascript" src="/js/app.js"></script>
    </body>
</html>
