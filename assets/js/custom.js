const mainBody = document.querySelector('body');
const tabHamburgerMenu = document.querySelector('.tab-hamburger-menu');
const navigationMenu = document.querySelector('.main-header__navigation__menu');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMobileMenuButton = document.querySelector('.mobile-menu__close');

let window_width = window.innerWidth;

// ============ [ Show dropdown menu in tablet view ] ============ //
const tabMenuHandler = event => {
  event.preventDefault();
  event.target.classList.toggle('active');  
  navigationMenu.classList.toggle('opened');
}

// ============ [ Show dropdown menu in mobile view ] ============ //
const mobileMenuHandler = event => {
  event.preventDefault();
  event.target.classList.add('active');
  mobileMenu.classList.add('opened');
  mainBody.classList.add('no-scroll');
}
const closeMobileMenuHandler = event => {
  event.preventDefault();
  tabHamburgerMenu.classList.remove('active');
  mobileMenu.classList.remove('opened');
  mainBody.classList.remove('no-scroll');
}

if (window_width >= 768 && window_width <= 992) {
  tabHamburgerMenu.addEventListener('click', event => tabMenuHandler(event))
  tabHamburgerMenu.addEventListener('resize', event => tabMenuHandler(event))
}
if (window_width <= 767) { 
  tabHamburgerMenu.addEventListener('click', event => mobileMenuHandler(event))
  closeMobileMenuButton.addEventListener('click', event => closeMobileMenuHandler(event))
  tabHamburgerMenu.addEventListener('resize', event => mobileMenuHandler(event))
  closeMobileMenuButton.addEventListener('resize', event => closeMobileMenuHandler(event))
}

// ============= [ Home Slider ] ============= //
const homeSliderArrow_left = document.querySelector('.slider-arrows__button--left');
const homeSliderArrow_right = document.querySelector('.slider-arrows__button--right');
$(document).ready(function () {
  $('.home-slider').slick({
    infinite: true,
    // speed: 3000,
    // fade: true,
    // cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3500,
    autoplay: true,
    arrows: true,
    prevArrow: $('.slider-arrows__button--left'),
    nextArrow: $('.slider-arrows__button--right'),
  });

  $('.package-card-slider').slick({
    infinite: true,
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3500,
    dots: true,
    // rtl: true,
    prevArrow: '<span class="slick-arrow--left"><i class="fa-solid fa-arrow-left"></i></span>',
    nextArrow: '<span class="slick-arrow--right"><i class="fa-solid fa-arrow-right"></i></span>',
  });

  $('.testimonial-card-slider').slick({
    infinite: true,
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3500,
    dots: true,
    arrows: false,
    prevArrow: '<span class="slick-arrow--left"><i class="fa-solid fa-arrow-left"></i></span>',
    nextArrow: '<span class="slick-arrow--right"><i class="fa-solid fa-arrow-right"></i></span>',
  });
});

// ============ [ Dropdowns Begins ] ============ //
const dropdownBlockButton = document.querySelectorAll('.dropdown-block__button');
function closeAllDropdownBlocks() {
  const dropdownBlocks = document.querySelectorAll('.dropdown-block');
  dropdownBlocks.forEach(item => {
    item.querySelectorAll('.dropdown-block__data').forEach(subItem => subItem.classList.remove('opened'));
    item.classList.remove('active');
  });
  dropdownBlockButton.forEach(item => {
    item.classList.remove('active');
  });
}
function openThisDropdownBlock(event) {
  let this_item = event.target;
  let this_parent = event.target.closest('.dropdown-block');
  this_parent.querySelector('.dropdown-block__button').classList.toggle('active');
  let dropdownListContainer = this_parent.querySelector('.dropdown-block__data');
  if (dropdownListContainer.classList.contains('opened')) {
    dropdownListContainer.classList.remove('opened');
    this_parent.classList.remove('active');
  } else {
    dropdownListContainer.classList.add('opened');
    this_parent.classList.add('active');
  }
  dropdownListContainer.addEventListener('click', function () {
    dropdownListContainer.classList.remove('opened');
    this_parent.classList.remove('active');
  });
}
dropdownBlockButton.forEach(button => {
  button.addEventListener('click', function (elem) {
    let this_item_parent = elem.target.closest('.dropdown-block');
    if (!this_item_parent.classList.contains('active')) elem.stopPropagation();
    closeAllDropdownBlocks();
    openThisDropdownBlock(elem)    
  });
});
// disabling all dropdowns
document.addEventListener('click', () => closeAllDropdownBlocks(), false);
// ============ [ Dropdowns End ] ============ //

// ======= [ Tabs ] ======= //
const searchTab = document.querySelector('.search-tab');
const searchTabItems = searchTab?.querySelectorAll('.search-tab__list__item');
const searchTabData = searchTab?.querySelectorAll('.search-tab__data');
searchTabItems?.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    let thisItem = e.target;
    let thisItemId = thisItem.id;
    
    searchTabItems.forEach(tabData => tabData.classList.remove('current'))
    searchTabData.forEach(tabItem => tabItem.classList.remove('current'))
    let itemData_found = searchTab.querySelector(`#data-${thisItemId}`);
    thisItem.classList.add('current');
    itemData_found.classList.add('current');    
  }, false)
});

// document.addEventListener("DOMContentLoaded", function () {
//   const picker = new easepick.create({
//     element: "#datepicker",
//     css: [
//       "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css"
//     ],
//     zIndex: 10
//   });
// }, false);

// ============ [ flight tabs ] ============ //
const flightTabsContainer = document.querySelector('.flight-tabs');
const flightTabs = flightTabsContainer?.querySelectorAll('.flight-tabs__header__tab');
const flightTabsData = flightTabsContainer?.querySelectorAll('.flight-tabs__data__list');

flightTabs?.forEach(flightTab => {
  flightTab.addEventListener('click', event => {
    const thisItem_id = event.target.id;
    flightTabs.forEach(tab => tab.classList.remove('active'));
    flightTabsData.forEach(tabData => tabData.classList.remove('selected'));
    const flightTab_data = flightTabsContainer.querySelector(`#data-${thisItem_id}`);
    event.target.classList.add('active');
    flightTab_data.classList.add('selected');
  }, false);
});


// ========== [ gallery overlay ] ========== //
const galleryItems = document?.querySelectorAll('.package-details__gallery__item');
const galleryOverlay = document?.querySelector('.gallery-overlay-sec');
const galleryImageContainer = document?.querySelector('.gallery-overlay-image');
const showGalleryButton = document?.querySelector('.show-gallery');
const hideGalleryButton = document?.querySelector('.close-button');

// ========= [ Show Gallery ] ========= //
function showGalleryImage(item) {
  item.addEventListener('click', (elem) => {
    let this_item_img = elem.target.querySelector('img').getAttribute('src');
    galleryImageContainer.setAttribute('src', this_item_img);
    galleryOverlay.style.display = 'block';
  }, false);

}
galleryItems?.forEach(item => showGalleryImage(item));
galleryImageContainer.addEventListener('click', e => e.stopImmediatePropagation());

// ========= [ Hide Gallery ] ========= //
function hideGalleryImage() {
  galleryImageContainer.setAttribute('src', '');
  galleryOverlay.style.display = 'none';
}

hideGalleryButton?.addEventListener('click', e => hideGalleryImage());
galleryOverlay.addEventListener('click', e => hideGalleryImage());