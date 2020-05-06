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

//Questions Script 
$('.Details .inner button').click(function(){
    console.log($('.step'));
    if($('.Details .inner').last().css('display') == 'none'){
        $(this).parent().fadeOut(function(){
            $(this).next().fadeIn().css('display' , 'flex');
            $('.'+$(this).data('class') +'').removeClass('activeNum').css('backgroundColor' , 'Green');
            $('.'+$(this).next().data('class') +'').addClass('activeNum')
        });
    }else{
        $('.inner button').text('Done');
    }
    // if($('.step:eq(0)').hasClass('--current')){
    //     $('.step:eq(0)').removeClass('--current').addClass('--completed').next().removeClass('--pending').addClass('--current');
    // }
    console.log($('.step').length)
    for(let i = 0 ; i < $('.step').length ; i++){
        if($('.step:eq('+i+')').hasClass('--current')){
            $('.step:eq('+i+')').removeClass('--current').addClass('--completed').next().removeClass('--pending');
            // if($('.step:eq('+i+')').hasClass('--current'))
            // $('.step:eq('+(i + 1)+')').removeClass('--pending').addClass('--current')
        }
    }

});
//Modein Select Country in Booking page
(function(){
    for(let i = 0 ; i < $('.modal ul li').length; i++){
        $('.modal ul li:eq('+i+')').click(function(){
            $('.city').text($(this).text());
            $('.fade').removeClass('show').css('display' , 'none');
            $('body').removeClass('modal-open')
        })
    }


    //SCript For Questions in Dry Page
    // for(let i =0 ; i < $('.Dry .Questions .collapse ').length ; i++ ){
    //     if($('.Dry .Questions .collapse:eq('+i+')').hasClass('show')){
    //         console.log($('.Dry .Questions .collapse ').length)
    //         $('.Dry .Questions .collapse:eq('+i+')').prev().css('backgroundColor' , 'rgb(46, 179, 183)').firs
    //     }
        
    // }
})();
// Data Picker in Booking page
//Date and time picker 
$(".form_datetime").datetimepicker({
    format: "dd MM yyyy - HH:ii P",
    showMeridian: true,
    autoclose: true,
    todayBtn: true
});


