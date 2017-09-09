<html>
<body>
<ul>
    <li>Report id: {{$report->id}}</li>
    <li>Report title: {{$report->title}}</li>
</ul>
<table>
    <thead>
        <tr><th>Test name</th><th>Test result</th></tr>
    </thead>
    <tbody>
    @foreach ($report->tests as $test)
        <tr><td>{{$test->name}}</td><td>{{$test->result}}</td></tr>
    @endforeach
    </tbody>
</table>
</body>
</html>