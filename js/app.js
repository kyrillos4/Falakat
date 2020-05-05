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
let Result = [];
$('.Details .inner button').click(function(){
    if($('.Details .inner').last().css('display') == 'none'){
        $(this).parent().fadeOut(function(){
            $(this).next().fadeIn().css('display' , 'flex');
            console.log( $('.'+$(this).data('class') +''))
            $('.'+$(this).data('class') +'').css('backgroundColor' , 'Green');
            console.log( $('.'+$(this).data('class') +'').next());
        });
    }else{
      $('.inner button').text('Done');
    }
    // $(this).parent().addClass('wow fadeInDown').next().addClass('wow fadeInUp')
})