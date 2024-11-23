const container = document.querySelector('.card-container');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');

prevBtn.addEventListener('click', () => {
    container.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

nextBtn.addEventListener('click', () => {
    container.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});
