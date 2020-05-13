/****************SCript Questions in Booking Page *****************/
// Array of Results of all questions 
var AnswersDry = [
    //Default Value 
    {"City" :'Dubai'},
    {'Date & Time' :new Date},
    {"Do you have any specific instructions?" : 'Empty'}

];

$('.inner .msg textarea').change(function(){
    AnswersDry[2] ={"Do you have any specific instructions?" : $(this).val()}
});

//when click on first next button
$('.Details .inner .Next:eq(0)').click(function(){
    // validation for City 
    if($('.city').data('class')){
        AnswersDry[0] = {"City" : $('.city').data('class')};
        //fadeout err message of city        
        $('.city').parent().next().fadeOut();
        if($('.date input').val()){
            AnswersDry[1] = {'Date & Time' : $('.date input').val()}
            // data-toggle="modal" data-target="#MapModel"
            $('.Errors:eq(1)').css('display' , 'none');
            $(this).attr('data-toggle' , 'modal').attr('data-target' , '#MapModel');
        }else{
            $('.Errors:eq(1)').css('display' , 'block');
        }
        //move to next question
        // $(this).parent().fadeOut(function(){
        //     $(this).next().fadeIn();
        //     $('.'+$(this).data('class') +'').removeClass('--current').addClass('--completed');
        //     $('.'+$(this).next().data('class') +'').removeClass('--pending').addClass('--current');
        // });
    } else{
        $('.city').parent().next().fadeIn();
    }
    console.log(AnswersDry)
});


//Move to Thid Question with validation
$('.Details .inner .Next:eq(1)').click(function(){
    const date = new Date;
    console.log(date.toDateString())
    console.log(AnswersDry);
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
