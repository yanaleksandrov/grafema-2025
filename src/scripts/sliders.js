import Swiper from 'swiper';

const slidersList = [];
const sliders     = document.querySelectorAll('.swiper');

sliders && sliders.forEach((slider, index) => {
    let options = {};

    // if slider is init, destroy them, this can be in "window resize" event
    if (slidersList[index]) {
        slidersList[index].destroy(true, true);
    }

    if (slider.classList.contains('themes__slider')) {
        options = {
            centeredSlides: true,
            slidesPerView: 'auto',
            effect: 'slide',
            speed: 750,
            loop: true,
            loopAdditionalSlides: 1,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: '.themes__slider-nav-prev',
                nextEl: '.themes__slider-nav-next',
            },
        };
    }

    if (Object.keys(options).length !== 0) {
        slidersList[index] = new Swiper(slider, options);
    } else {
        if (slidersList[index]) {
            slidersList[index].destroy(true, true);
        }
        slidersList[index] = null;
    }
});
