// Event handler: Handle form submission for creating a new comment
const commentFormHandler = async (event) => {
  event.preventDefault();
  // Get input values from the form
  const comment = document.querySelector("#comment").value.trim();
  const blogpostId = document.querySelector("#blogpost_id").value;
  // Check if the comment content is provided
  if (comment) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ comment, blogpostId }),
      headers: { "Content-Type": "application/json" },
    });
    // Redirect to the blogpost page if the request is successful, otherwise show an alert
    if (response.ok) {
      document.location.replace(`/blogpost/${blogpostId}`);
    } else {
      alert("Failed to sign up.");
    }
  }
};
// Attach the commentFormHandler to the form's submit event
document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
