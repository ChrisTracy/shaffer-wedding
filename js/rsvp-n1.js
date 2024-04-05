document.addEventListener("DOMContentLoaded", function() {
  function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
  }

  let anyGuestExists = false; // Flag to check if any guest exists

  for(let i = 1; i <= 6; i++) {
      let guestParam = getURLParameter('guest' + i);
      if(guestParam !== null) {
          anyGuestExists = true; // Set the flag to true if any guest exists
          let guestInput = document.getElementById('guest' + i);
          let guestContainer = document.getElementById('guest' + i + 'Container');
          guestInput.value = guestParam;
          guestContainer.style.display = 'flex';
          
          // Make the guest2 container writable and clear the field if it's "plus one"
          if (i === 2 && guestParam.toLowerCase() === "p1") {
              guestInput.readOnly = false;
              guestInput.value = ""; // Clear the field
          }
      }
  }

  // Show the conditional sections if any guest exists
  if(anyGuestExists) {
      document.getElementById('conditionalSections').style.display = 'block';
  }

  var dancePromise = getURLParameter('dancePromise');
  if(dancePromise !== null) {
      document.getElementById('dancePromise').value = dancePromise;
  }

  var noteToCouple = getURLParameter('noteToCouple');
  if(noteToCouple !== null) {
      document.getElementById('noteToCouple').value = noteToCouple;
  }
});


document.getElementById("guestForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  var formData = new FormData(event.target);

  // Show the spinner
  document.getElementById("spinner").style.display = 'block';

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
    // Hide the spinner
    document.getElementById("spinner").style.display = 'none';

    try {
      const data = JSON.parse(text); // Manually parse the text to JSON
      console.log(data);
      // If response is OK, redirect to the thank you page
      window.location.href = "/rsvp-thank-you.html";
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    // Hide the spinner
    document.getElementById("spinner").style.display = 'none';

    // Redirect to the error page if the fetch fails or response is not OK
    window.location.href = "/about.html";
  });
});
