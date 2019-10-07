var app = Elm.Otter.init({
  node: document.getElementById('elm')
});
app.ports.example.subscribe(function(data) {
  console.log("The filename is: " + data);
});
app.ports.focusCursor.subscribe(() => {
  window.requestAnimationFrame(() => {
    try {
      document.getElementById("cursor-input").focus({preventScroll:true});
    }
    catch(err) {

    }
  });
});
