// Booking Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize map
  const map = L.map('hotel-map').setView([31.4255, 78.2492], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
  // Add hotel marker
  L.marker([31.4255, 78.2492])
    .addTo(map)
    .bindPopup('Hotel Mount Kailash')
    .openPopup();

  // Get booking form elements
  const bookingForm = document.getElementById('bookingForm');
  const checkInDate = document.getElementById('checkInDate');
  const checkOutDate = document.getElementById('checkOutDate');
  const roomType = document.getElementById('roomType');
  const mealPlan = document.getElementById('mealPlan');
  const guests = document.getElementById('guests');
  
  // Room rates based on meal plan
  const roomRates = {
    deluxe: {
      'room-only': 2400,
      'with-breakfast': 3100,
      'veg-full': 3800,
      'non-veg-full': 4200
    },
    premium: {
      'room-only': 3200,
      'with-breakfast': 4000,
      'veg-full': 4600,
      'non-veg-full': 5000
    },
    family: {
      'room-only': 5000,
      'with-breakfast': 5600,
      'veg-full': 6400,
      'non-veg-full': 6800
    }
  };
  
  // Set min dates for check-in and check-out
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  checkInDate.min = formatDate(today);
  checkOutDate.min = formatDate(tomorrow);
  
  // Update booking summary when form inputs change
  [checkInDate, checkOutDate, roomType, mealPlan, guests].forEach(input => {
    input.addEventListener('change', updateBookingSummary);
  });
  
  function updateBookingSummary() {
    if (!checkInDate.value || !checkOutDate.value || !roomType.value || !mealPlan.value) return;
    
    const checkIn = new Date(checkInDate.value);
    const checkOut = new Date(checkOutDate.value);
    const nights = Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    const formatDisplayDate = date => {
      const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };
    
    const roomName = roomType.options[roomType.selectedIndex].text;
    const mealPlanName = mealPlan.options[mealPlan.selectedIndex].text;
    const ratePerNight = roomRates[roomType.value][mealPlan.value];
    const totalRoomRate = ratePerNight * nights;
    const taxes = Math.round(totalRoomRate * 0.12);
    const totalAmount = totalRoomRate + taxes;
    
    document.getElementById('summaryRoom').textContent = `${roomName} (${mealPlanName})`;
    document.getElementById('summaryCheckIn').textContent = formatDisplayDate(checkIn);
    document.getElementById('summaryCheckOut').textContent = formatDisplayDate(checkOut);
    document.getElementById('summaryNights').textContent = nights;
    document.getElementById('summaryGuests').textContent = guests.value;
    document.getElementById('summaryRate').textContent = `₹${totalRoomRate.toLocaleString()}`;
    document.getElementById('summaryTaxes').textContent = `₹${taxes.toLocaleString()}`;
    document.getElementById('summaryTotal').textContent = `₹${totalAmount.toLocaleString()}`;
  }
  
  // Form submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      if (!checkInDate.value || !checkOutDate.value || !roomType.value || !mealPlan.value) {
        alert('Please fill in all required fields.');
        return;
      }
      
      if (new Date(checkInDate.value) >= new Date(checkOutDate.value)) {
        alert('Check-out date must be after check-in date.');
        return;
      }
      
      const submitButton = bookingForm.querySelector('button[type="submit"]');
      submitButton.innerHTML = 'Processing...';
      submitButton.disabled = true;

      try {
        // Send email to hotel
        await emailjs.send("service_id", "template_id", {
          to_email: "karthik.madireddy@gmail.com",
          from_name: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
          from_email: document.getElementById('email').value,
          check_in: checkInDate.value,
          check_out: checkOutDate.value,
          room_type: roomType.options[roomType.selectedIndex].text,
          meal_plan: mealPlan.options[mealPlan.selectedIndex].text,
          guests: guests.value,
          special_requests: document.getElementById('specialRequests').value
        });

        // Send confirmation email to guest
        await emailjs.send("service_id", "template_confirmation_id", {
          to_email: document.getElementById('email').value,
          guest_name: document.getElementById('firstName').value
        });

        alert('Thank you for your booking! A confirmation email has been sent to your email address.');
        bookingForm.reset();
        
        document.getElementById('summaryRoom').textContent = '--';
        document.getElementById('summaryCheckIn').textContent = '--';
        document.getElementById('summaryCheckOut').textContent = '--';
        document.getElementById('summaryNights').textContent = '--';
        document.getElementById('summaryGuests').textContent = '--';
        document.getElementById('summaryRate').textContent = '--';
        document.getElementById('summaryTaxes').textContent = '--';
        document.getElementById('summaryTotal').textContent = '--';
      } catch (error) {
        alert('There was an error processing your booking. Please try again.');
      } finally {
        submitButton.innerHTML = 'Book Now';
        submitButton.disabled = false;
      }
    });
  }
});