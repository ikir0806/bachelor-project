const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 6,
    freeMode: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});