document.getElementById('noButton').addEventListener('mouseenter', function(event) {
  const noButton = event.target;
  const noButtonRect = noButton.getBoundingClientRect();
  const newX = Math.random() * (window.innerWidth - noButtonRect.width);
  const newY = Math.random() * (window.innerHeight - noButtonRect.height);
  noButton.style.position = 'absolute';
  noButton.style.left = `${newX}px`;
  noButton.style.top = `${newY}px`;
});


document.getElementById('yesButton').addEventListener('click', function() {
  document.getElementById('valentineQuestion').style.display = 'none'; // Hide the question and buttons
  document.getElementById('thankYouMessage').style.display = 'block'; // Show the thank-you message and image
});

document.getElementById('yesButton').addEventListener('click', function() {
    sendData('Yes');
});

document.getElementById('noButton').addEventListener('click', function() {
    sendData('No');
});

function sendData(answer) {
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'answer': answer
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // For debugging, can replace with UI feedback
        // Optional: Provide feedback in the UI
        if (data.status === "success") {
            alert(data.message); // Or update the webpage dynamically
        }
    })
    .catch(error => console.error('Error:', error));
}

