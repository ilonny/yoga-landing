$(document).ready(function(){ 
	// new WOW().init();
	$(document).on('click', '.video-wrap .play-button', function(){
		$(this).fadeOut('fast');
		$(this).prev()[0].play();
	})
	$(document).on('click', '.tab-button', function () {
		$(this).parent().find('.tab-button').removeClass('active');
		$(this).addClass('active');
	})
	$(document).on('click', '.tab-button', function(){
        console.log(123)
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
    $("#gallery1, #gallery2").slick({
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
})
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