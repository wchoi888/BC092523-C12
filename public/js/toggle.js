// Function: Toggle visibility of a post with index 'i'
function viewpost(i) {
  // Get the element with the id 'post{i}'
  var element = document.getElementById(`post${i}`);
  // Toggle the display property between 'block' and 'none'
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}
