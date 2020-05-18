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
var login = false;

//loading page 
$(document).ready(function(){
    $('#loading').fadeOut();
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
                 if(login === false){
                    $(this).attr('data-toggle' , 'modal').attr('data-target' , '#LoginModel');
                }else{
                    $(this).attr('data-toggle' , 'modal').attr('data-target' , false);
                    $(this).parent().fadeOut(function(){
                        $(this).next().fadeIn();
                        $($(this).data('class')).removeClass('--current').addClass('--completed');
                        $($(this).next().data('class')).removeClass('--pending').addClass('--current');
                    });
                }
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
    //date validation
    if($('.date input').val()){
        // data-toggle="modal" data-target="#MapModel"
        $(this).attr('data-toggle' , 'modal').attr('data-target' , '#MapModel');
        $($(this).parent().data('class')).removeClass('--current').addClass('--completed');
        $($(this).parent().next().data('class')).removeClass('--pending').addClass('--current');
        $('.Errors:eq(1)').css('display' , 'none');
    }else{
        $('.Errors:eq(1)').css('display' , 'block');
    }
});

// function back button in Question Booking page
$('.Details .inner .Back').click(function(){
    $(this).parent().fadeOut(function(){
        $($(this).prev().data('class')).removeClass('--completed').addClass('--current').nextAll().addClass('--pending');
        $($(this).data('class')).removeClass('--current').addClass('--pending');
        $(this).prev().fadeIn();
    })
});

//Carpet Numbers Function 
$('.ApartOpt span').click(function(){
    console.log($(this).data('value'));
    for(let i = 0; i < $(this).data('value'); i++){
        if($('.Size-Type .size').length < $(this).data('value') ){
            $('.Size-Type').append(`
            <div class="size d-flex justify-content-start align-items-center ">
                <input type="number" placeholder="1. Carpet">
                <p class="m-0">X</p>
                <input type="number" placeholder="1. Carpet">
                <p class="unit m-0">CM</p>
            </div>
            <p class="Err text-danger font-weight-bold">Please Enter Carpet Size</p>
            `);
        }else{
            for(let i = $('.Size-Type .size').length ; i >= $(this).data('value') ; i--){
                $(`.size:eq(${i})`).remove();
            }
        }
    }
});

//Map Model
//Map Continue Button 
$('#MapContinue').click(function(){
    //check input filed 
    if($('.DetailsBlock input:eq(1)').val() && $('.DetailsBlock input:eq(2)').val()){
        $('.DetailsBlock span').fadeOut();
        AnswersAC[4] = {'Address' : $('.DetailsBlock input:eq(0)').val()}
        $('#MapContinue').attr('data-dismiss' , 'modal');
        $('.DateBlock').parent().fadeOut(function(){
            $('.DateBlock').parent().next().fadeIn();
            $('.stepThree').removeClass('--current').addClass('--completed');
            $('.stepThree').next().removeClass('--pending').addClass('--current');
        });
    }else{
        $('.DetailsBlock span').fadeIn();
    }
});

//Payment Part Functions 
$('.payment div').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    $(this).children('input').attr('checked' , true);
    $(this).siblings().children('input').attr('checked' , false);
    if($('.visa').hasClass('active')){
        $('.visaDetails .row').fadeIn().css('display' , 'flex');
    }else{
        $('.visaDetails .row').fadeOut();
    }
});

//Login Model script
$('#LoginModel input').keydown(function(){
    if($(this).val()){
        $('.Next').prop("disabled", false);
    }else{
        $('.Next').prop("disabled", true);
    }
});
$('#LoginModel .Next').click(function(){
    $(this).prop("disabled", false);
    if($('#PhoneNumber').val().length <= 8){
        $('.phone .err').fadeIn();
    }else{
        $('.phone .err').fadeOut();
        $('.phone').fadeOut(function(){
            $('.verficationNumber').fadeIn().css('display' , 'flex');
        });
        $(this).fadeOut(function(){
            $(this).next().fadeIn();
        });
    }
});

$('#LoginModel .continuebtn').click(function(){
    login = true;
    $('.continuebtn').attr('data-dismiss' , 'modal');
})


//Payment Validations 
$('.Done').click(function(){
    //check input filed 
    for(let i = 0; i < $('.visaDetails input').length ; i ++ ){
        if($.isNumeric($(`.visaDetails input:eq(${i})`).val())){
            if($(`.visaDetails input:eq(${i})`).val().length < $(`.visaDetails input:eq(${i})`).attr('maxlength')){
                $(`.visaDetails input:eq(${i})`).next('span').css('display' , 'block');
            }else{
                $(`.visaDetails input:eq(${i})`).next('span').css('display' , 'none');
            }
        }else{
            $(`.visaDetails input:eq(${i})`).next('span').css('display' , 'block');
        }
    }
    //check card holder name
    let ValidName = /^[A-Za-z]+$/;
    if($('.visaDetails input:eq(3)').val().length >= 4){
        if(ValidName.test($('.visaDetails input:eq(3)').val())){
            $('.visaDetails input:eq(3)').next('span').hide();
        }else{
            $('.visaDetails input:eq(3)').next('span').show().text('Please Enter Valid Name');
        }
    }else if(!$('.visaDetails input:eq(3)').val()){
        $('.visaDetails input:eq(3)').next('span').show().text('Please Enter Card Holder Name');
    }else{
        $('.visaDetails input:eq(3)').next('span').show().text('Please Enter Valid Name');
    }
});


// Data Picker in Booking page
$(".form_datetime").datetimepicker({
    format: "dd MM yyyy - HH:ii P",
    showMeridian: true,
    autoclose: true,
    todayBtn: true,
    startDate: new Date,
    hoursDisabled: [0,1,2,3,4,5,6,7,19,20,21,22,23,24],
    // minuteStep: 15
    todayBtn: false,
});
