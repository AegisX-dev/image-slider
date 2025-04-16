// Array of One Piece images stored locally in the 'assets' folder
const images = [
    { src: "assets/luffy gear 5.jpg", caption: "Luffy's Gear Fifth" },
    { src: "assets/Zoro's Sword Mastery.jpg", caption: "Zoro's Sword Mastery" },
    { src: "assets/Nami's Navigation.jpg", caption: "Nami's Navigation" },
    { src: "assets/Thousand Sunny.jpg", caption: "Thousand Sunny" },
    { src: "assets/Straw Hat Crew.jpg", caption: "Straw Hat Crew" }
];

let currentIndex = 0;
let autoSlideInterval;
const slideDuration = 3000; // 3 seconds per slide

// Get DOM elements
const sliderContainer = document.querySelector('.slider-container');
const slidesContainer = document.querySelector('.slides');
const captionElement = document.querySelector('.caption');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const playPauseBtn = document.querySelector('.play-pause-btn');
const indicatorsContainer = document.querySelector('.indicators');

// Populate slides and indicators
images.forEach((image, index) => {
    // Create slide
    const img = document.createElement('img');
    img.src = image.src;
    img.classList.add('slide');
    if (index === 0) img.classList.add('active');
    slidesContainer.appendChild(img);

    // Create numbered indicator
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    indicator.textContent = index + 1;
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
});

// Show slide based on index
function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    captionElement.textContent = images[index].caption;

    // Update active slide and indicator
    document.querySelectorAll('.slide').forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.indicator').forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    currentIndex = index;
}

// Navigation functions
function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showSlide(currentIndex);
}

function goToSlide(index) {
    showSlide(index);
}

// Automatic slideshow
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, slideDuration);
    playPauseBtn.textContent = '❚❚';
    playPauseBtn.classList.remove('playing');
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    playPauseBtn.textContent = '▶';
    playPauseBtn.classList.add('playing');
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
playPauseBtn.addEventListener('click', () => {
    if (playPauseBtn.textContent === '❚❚') {
        stopAutoSlide();
    } else {
        startAutoSlide();
    }
});

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

sliderContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) nextSlide(); // Swipe left
    if (touchEndX - touchStartX > 50) prevSlide(); // Swipe right
});

// Initialize slider
showSlide(0);
startAutoSlide();