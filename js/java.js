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
})