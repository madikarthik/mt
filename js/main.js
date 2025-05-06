// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
  // Hero Background Images
  const heroImages = [
    'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ];
  
  const hero = document.querySelector('.hero');
  let currentImageIndex = 0;

  function updateHeroBackground() {
    if (!hero) return; // Skip if hero element doesn't exist
    
    const nextImage = new Image();
    nextImage.src = heroImages[(currentImageIndex + 1) % heroImages.length];
    
    // Preload next image before changing
    nextImage.onload = () => {
      currentImageIndex = (currentImageIndex + 1) % heroImages.length;
      hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('${heroImages[currentImageIndex]}')`;
    };
  }

  // Only set up the interval if hero element exists
  if (hero) {
    // Change background every 5 seconds
    setInterval(updateHeroBackground, 5000);
  }

  // Header scroll effect
  const header = document.getElementById('header');
  const scrollThreshold = 100;

  function handleHeaderScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Initial check for page load
  handleHeaderScroll();

  // Event listener for scroll
  window.addEventListener('scroll', handleHeaderScroll);

  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navigation = document.querySelector('.navigation');

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
      mobileNavToggle.classList.toggle('active');
      navigation.classList.toggle('active');
      
      // Prevent scrolling when menu is open
      document.body.classList.toggle('no-scroll');
    });
  }

  // Close mobile navigation when a link is clicked
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (mobileNavToggle.classList.contains('active')) {
        mobileNavToggle.classList.remove('active');
        navigation.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // Scroll animations
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  function checkScroll() {
    animatedElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight * 0.9) {
        element.classList.add('visible');
      }
    });
  }
  
  // Initial check
  checkScroll();
  
  // Add event listener for scroll
  window.addEventListener('scroll', checkScroll);
});