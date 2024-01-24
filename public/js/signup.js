// Event handler: Handle form submission for user signup
const signupFormHandler = async (event) => {
  event.preventDefault();
  // Get input values from the signup form
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  // Check if both username and password are provided
  if (username && password) {
    // Send a POST request to the signup endpoint
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    // Redirect to the homepage if the signup is successful, otherwise show an alert
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to sign up.");
    }
  }
};
// Attach the signupFormHandler to the signup form's submit event
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
