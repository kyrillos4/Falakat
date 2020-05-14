/****************SCript Questions in Booking Page *****************/
// Array of Results of all questions 
var AnswersSofa = [
    //Default Value 
    {"City" :'Dubai'},
    {'What type of sofa(s) or chair(s) would you like to clean?' :'Leather'},
    {'Number of king/queen mattresses (AED 199 per unit)' : '0'},
    {'Number of chair/1-seater sofas (AED 50 per sofa)' : '0'},
    {'Number of 2-seater sofas (AED 99 per sofa)' : '0'},
    {'Number of 3-seater sofas (AED 149 per sofa)' : '0'},
    {'Number of 4-seater sofas (AED 199 per sofa)' : '0'},
    {'Number of 5-seater sofas (AED 249 per sofa)' : '0'},
    {"Do you have any specific instructions?" : 'Empty'}

];

//First Step Service 
$('.inner .type span').click(function(){
    $(this).addClass('active').siblings().removeClass('active')
    AnswersSofa[1] ={'Type of home' :$(this).text()}
    $(''+$(this).data('class')+'').show().siblings().hide();
});
for(let i = 0 ; i < $('.inner .NRooms').length ; i++){
    $('.inner .NRooms:eq('+i+') span').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
        AnswersSofa[ i + 1] ={ 'Number of king/queen mattresses (AED 199 per unit)' :$(this).text()}
    });
}

$('.inner .msg textarea').change(function(){
    AnswersSofa[8] ={"Do you have any specific instructions?" : $(this).val()}
});

//when click on first next button
$('.Details .inner .Next:eq(0)').click(function(){
    // validation for City 
    if($('.city').data('class')){
        AnswersSofa[0] = {"City" : $('.city').data('class')};
        //fadeout err message of city        
        $('.city').parent().next().fadeOut();
        //move to next question
        $(this).parent().fadeOut(function(){
            $(this).next().fadeIn();
            $('.'+$(this).data('class') +'').removeClass('--current').addClass('--completed');
            $('.'+$(this).next().data('class') +'').removeClass('--pending').addClass('--current');
        });
    } else{
        $('.city').parent().next().fadeIn();
    }
    console.log(AnswersSofa)
});


//Move to Thid Question with validation
$('.Details .inner .Next:eq(1)').click(function(){
    const date = new Date;
    console.log(date.toDateString())
    console.log(AnswersSofa);
    //date validation
    if($('.date input').val()){
        // data-toggle="modal" data-target="#MapModel"
        $(this).attr('data-toggle' , 'modal').attr('data-target' , '#MapModel');
        $('.Errors:eq(1)').css('display' , 'none');
    }else{
        $('.Errors:eq(1)').css('display' , 'block');
    }
});

// function back button in Question Booking page
$('.Details .inner .Back').click(function(){
    $(this).parent().fadeOut(function(){
        $('.'+$(this).prev().data('class') +'').removeClass('--completed').addClass('--current');
        $('.'+$(this).data('class') +'').removeClass('--current').addClass('--pending');
        $(this).prev().fadeIn();
    })
});

//Mode in Select Country in Booking page
(function(){
    for(let i = 0 ; i < $('.modal ul li').length; i++){
        $('.modal ul li:eq('+i+')').click(function(){
            $('.city').text($(this).text());
            $('.city').attr('data-class',$(this).text());
            $('.fade').removeClass('show').css('display' , 'none');
            $('body').removeClass('modal-open').css('padding' , '0');
        })
    }
})();

// Data Picker in Booking page
$(".form_datetime").datetimepicker({
    format: "dd MM yyyy - HH:ii P",
    showMeridian: true,
    autoclose: true,
    todayBtn: true,
    startDate:true,
});
