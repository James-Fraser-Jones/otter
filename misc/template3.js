$('.dropdown').dropdown({transition: 'slide down', on: 'hover' }); //auto dropdown on hover menu items
$('.ui.modal').modal(); //set up for settings modal

function send_error(msg){
  $('body').toast({
    class: 'red',
    title: 'Error:',
    position: 'bottom center',
    showIcon: 'exclamation',
    displayTime: 0,
    message: msg
  });
}

function send_info(msg){
  $('body').toast({
    class: 'blue',
    title: 'Info:',
    position: 'bottom center',
    showIcon: 'info',
    displayTime: 0,
    message: msg
  });
}

function close_messages(){
  $('.ui.toast').toast('close');
}

function open_settings(){
  $('.ui.modal').modal('show');
}
