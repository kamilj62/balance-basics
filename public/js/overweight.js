function getOverWeight() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ac148c6ab8msh9a1f9ab61777768p15dbb4jsnf71c5c75c7b4",
      "X-RapidAPI-Host": "gym-fit.p.rapidapi.com",
    },
  };

  fetch("https://gym-fit.p.rapidapi.com/exercises/search", options)
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
  data.forEach(async (exercise) => {
    if (exercise.bodyParts == "Core") {
      const pElement = document.createElement("h3");
      const p2Element = document.createElement("p");

      pElement.textContent = exercise.name;
      p2Element.textContent = exercise.bodyParts;
      let workoutEl = document.getElementById("workout-container");
      workoutEl.appendChild(pElement);
      workoutEl.appendChild(p2Element);
      const divEl = document.createElement("div");
      divEl.textContent = "instructions";
      workoutEl.appendChild(divEl);
      const instructions = await getInstructions(exercise.id);
      instructions.forEach((instruction) => {
        console.log(instruction.description);
        const pEl = document.createElement("p");
        pEl.textContent = instruction.description;
        divEl.appendChild(pEl);
      });
    }
  });
}

getOverWeight();

async function getInstructions(id) {
  const url = `https://gym-fit.p.rapidapi.com/exercises/exercise/${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ac148c6ab8msh9a1f9ab61777768p15dbb4jsnf71c5c75c7b4",
      "X-RapidAPI-Host": "gym-fit.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.instructions;
  } catch (error) {
    console.error(error);
  }
}
