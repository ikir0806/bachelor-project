catalogEl = document.querySelector('.movies');

catalogEl.addEventListener('click', e => {
    if (!e.target.classList.contains('movies__swiper-img')) {
        return;
    }
    const closestItem = e.target.closest('.movies__swiper-slide');
    const name = closestItem.dataset.name;
    sessionStorage.setItem("movieName", name);
})