document.addEventListener("DOMContentLoaded", function() {
    // Function to get URL parameters
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }
  
    // Check for each guest parameter and update the field if present
    for(let i = 1; i <= 4; i++) {
        let guestParam = getURLParameter('guest' + i);
        if(guestParam !== null) {
            let guestInput = document.getElementById('guest' + i);
            let guestContainer = document.getElementById('guest' + i + 'Container');
            guestInput.value = guestParam;
            guestContainer.style.display = 'flex'; // Show the container in flex layout if that's your original design
            guestContainer.style.alignItems = 'center'; // Make sure items are aligned in the center
            guestContainer.style.justifyContent = 'space-between'; // Adjust spacing to match original layout
        }
    }
});

document.getElementById("guestForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    var formData = new FormData(event.target);
    
    fetch(event.target.action, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.text(); // Use .text() if the response might not be JSON
    })
    .then(text => {
      try {
        const data = JSON.parse(text); // Manually parse the text to JSON
        console.log(data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });