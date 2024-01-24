// Event handler: Handle form submission for creating a new blogpost
const blogpostFormHandler = async (event) => {
  event.preventDefault();
  // Get input values from the form
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#blogpost").value.trim();
  // Check if both title and content are provided
  if (content && title) {
    // Send a POST request to create a new blogpost
    const response = await fetch("/api/blogpost", {
      method: "POST",
      body: JSON.stringify({ content, title }),
      headers: { "Content-Type": "application/json" },
    });
    // Redirect to the dashboard if the request is successful, otherwise log the error
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      console.log(response);
      alert("Failed to log in.");
    }
  }
};
// Event handler: Handle form submission for updating an existing blogpost
const updateFormHandler = async (event) => {
  event.preventDefault();
  // Get input values from the form
  const id = document.querySelector("#blogpost_id").value;
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#blogpost").value.trim();
  // Check if the blogpost ID is provided
  if (id) {
    // Send a PUT request to update the existing blogpost
    const response = await fetch(`/api/blogpost/${id}`, {
      method: "PUT",
      body: JSON.stringify({ content, title }),
      headers: { "Content-Type": "application/json" },
    });
    // Redirect to the updated blogpost if the request is successful, otherwise log the error
    if (response.ok) {
      document.location.replace(`/blogpost/${id}`);
    } else {
      console.log(response);
      alert("Failed to log in.");
    }
  }
};
// Event handler: Handle form submission for deleting an existing blogpost
const deleteFormHandler = async (event) => {
  event.preventDefault();
  // Get the blogpost ID from the form
  const id = document.querySelector("#blogpost_id").value;
  // Check if the blogpost ID is provided
  if (id) {
    const response = await fetch(`/api/blogpost/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    // Redirect to the dashboard if the request is successful, otherwise log the error
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      console.log(response);
      alert("Failed to log in.");
    }
  }
};
// Event listeners: Attach event handlers to buttons
const updateBtn = document.querySelector("#update-btn");
const submitBtn = document.querySelector("#submit-btn");
const deleteBtn = document.querySelector(".delete-btn");
if (submitBtn) {
  submitBtn.addEventListener("click", blogpostFormHandler);
}
if (updateBtn) {
  updateBtn.addEventListener("click", updateFormHandler);
}
if (deleteBtn) {
  deleteBtn.addEventListener("click", deleteFormHandler);
}
