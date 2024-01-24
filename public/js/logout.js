// Function: Handle user logout
const logout = async () => {
  // Send a POST request to the logout endpoint
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  // Redirect to the homepage if the logout is successful, otherwise show an alert
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log out.");
  }
};
// Attach the logout function to the click event of the logout button
document.querySelector("#logout").addEventListener("click", logout);
