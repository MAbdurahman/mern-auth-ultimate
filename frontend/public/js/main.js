/* ==========================================
            Preloader
============================================= */
$(window).on('load', function () {
	// makes sure that whole site is loaded
	$('#preloader-gif, #preloader').fadeOut(3500, function () {});
});