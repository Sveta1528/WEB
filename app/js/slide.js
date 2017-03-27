const slides = document.querySelectorAll('.slides .slides__slide');
let currentSlide = 0;
const slideInterval = setInterval(nextSlide,5000);

function nextSlide() {
  slides[currentSlide].className = 'slides__slide';
  currentSlide = (currentSlide+1)%slides.length;
  slides[currentSlide].className = 'slides__slide slides__showing';
}
