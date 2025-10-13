<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Academix | Dashboard</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/js/app.js?v={{ @filemtime(public_path('js/app.js')) ?? time() }}"></script>
    <script>
      function boot() {
        if (window.Academix && window.Academix.mountDashboard) {
          window.Academix.mountDashboard(document.getElementById('app'));
        } else {
          setTimeout(boot, 50);
        }
      }
      boot();
    </script>
  </body>
  </html>


