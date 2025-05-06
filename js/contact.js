// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Form Validation and Submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Email validation using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.innerHTML = 'Sending...';
      submitButton.disabled = true;
      
      // Simulate API call with timeout
      setTimeout(() => {
        alert('Thank you for your message. We will get back to you shortly!');
        contactForm.reset();
        submitButton.innerHTML = 'Send Message';
        submitButton.disabled = false;
      }, 1500);
    });
  }
  
  // Direction Tabs
  const directionTabs = document.querySelectorAll('.direction-tab');
  const directionPanels = document.querySelectorAll('.direction-panel');
  
  directionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and panels
      directionTabs.forEach(t => t.classList.remove('active'));
      directionPanels.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Get data-tab value and show corresponding panel
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // FAQ Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      // Check if this item is already active
      const isActive = item.classList.contains('active');
      
      // Close all items
      accordionItems.forEach(accItem => {
        accItem.classList.remove('active');
      });
      
      // If the clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});