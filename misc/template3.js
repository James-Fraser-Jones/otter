$('.dropdown').dropdown({transition: 'slide down', on: 'hover' }); //auto dropdown on hover menu items
$('.ui.modal').modal(); //set up for settings modal

function send_error(msg){
  $('body').toast({
    class: 'red',
    position: 'bottom center',
    title: 'Error:',
    showIcon: 'microphone',
    closeIcon: true,
    displayTime: 0,
    message: msg
  });
}

function send_info(msg){
  $('body').toast({
    class: 'blue',
    position: 'bottom center',
    showIcon: 'microphone',
    closeIcon: true,
    displayTime: 0,
    message: msg
  });
}

function open_settings(){
  $('.ui.modal').modal('show');
}
