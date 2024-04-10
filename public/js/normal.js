function getExercises() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "533c9c0dc9mshcc29e8b0f2c2758p1abd59jsn0ace4f09f3e3",
      "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
    },
  };

  fetch("https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises", options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      workout(data); // Call the workout function with the fetched data
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}

function workout(data) {
  data.forEach((exercise) => {
    const pElement = document.createElement("p");
    const p2Element = document.createElement("p");
    const hElement = document.createElement("h3");

    hElement.textContent = exercise.name;
    pElement.textContent = exercise.muscle;
    p2Element.textContent = exercise.instructions;

    document.body.appendChild(pElement);

    let workoutEl = document.getElementById("workout-container");
    workoutEl.appendChild(hElement);
    workoutEl.appendChild(pElement);
    workoutEl.appendChild(p2Element);
  });
}

getExercises();
