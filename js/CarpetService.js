/****************SCript Questions in Carpet Service Booking Page *****************/
// Array of Results of all questions 
var AnswersAC = [
    //Default Value 
    {"City" :'Dubai'},
    {'Do you know the size of the carpets to be cleaned?' :'Yes'},
    {'Number of carpet you want to get cleaned?' : '1'},
    {"Tell us the size(s) of your carpet(s):" : {}},
    {"Do you have any specific instructions?" : 'Empty'}
];

//First Step Service 
$('.inner .type span').click(function(){
    $(this).addClass('active').siblings().removeClass('active')
    AnswersAC[1] ={'Do you know the size of the carpets to be cleaned?' :$(this).text()}
});
$('.inner .NRooms span').click(function(){
    $(this).addClass('active').siblings().removeClass('active')
    AnswersAC[2] ={'Number of carpet you want to get cleaned?'  :$(this).text()}
});
$('.inner .Size-Type span').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    $('.inner .Size-Type .unit').text($(this).text());
});
$('.inner .msg textarea').change(function(){
    AnswersAC[4] ={"Do you have any specific instructions?" : $(this).val()}
});

//when click on first next button
$('.Details .inner .Next:eq(0)').click(function(){
    // validation for City 
    if($('.city').data('class')){
        AnswersAC[0] = {"City" : $('.city').data('class')};
        //fadeout err message of city        
        $('.city').parent().next().fadeOut();
        //check size inputs 
        if($('.inner .Size-Type input:eq(0)').val() &&  $('.inner .Size-Type input:eq(1)').val()){
            //check value of input 
            if($('.inner .Size-Type input:eq(0)').val() > 0 &&  $('.inner .Size-Type input:eq(1)').val() > 0){
                $('.inner .Size-Type .Err').hide();
                AnswersAC[3] ={'Tell us the size(s) of your carpet(s)' : {'X' :`${$('.inner .Size-Type input:eq(0)').val()} ${$('.inner .Size-Type .unit').text()}` , 'Y':`${$('.inner .Size-Type input:eq(1)').val()} ${$('.inner .Size-Type .unit').text()}`}}
                 //move to next question
                $(this).parent().fadeOut(function(){
                    $(this).next().fadeIn();
                    $('.'+$(this).data('class') +'').removeClass('--current').addClass('--completed');
                    $('.'+$(this).next().data('class') +'').removeClass('--pending').addClass('--current');
                });
            }else{
                //show err message 
                $('.inner .Size-Type .Err').text('Please Enter Valid Size').show();
            }
        }else{
            $('.inner .Size-Type .Err').show();
        }
    } else{
        $('.city').parent().next().fadeIn();
    }
    console.log(AnswersAC)
});


//Move to Thid Question with validation
$('.Details .inner .Next:eq(1)').click(function(){
    const date = new Date;
    console.log(date.toDateString())
    console.log(AnswersAC);
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
