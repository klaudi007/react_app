function notify(message,status){
$('.kdnotification-title').html(message);
funcking();
if(status==1){
$('#notification').css({'background-color':'rgba(0,0,0,.4)'}).fadeIn('slow').delay(1000).fadeOut('slow');
}else{
$('#notification').css({'background-color':'rgba(216,0,12,.6)'}).fadeIn('slow').delay(3000).fadeOut('slow');
}
}

function funcking(){
      var kd=$('.kdnotification');

      var viewportHeight = $(window).height(),
          viewportWidth = $(window).width(),
          kdheight = kd.height(),kdwidth = kd.width(),
          hdiff = viewportHeight - kdheight,
          vdiff = viewportWidth - kdwidth,
      	 left=30,
      	 top=hdiff-65;
      kd.css({'top':top+'px','left':left+'px'});
      // console.log('viewportHeight : '+viewportHeight+' viewportWidth : '+viewportWidth+'  kdheight : '+kdheight+'  kdwidth : '+kdwidth+'  top : '+top+'  Left (%) : '+left); 
    }





