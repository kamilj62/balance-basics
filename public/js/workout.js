// Event handler for submitting a new blog post
const newFormHandler = async (event) => {
  event.preventDefault();

  // Get input values from the form
  const created_at = document.querySelector("#created_at").value;
  const title = document.querySelector("#workout-title").value;
  const workout = document.querySelector("#workout").value;

  // Check if all required fields are filled
  if (created_at && title && workout) {
    // Send a POST request to create a new blog post
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify({ created_at, title, workout }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    // If the request is successful, redirect to the dashboard
    if (response.ok) {
      document.location.replace("/workout");
    } else {
      alert("Failed to create workout post");
    }
  }
};

// Event handler for deleting a workout
const delButtonHandler = async (event) => {
  console.log(event);

  // Check if the delete button was clicked
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    // Send a DELETE request to delete the specified blog post
    const response = await fetch(`/api/workouts/${id}`, {
      method: "DELETE",
    });

    // If the request is successful, redirect to the dashboard
    if (response.ok) {
      document.location.replace("/workout");
    } else {
      alert("Failed to delete workout");
    }
  }
};

// Add event listeners to the respective elements
// document
//   .querySelector(".new-workout-form")
//   .addEventListener("submit", newFormHandler);

// document
//   .querySelector(".btn-delete")
//   .addEventListener("click", delButtonHandler);

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".new-workout-form")
    .addEventListener("submit", newFormHandler);
  document
    .querySelector(".btn-delete")
    .addEventListener("click", delButtonHandler);
});
