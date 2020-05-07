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



//All Questions and answers  in Dry Page 
let Questions = [
                '1) Do you have a minimum charge?' ,
                '2) Do you have any delivery fees?',
                '3) How do I know how much my total order amount is?',
                '4) How do I pay?',
                '5) How do you clean my clothes?',
                '6) Can you remove all the stains?',
                '7) Are there any items you cannot clean?',
                '8) Who cleans my clothes?',
                '9) What should I do for my first pick-up?',
                '10) Do I have to be home when you come to collect or drop my laundry?',
                '11) When do I get back my clean items?',
                '12) What is your damaged item policy?',
                '13) How do you deliver my items?',
                '14) At what times can my order be collected or delivered?'
            ];
let Answers = [
                'We have a minimum charge of as low as AED 25.',
                'No. We do not have any delivery fees.',
                'We will bring an itemized receipt which will give you the details of the total fees when we deliver your order.',
                'You can pay by credit card or cash upon the receipt of your fresh clothes.',
                "frontend.Our laundry experts look at your items' care labels at our facilities and decide whether it would be washed or dry cleaned. We will choose the optimal cleaning option for your clothes.",
                'frontend.Our trained specialists use the latest technology equipment and stain removal products at our facilities. We cannot guarantee all the stains would be removed but we can guarantee we are going to do everything in our resources to remove them. Please let us know about your specific stain removal instructions when our delivery people come to collect your clothes.',
                'We clean anything that is on our pricing table.',
                'We have certified, highly-trained 3rd party dry cleaners that clean your clothes in the best way possible.',
                'All you need to do is have your items to be cleaned ready for our delivery people to collect. We will come up with our bag to place all your items in. You can also place your items in a bag yourself. Let the delivery specialist know about any special instructions and wait for your fresh laundry to be delivered the next day.',
                'Not necessarily. You can leave your bag outside your door or with your security (if allowed). Please let us know about where you would like us to drop your clothes in case you will not be home.',
                'We will deliver your items the next day after 6 pm. We have no extra charges for the next day delivery.',
                'sadasd',
                'Shirts and blouses will be on hanger unless otherwise is instructed.',
                'We pick up every day from 8 am until 10 pm. Our delivery will happen the next day after 6 pm unless you have special instructions.'
        ];

        //Function to loop all Questions and answers 
(function(){
    for(let i = 0 ; i < Questions.length ; i++){
        console.log('Ques')
        $('.questionsBlock').append(`
        <div class="card " data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
        <div class="card-header" id="headingOne">
            <h5 class="mb-0">
            <button class="btn collapsed">
            ${Questions[i]}
            </button>
            </h5>
        </div>
        <div id="collapse${i}" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
                ${Answers[i]}
            </div>
        </div>
        </div>
        
        `)
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