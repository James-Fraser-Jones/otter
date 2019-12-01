var app = Elm.Otter.init({
  node: document.getElementById('elm')
});

$('.dropdown').dropdown({transition: 'slide down', on: 'hover'}); //auto dropdown on hover menu items

//js will complain about ports.PORTNAME being undefined if that port isn't actually referenced in otter.elm
// app.ports.example.subscribe(function(data) {
//   console.log("Example: " + data);
// });
// app.ports.send_error.subscribe(function(msg) {
//   send_error(msg);
// });
// app.ports.send_info.subscribe(function(msg) {
//   send_info(msg);
// });
// app.ports.close_all.subscribe(function() {
//   close_all();
// });
// app.ports.close_newest.subscribe(function() {
//   close_newest();
// });
// app.ports.close_oldest.subscribe(function() {
//   close_oldest();
// });

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
