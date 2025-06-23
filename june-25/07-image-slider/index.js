const carousel = document.getElementById('carousel');
const imageCount = 5; // Change as needed
let currentIndex = 0;
let isTransitioning = false;
let autoPlayTimer;
const images = [];

// Load images
for (let i = 0; i < imageCount; i++) {
    const img = document.createElement('img');
    img.src = `https://picsum.photos/800/400?random=${i}`;
    img.alt = `Random image ${i + 1}`;
    img.loading = "lazy";
    img.onerror = () => {
        img.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
    };
    images.push(img);
    carousel.appendChild(img);
}

// Clone first image to end for seamless loop
const firstClone = images[0].cloneNode(true);
carousel.appendChild(firstClone);

// Adjust carousel on screen resize
function updateCarousel(transition = true) {
    const width = carousel.offsetWidth;
    if (!transition) {
        carousel.style.transition = 'none';
    } else {
        carousel.style.transition = 'transform 0.5s ease-in-out';
    }
    carousel.style.transform = `translateX(-${currentIndex * width}px)`;
}

window.addEventListener('resize', () => {
    updateCarousel(false);
});

// Slide control
function nextImage() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarousel(true);
}

function prevImage() {
    if (isTransitioning) return;
    isTransitioning = true;
    if (currentIndex === 0) {
        currentIndex = imageCount;
        updateCarousel(false);
    }
    setTimeout(() => {
        currentIndex--;
        updateCarousel(true);
    }, 20);
}

// Handle transitionend for infinite loop
carousel.addEventListener('transitionend', () => {
    if (currentIndex === imageCount) {
        carousel.style.transition = 'none';
        currentIndex = 0;
        updateCarousel(false);
    }
    isTransitioning = false;
});

// Controls
document.querySelector('.controls button:first-child').onclick = prevImage;
document.querySelector('.controls button:last-child').onclick = nextImage;

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// Touch support
let startX = 0;
carousel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextImage();
    else if (endX - startX > 50) prevImage();
});

// Auto-play (pause on hover)
function startAutoPlay() {
    autoPlayTimer = setInterval(nextImage, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayTimer);
}

document.querySelector('.carousel-container').addEventListener('mouseenter', stopAutoPlay);
document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoPlay);


startAutoPlay(); // start initially

// Initialize position
updateCarousel(false);
