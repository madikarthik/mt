// Testimonial Slider
document.addEventListener('DOMContentLoaded', function() {
  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let testimonialInterval;

  function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show current slide and activate current dot
    testimonialSlides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
  }

  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= testimonialSlides.length) {
      nextIndex = 0;
    }
    showSlide(nextIndex);
  }

  // Initialize slider if slides exist
  if (testimonialSlides.length > 0) {
    // Add click events to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        showSlide(index);
        startAutoSlide();
      });
    });

    // Auto-advance slides
    function startAutoSlide() {
      testimonialInterval = setInterval(nextSlide, 5000);
    }

    startAutoSlide();
  }
});