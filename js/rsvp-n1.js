document.addEventListener("DOMContentLoaded", function() {
  // Reuse the existing getURLParameter function
  function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
  }

  // Existing logic to check for each guest parameter and update the field if present
  for(let i = 1; i <= 6; i++) {
      let guestParam = getURLParameter('guest' + i);
      if(guestParam !== null) {
          let guestInput = document.getElementById('guest' + i);
          let guestContainer = document.getElementById('guest' + i + 'Container');
          guestInput.value = guestParam;
          guestContainer.style.display = 'flex';
          guestContainer.style.alignItems = 'center';
          guestContainer.style.justifyContent = 'space-between';
      }
  }

  // New logic for "I promise to dance if you play"
  var dancePromise = getURLParameter('dancePromise');
  if(dancePromise !== null) {
      document.getElementById('dancePromise').value = dancePromise;
  }

  // New logic for "write a note to the couple"
  var noteToCouple = getURLParameter('noteToCouple');
  if(noteToCouple !== null) {
      document.getElementById('noteToCouple').value = noteToCouple;
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
        // If response is OK, redirect to the thank you page
        window.location.href = "/rsvp-thank-you.html";
      } catch (error) {
        console.error('Error parsing JSON:', error);
        // If JSON parsing fails, you might still want to consider the request successful.
        // Decide based on your application's requirements.
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Redirect to the error page if the fetch fails or response is not OK
      window.location.href = "/about.html";
    });
});
