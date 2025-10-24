<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Too Many Requests</title>
  <style>body{background:#0b0b0b;color:#fff;font-family:Arial,Helvetica,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0} .card{background:#171717;padding:22px;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.6);max-width:700px;text-align:center} h1{margin:0 0 6px;font-size:20px} p{margin:0;color:#ddd}</style>
</head>
<body>
  <div class="card">
    <h1>Too many requests</h1>
    <p>{{ $message ?? 'Please wait a moment and try again.' }}</p>
  </div>
</body>
</html>