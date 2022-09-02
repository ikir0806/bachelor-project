catalogEl = document.querySelector('.music');

catalogEl.addEventListener('click', e => {
    if (!e.target.classList.contains('music__swiper-img')) {
        return;
    }
    const closestItem = e.target.closest('.music__swiper-slide');
    const name = closestItem.dataset.name;
    console.log(name);
    sessionStorage.setItem("albumName", name);
})