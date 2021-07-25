/*const $button = document.querySelector('#sidebar-toggle');
const $wrapper = document.querySelector('.container-fluid');

$button.addEventListener('click', e => {
  e.preventDefault();
  $wrapper.classList.toggle('toggled');
});*/

$(document).ready(function () {
	//sidebar menu
	/*$(".sidebar .nav").on("click", "li a", function() {
		$(this).toggleClass("active").next().slideToggle();
	});*/
	//$('.sidebar .nav:has(li .nav-link)').toggleClass('has-child');

	$('.nav-ddmenu').find('.nav-ddmenu-inner').slideUp();
	$('.nav-ddmenu').find('.nav-link').click(function () {
		$(this).next('.nav-ddmenu-inner').slideToggle(100);
		$(this).toggleClass('active');
	});

	$(".sidebar-toggle").click(function () { //1] main menu
		$(".main-wrapper").toggleClass('toggled');//open the 1] main menu
		$(".overlay-box").fadeToggle();//open the 1] main menu
		$(".search-bar").removeClass('active');//close the 2] search menu
		$(".nav-right").removeClass('active');//close the 3] more menu
	});
	$(".overlay-box").click(function () {
		$(".main-wrapper").removeClass('toggled');
		$(".overlay-box").fadeOut();
	});
	$(".dots").click(function () { //3] more menu
		$(".nav-right").toggleClass('active');//open the 3] more menu
		$(".search-bar").removeClass('active');//close the 2] search menu
		$(".main-wrapper").removeClass('toggled');//close the 1] main menu
		$(".overlay-box").fadeOut();//close the 1] main menu
	});

	$(".language").click(function () {
		$(this).toggleClass('active');
	});

	$("#pbsnavbar").mouseleave(function () {
		$("#liLanguage").removeClass('active');
	});
	
	// $(".sidebar-sticky a").click(function(){
	// 	// alert('yes');
	// 	// $(".nav-right.active").removeClass('active');
	// });
	$(".search-menu").click(function () { //2] search menu
		$(".search-bar").toggleClass('active');//open the 2] search menu
		$(".nav-right").removeClass('active');//close the 3] more menu
		$(".main-wrapper").removeClass('toggled');//close the 1] main menu
		$(".overlay-box").fadeOut();//close the 1] main menu
	});
	$(".search-menu-close-button").click(function () {//for close the upper window for mobile view
		$(".search-bar").toggleClass('active')
	});

	$('.footer .footer-col h5.footer-heading').click(function () {
		$(this).parent('.footer .footer-col .col').find('.footer-collapse').slideToggle();
		$(this).toggleClass('active');
	});

});


