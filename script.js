document.getElementById("emailForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  // Change this to your own email address
  let recipient = "youremail@gmail.com";

  // Gmail compose link
  let mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  // Redirect user to Gmail
  window.location.href = mailtoLink;
});
