var app = Elm.Otter.init({
  node: document.getElementById('elm')
});
app.ports.example.subscribe(function(data) {
  console.log("Example: " + data);
});
