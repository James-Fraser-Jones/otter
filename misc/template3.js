$('.dropdown').dropdown({transition: 'slide down', on: 'hover' }); //auto dropdown on hover menu items

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

function close_messages(){
  $('.ui.toast').toast('close');
}
