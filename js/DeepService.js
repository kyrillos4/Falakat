/****************SCript Questions in Booking Page *****************/
// Array of Results of all questions 
var AnswersDeep = [
    //Default Value 
    {"City" :'Dubai'},
    {'Type of home' :'Apartment'},
    {'Number of bedrooms?' : 'Studio (AED 500)'},
    {"Do you have any specific instructions?" : 'Empty'}

];
var login = false;
//loading page 
$(document).ready(function(){
    $('#loading').fadeOut();
});
//scroll button
$(window).scroll(function(){
    if($(window).scrollTop() > 700){
        $('.scroll').css('display' , 'flex').show();
    }else{
        $('.scroll').hide();
    }
});
$('.scroll').click(function(){
    $(window).scrollTop(0);
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
    AnswersDeep[1] ={'Type of home' :$(this).text()}
    $(''+$(this).data('class')+'').show().siblings().hide();
});
$('.inner .NRooms span').click(function(){
    $(this).addClass('active').siblings().removeClass('active')
    AnswersDeep[2] ={'Number of bedrooms?':$(this).text()}
});
$('.inner .msg textarea').change(function(){
    AnswersDeep[3] ={"Do you have any specific instructions?" : $(this).val()}
});

//when click on first next button
$('.Details .inner .Next:eq(0)').click(function(){
    // validation for City 
    if($('.city').data('class')){
        AnswersDeep[0] = {"City" : $('.city').data('class')};
        //fadeout err message of city        
        $('.city').parent().next().fadeOut();
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
    } else{
        $('.city').parent().next().fadeIn();
    }
    console.log(AnswersDeep)
});

//Move to Thid Question with validation
$('.Details .inner .Next:eq(1)').click(function(){
    //date validation
    if(DateAnswers[0] && DateAnswers[1] && DateAnswers[2] ){
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

//Map Model
//Map Continue Button 
$('#MapContinue').click(function(){
    //check input filed 
    if($('.DetailsBlock input:eq(1)').val() && $('.DetailsBlock input:eq(2)').val()){
        $('.DetailsBlock span').fadeOut();
        AnswersDeep[4] = {'Address' : $('.DetailsBlock input:eq(0)').val()}
        $('#MapContinue').attr('data-dismiss' , 'modal');
        $('.Date').fadeOut(function(){
            $('.Date').next().fadeIn();
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

// // Data Picker in Booking page
// $(".form_datetime").datetimepicker({
//     format: "dd MM yyyy - HH:ii P",
//     showMeridian: true,
//     autoclose: true,
//     todayBtn: true,
//     startDate: new Date,
//     hoursDisabled: [0,1,2,3,4,5,6,7,19,20,21,22,23,24],
//     // minuteStep: 15
//     todayBtn: false,
// });

const date = new Date();
var day = 0;
var DayOfMonth = 1;
let weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
let Time = date.getHours() + '.' + date.getMinutes();
let HourSelected ;
let DateAnswers = [];

$(document).ready(function(){
    for(let i = 0; i < 12 ; i++){
        let NumDays = date.getDate() + i;
        let DayName = date.getDay() + i;
        if(NumDays > 31){
            NumDays = DayOfMonth;
            DayOfMonth ++;
        }
        if(DayName > 6){
            DayName = day;
            day ++;
        }
        if(day > 6){
            day=0;
        }
        //append Days 
        $('.Days').append(`
            <div class="Day">
                <p>${weekday[DayName]}</p>
                <span class='Nday'>${NumDays}</span>
            </div>
        `);
        //check Time if biger Than 18 (Workign Hours ) will dissabled this day
        if(Number(Time) > 18.30){
            $('Days .Day:eq(0)').addClass('disabled');
        }
    }
    //check available Hours 
    for(let i =0; i < $('.Hours p').length ; i++){
        if($(`.Hours p:eq(${i})`).data('value') < Time){
            $(`.Hours p:eq(${i})`).addClass('disabled').prevAll().addClass('disabled');
        }
    }
    //Function Date Selection
    //Fun To Select Day 
    $('.Days .Day span').click(function(){
        for(let i =0; i < $('.Days .Day span').length; i++){
            $(`.Days .Day span:eq(${i})`).removeClass('active');
            
        }
        $(this).addClass('active');
        //check it disabled of not 
        if (!$(this).hasClass("disabled")) {
            DateAnswers[0] = {'Day' : $(this).text()}
        }
    });
    //Fun to Select Time
    $('.Hours p').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        //check it disabled of not 
        if (!$(this).hasClass("disabled")) {
            DateAnswers[1] = {'Time' : $(this).text()}
        }
        // Function Cleaners Hours 
        HourSelected = $(this).data('value');
        for(let i = 0; i < $('.StayNum span').length ; i++ ){
            $(`.StayNum span:eq(${i})`).data('value') > Math.ceil(19 - HourSelected)  ? $(`.StayNum span:eq(${i})`).hide() : $(`.StayNum span:eq(${i})`).show();
        }
    });
    //active Cleaner Hours 
    $('.StayNum span').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        DateAnswers[2] = {'Cleaners Hours ' : $(this).data('value')}
    });
});

//Arrow Functions  to Scroll Date
let scroll = 0;
$('.rightAr').click(function(){
    scroll += 50;
    $(this).parent().scrollLeft(scroll);
});
$('.leftAr').click(function(){
    scroll -= 50;
    $(this).parent().scrollLeft(scroll);
});