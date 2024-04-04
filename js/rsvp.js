document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Fetch the guest list from the JSON file
    fetch('json/guest_list.json')
        .then(response => response.json())
        .then(guestList => {
            const query = document.getElementById('searchQuery').value.trim().toLowerCase(); // Trim whitespaces and convert to lowercase
            const errorMessage = document.getElementById('errorMessage');

            // Reset error message
            errorMessage.textContent = '';

            // Convert guestList keys to lowercase to perform a case-insensitive search
            const lowerCaseGuestList = Object.keys(guestList).reduce((acc, key) => {
                acc[key.toLowerCase()] = guestList[key];
                return acc;
            }, {});

            // Check if lowercase query is in lowerCaseGuestList
            if (lowerCaseGuestList.hasOwnProperty(query)) {
                window.location.href = lowerCaseGuestList[query]; // Redirect user to the URL from guestList
            } else {
                errorMessage.textContent = 'Guest not found. Please make sure you are typing your full name'; // Show error message
            }
        })
        .catch(error => {
            console.error('Error fetching guest list:', error);
            errorMessage.textContent = 'Error loading guest data. Please try again later.'; // Show loading error message
        });
});
