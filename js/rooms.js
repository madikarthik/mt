// Room Filtering and Image Gallery
document.addEventListener('DOMContentLoaded', function() {
  // Room Filtering
  const filterTabs = document.querySelectorAll('.filter-tab');
  const roomItems = document.querySelectorAll('.room-item');
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Get filter value
      const filterValue = tab.getAttribute('data-filter');
      
      // Filter rooms
      roomItems.forEach(room => {
        if (filterValue === 'all' || room.classList.contains(filterValue)) {
          room.classList.remove('hidden');
        } else {
          room.classList.add('hidden');
        }
      });
    });
  });

  // Room Images Gallery
  const roomGalleries = document.querySelectorAll('.room-gallery');
  
  roomGalleries.forEach(gallery => {
    const mainImage = gallery.querySelector('.main-image img');
    const thumbnails = gallery.querySelectorAll('.thumbnail');
    const prevBtn = gallery.querySelector('.gallery-prev');
    const nextBtn = gallery.querySelector('.gallery-next');
    let currentIndex = 0;
    
    function updateGallery(index) {
      const images = gallery.querySelectorAll('.thumbnail');
      mainImage.src = images[index].getAttribute('data-full');
      mainImage.alt = images[index].alt;
      
      images.forEach(img => img.classList.remove('active'));
      images[index].classList.add('active');
      
      currentIndex = index;
    }
    
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => updateGallery(index));
    });
    
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
      updateGallery(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % thumbnails.length;
      updateGallery(currentIndex);
    });
  });

  // Price breakdown toggle
  const priceToggles = document.querySelectorAll('.price-toggle');
  
  priceToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const priceBreakdown = this.nextElementSibling;
      const icon = this.querySelector('i');
      
      priceBreakdown.classList.toggle('active');
      this.classList.toggle('active');
      
      // Toggle icon
      if (priceBreakdown.classList.contains('active')) {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
      } else {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
      }
    });
  });

  // Check URL for room hash and scroll to it
  function scrollToRoom() {
    const hash = window.location.hash;
    if (hash) {
      const targetRoom = document.querySelector(hash);
      if (targetRoom) {
        setTimeout(() => {
          window.scrollTo({
            top: targetRoom.offsetTop - 100,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }
  
  // Execute on page load
  scrollToRoom();
  
  // Also execute when hash changes
  window.addEventListener('hashchange', scrollToRoom);
});