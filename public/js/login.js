// Event handler: Handle form submission for user login
const loginFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Get input values from the login form
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  // Check if both username and password are provided
  if (username && password) {
    // Send a POST request to the login endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    // Redirect to the homepage if the login is successful, otherwise log the error
    if (response.ok) {
      document.location.replace("/");
    } else {
      console.log(response);
      alert("Failed to log in.");
    }
  }
};
// Attach the loginFormHandler to the login form's submit event
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
