new WOW().init();
$(document).ready(function(){ 
    $('.popup-with-zoom-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });
	$(document).on('click', '.video-wrap .play-button', function(){
		$(this).fadeOut('fast');
		$(this).prev()[0].play();
	})
	$(document).on('click', '.tab-button', function () {
		$(this).parent().find('.tab-button').removeClass('active');
		$(this).addClass('active');
	})
	$(document).on('click', '.tab-button', function(){
        $(this).parents('.tabs').find('.tabs-content > div').hide();
		$(this).parents('.tabs').find('.content-'+$(this).data('id')).fadeIn('fast');
    });
    $(document).on('click', ".map-wrap-top", function(){
        $("#map").slideToggle('fast');
    });
    $(".main-bg .show-more").on('click', function(){
        $('html, body').animate({
            scrollTop: $(".how-it-been").offset().top-60
        }, 500)
    });
    $("#gallery1, #gallery2, #gallery-coach-1").slick({
        slidesToShow: 3,
        slidesToScroll: 3,        
    });
    $("#gallery1, #gallery2").magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true,
        }
    });
    $(".coach-button").on('click', function(){
        setTimeout(function(){
            $(".slick-next").click();
        }, 300);
    })
    $(".menu-hrefs a").on('click', function(e){
        e.preventDefault();
        var str = $(this).attr('href');
        var selector = $('.'+str);
        $('html, body').animate({
            scrollTop: selector.offset().top-70
        }, 250);
    })
    setCurrentPrice()
    $("#callback-modal form").goldCarrotForm({
		url: 'ajax/callback.php',
    });
    $("#scroll-buy, .invite .big-button, .pay-btn").on('click', function(){
        // $('html, body').animate({
        //     scrollTop: $(".invite .big-button").offset().top - 70
        // }, 250);
        $("#payment-form").submit();
    });
})


function setCurrentPrice(){
    var currentDate = new Date;
    currentMonth = currentDate.getMonth()+1;
    currentDay = currentDate.getDate();
    if (currentMonth == 3) {
        $("#price-1").addClass("active")
        var width = currentDay / 31 * 100;
        $("#price-1 .circle").css("width", width+"%");
        $("#price-1 .current-price").append("Осталось " + (31-currentDay) + ' дн.').css("bottom", "-30px")
    }
    if (currentMonth > 3 && currentMonth <= 8) {
        $("#price-2").addClass("active")
        var days4 = 30,
            days5 = 31,
            days6 = 30,
            days7 = 31,
            days8 = 31;
        var days_sum = days4+days5+days6+days7+days8;
        if (currentMonth == 4){
            var days_p = currentDay;
            var width = days_p / days_sum * 100;
            console.log(days_p)
            var days_o = days8 + days7 + days6 + days5 + (days4 - currentDay);
        }
        if (currentMonth == 5) {
            var days_p = days4 + currentDay;
            var width = days_p / days_sum * 100;
            var days_o = days8 + days7 + days6 + (days5 - currentDay);            
        }
        if (currentMonth == 6) {
            var days_p = days5 + days4 + currentDay;
            var width = days_p / days_sum * 100;
            var days_o = days8 + days7 + (days6 - currentDay);
        }
        if (currentMonth == 7) {
            var days_p = days6 + days5 + days4 + currentDay;
            var width = days_p / days_sum * 100;
            var days_o = days8 + (days7 - currentDay);
        }
        if (currentMonth == 8) {
            var days_p = days7 + days6 + days5 + days4 + currentDay;
            var width = days_p / days_sum * 100;
            var days_o = (days8 - currentDay);
        }
        $("#price-1 .circle").css({ width: "100%", opacity: 1, background: "#4EA1D9"});
        $("#price-2 .circle").css("width", width + "%");
        $("#price-2 .current-price").append("Осталось " + days_o + ' дн.').css("bottom", '-15px')
    }
    if (currentMonth == 9) {
        $("#price-3").addClass("active")
        var width = currentDay / 30 * 100;
        $("#price-3 .circle").css("width", width + "%");
        $("#price-3 .current-price").append("Осталось " + (30 - currentDay) + ' дн.')
    }
    if (currentMonth == 10) {
        $("#price-4").addClass("active")
        var width = currentDay / 31 * 100;
        $("#price-4 .circle").css("width", width + "%");
        $("#price-4 .current-price").append("Осталось " + (31 - currentDay) + ' дн.')
    }
    if (currentMonth > 10) {
        $("#price-5").addClass("active")
        var width = currentDay / 30 * 100;
        $("#price-5 .circle").css("width", width + "%");
        $("#price-5 .current-price").append("Осталось " + (30 - currentDay) + ' дн.')
    }
}


function initMap() {
    var goa = { lat: 15.0099648, lng: 74.0232186 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: goa
    });
    var marker = new google.maps.Marker({
        position: goa,
        map: map
    });
    initMap2();
}

function initMap2() {
    var goa = { lat: 15.0099648, lng: 74.0232186 };
    var map = new google.maps.Map(document.getElementById('map-with-route'), {
        zoom: 17,
        center: goa
    });
    // var marker = new google.maps.Marker({
    //     position: goa,
    //     map: map
    // });
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

    directionsService.route({
        origin: "Airport Rd, Dabolim, Goa 403801, Индия",
        destination: "Пляж Палолем, Гоа",
        // waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}