// Gallery Filtering and Lightbox
document.addEventListener('DOMContentLoaded', function() {
  // Gallery Filtering
  const filterTabs = document.querySelectorAll('.filter-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Get filter value
      const filterValue = tab.getAttribute('data-filter');
      
      // Filter gallery items
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
  
  // Lightbox Functionality
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  
  let currentIndex = 0;
  const visibleItems = () => Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
  
  // Open lightbox when clicking on a gallery item
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const items = visibleItems();
      currentIndex = items.indexOf(item);
      
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption');
      
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      
      if (caption) {
        const captionTitle = caption.querySelector('h3').textContent;
        const captionText = caption.querySelector('p').textContent;
        lightboxCaption.innerHTML = `<h3>${captionTitle}</h3><p>${captionText}</p>`;
      } else {
        lightboxCaption.innerHTML = '';
      }
      
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });
  
  // Close lightbox
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  });
  
  // Also close when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Navigate to previous image
  lightboxPrev.addEventListener('click', () => {
    const items = visibleItems();
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateLightboxContent(items[currentIndex]);
  });
  
  // Navigate to next image
  lightboxNext.addEventListener('click', () => {
    const items = visibleItems();
    currentIndex = (currentIndex + 1) % items.length;
    updateLightboxContent(items[currentIndex]);
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    const items = visibleItems();
    
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateLightboxContent(items[currentIndex]);
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % items.length;
      updateLightboxContent(items[currentIndex]);
    } else if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Update lightbox content
  function updateLightboxContent(item) {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');
    
    // Add transition effect
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      
      if (caption) {
        const captionTitle = caption.querySelector('h3').textContent;
        const captionText = caption.querySelector('p').textContent;
        lightboxCaption.innerHTML = `<h3>${captionTitle}</h3><p>${captionText}</p>`;
      } else {
        lightboxCaption.innerHTML = '';
      }
      
      lightboxImage.style.opacity = '1';
    }, 300);
  }
});