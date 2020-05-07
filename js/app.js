// awoul Carousel Script 
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
});

/****************SCript Questions in Booking Page *****************/
$('.Details .inner button').click(function(){
    if($('.Details .inner').last().css('display') == 'none'){
        $(this).parent().fadeOut(function(){
            $(this).next().fadeIn().css('display' , 'flex');
            $('.'+$(this).data('class') +'').removeClass('--current').addClass('--completed');
            $('.'+$(this).next().data('class') +'').removeClass('--pending').addClass('--current')
        });
    }else{
        $('.inner button').text('Done');
    }
});


//Mode in Select Country in Booking page
(function(){
    for(let i = 0 ; i < $('.modal ul li').length; i++){
        $('.modal ul li:eq('+i+')').click(function(){
            $('.city').text($(this).text());
            $('.fade').removeClass('show').css('display' , 'none');
            $('body').removeClass('modal-open')
        })
    }
})();
// Data Picker in Booking page
//Date and time picker 
$(".form_datetime").datetimepicker({
    format: "dd MM yyyy - HH:ii P",
    showMeridian: true,
    autoclose: true,
    todayBtn: true
});


