var app = Elm.Otter.init({
  node: document.getElementById('elm')
});

/*******************************************************************************
PORTS
*******************************************************************************/

//js will complain about ports.PORTNAME being undefined if that port isn't actually referenced in otter.elm
// app.ports.example.subscribe(function(data) {
//   console.log("Example: " + data);
// });
// app.ports.send_error.subscribe(function(msg) {
//   send_error(msg);
// });
app.ports.send_info.subscribe(function(msg) {
  send_info(msg);
});
// app.ports.close_all.subscribe(function() {
//   close_all();
// });
// app.ports.close_newest.subscribe(function() {
//   close_newest();
// });
// app.ports.close_oldest.subscribe(function() {
//   close_oldest();
// });

app.ports.save_file.subscribe(function(data) {
  save_file(data[0], data[1]);
});

function send_error(msg){
  $('body').toast({
    class: 'red',
    position: 'bottom center',
    showIcon: 'exclamation',
    displayTime: 0,
    message: msg
  });
}
function send_info(msg){
  $('body').toast({
    class: 'blue',
    position: 'bottom center',
    showIcon: 'info',
    displayTime: 0,
    message: msg
  });
}
function close_all(){
  $('.ui.toast').toast('close');
}
function close_newest(){
  $('.ui.toast').last().toast('close');
}
function close_oldest(){
  $('.ui.toast').first().toast('close');
}

/*******************************************************************************
SEMANTIC
*******************************************************************************/

$('.dropdown').dropdown({
  action: 'hide'
});

//Button active behaviour, found from here: https://stackoverflow.com/questions/23032833/how-to-toggle-content-in-semantic-ui-buttons
semantic = {};
semantic.button = {};
semantic.button.ready = function() {
  var
    $buttons = $('.ui.buttons .button'),
    $toggle  = $('.main .ui.toggle.button'),
    $button  = $('.ui.button').not($buttons).not($toggle),
    handler = {
      activate: function() {
        $(this)
          .addClass('active')
          .siblings()
          .removeClass('active')
        ;
      }
    };
  $buttons.on('click', handler.activate);
  $toggle
    .state({
      text: {
        inactive : 'Vote',
        active   : 'Voted'
      }
    });
};
$(document).ready(semantic.button.ready);

/*******************************************************************************
NWJS
*******************************************************************************/

var fs = require('fs');
var path = require('path');

function save_file(fileName, fileContent){
    var filePath = path.join(nw.App.dataPath, fileName);
    fs.writeFile(filePath, JSON.stringify(fileContent), function (err) {
        if (err){
            console.info("There was an error attempting to save your data.");
            console.warn(err.message);
        }
    });
}
