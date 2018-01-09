$(document).ready(function () {

	// кнопка мобильного меню
	var mobMenuButton = $('.mobile-menu__btn'),
			mobMenuBlock = $('.mobile-menu-nav-list');
	$('.mobile-menu__btn').on('click', function (event) {
		mobMenuBlock.toggleClass('mobile-menu-nav-list--show');
	});

	// настройка списка в мобильном меню
	$('.mobile-menu-drop').hide();
	$('.mobile-menu-nav-list__item--title').click(function () {
		$('.mobile-menu-nav-list__item--title').toggleClass('mobile-menu-nav-list__item-link--active');
		$('.mobile-menu-drop').slideToggle(100);
	});

	// настройка списков в футере
	var footerListLink = $('.footer-nav__list-link');
			footerListSubList = $('.footer-nav__sub-list');

	$('.footer-nav__list-link').on('click', function (event) {
		event.preventDefault();
		$('.footer-nav__list-link').toggleClass('footer-nav__list-link--active');
		$('.footer-nav__sub-list').toggleClass('footer-nav__sub-list--show');
	});

	// настройка слайдера Последние новости
	$('.responsive-last-news-slider').slick({
		dots: false,
		infinite: true,
		speed: 400,
		autoplay: true,
		autoplaySpeed: 8000,
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: '.slider-buttons__prev--last-news',
		nextArrow: '.slider-buttons__next--last-news',
		responsive: [{
				breakpoint: 1170,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});

	// настройка слайдера Наши объекты
	$('.our-objects-slider').slick({
		dots: false,
		infinite: true,
		speed: 400,
		autoplay: true,
		autoplaySpeed: 8000,
		slidesToShow: 1,
		arrows: true,
		prevArrow: '.slider-buttons__prev--our-objects',
		nextArrow: '.slider-buttons__next--our-objects'
	});

	// настройка слайдера Что мы делаем
	$('.what-we-do-slider').slick({
		dots: false,
		infinite: true,
		speed: 400,
		autoplay: true,
		autoplaySpeed: 8000,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: '.slider-buttons__prev--what-we-do',
		nextArrow: '.slider-buttons__next--what-we-do',
		responsive: [{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});

	// настройка слайдера Наша команда
	$('.our-team-slider').slick({
		dots: false,
		infinite: true,
		speed: 400,
		autoplay: true,
		autoplaySpeed: 8000,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: '.slider-buttons__prev--our-team',
		nextArrow: '.slider-buttons__next--our-team',
		responsive: [{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});
});

// Табы на странице Обьекты
function openTypeObjects(evt, cityName) {
	var i, tabcontent, tablinks; // Declare all variables
	tabcontent = document.getElementsByClassName("object__tabs-content"); // Get all elements with class="tabcontent" and hide them

	for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
	}

	tablinks = document.getElementsByClassName("objects__tabs-tablinks"); // Get all elements with class="tablinks" and remove the class "active"
	for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" objects__tabs-tablinks--active", "");
	}
	
	document.getElementById(cityName).style.display = "flex"; // Show the current tab, and add an "active" class to the button that opened the tab
	evt.currentTarget.className += " objects__tabs-tablinks--active";
}
document.getElementById("defaultOpen").click();