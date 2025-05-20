const images = [
    { id: 1, image: 'https://i.pinimg.com/736x/2d/d1/3c/2dd13c6e7f977d194b78a06c5056fd25.jpg' },
    { id: 2, image: 'https://i.pinimg.com/736x/88/dd/d5/88ddd5c9257bd1fa0d299c31abebd500.jpg' },
    { id: 3, image: 'https://i.pinimg.com/736x/4c/53/03/4c5303ff9bdb19e2264b258fd5a7d47c.jpg' },
    { id: 4, image: 'https://i.pinimg.com/736x/a3/51/2f/a3512f14edf8bbd0dad889e5478421dd.jpg' },
    { id: 5, image: 'https://i.pinimg.com/736x/f0/ac/6d/f0ac6d0b8ce1e640eb7619796c6b2c44.jpg' }
];

let currentIndex = 0;

const sliderImage = document.getElementById('slider-image');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

function updateImage(direction = 'left') {
    sliderImage.classList.remove('slide-left', 'slide-right');
    void sliderImage.offsetWidth; // Force reflow for restart animation
    sliderImage.classList.add(direction === 'left' ? 'slide-left' : 'slide-right');
    sliderImage.src = images[currentIndex].image;
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage('left');
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage('right');
}

leftBtn.addEventListener('click', () => {
    showPrevImage();
    resetAutoSlide();
});

rightBtn.addEventListener('click', () => {
    showNextImage();
    resetAutoSlide();
});

let slideInterval = setInterval(showNextImage, 2000);

function resetAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(showNextImage, 2000);
}

// Initialize
updateImage();
