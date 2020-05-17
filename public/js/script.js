//  Прелоадер
$(document).ready(function($) {
	var Body = $('body');
	Body.addClass('preloader-site');
});
$(window).load(function() {
	$('.preloader-wrapper').fadeOut();
	$('body').removeClass('preloader-site');
});

// Scroll to top
$("#to_top").click(function() {
	$("html, body").animate({ scrollTop: 0 }, "slow");
	return false;
});


// Tabs and Collapsible and modals
$('.collapsible').collapsible();
$('.tabs').tabs();
$('.modal').modal();
$('select').formSelect();


// Tests
$("#start_test").on("click", function() {
	$('.test_instrution').hide();
	$('.test_body').show();

	var date = new Date(new Date().valueOf() + 60 * 60 * 1000);
	$('#clock').countdown(date, function(event) {
		$(this).html(event.strftime('%H:%M:%S'));
	});
});


// Admin
$("i#post_form_file_icon").click(function () {
  $("input[type='file']#file_input").trigger('click');
});