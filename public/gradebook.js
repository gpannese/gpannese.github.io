async function fetchGradeData() {
  try {
    const response = await fetch('/api/grades');
    const data = await response.json();
    console.log("Fetched data:", data); // You should see this in Console
    populateGradebook(data);
  } catch (error) {
    console.error("Error fetching grade data:", error);
  }
}

function populateGradebook(data) {
  const tbody = document.getElementById("gradebook-body");
  tbody.innerHTML = "";

  data.forEach(row => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = row.name;

    const tdGrade1 = document.createElement("td");
    tdGrade1.textContent = row.assignment1;

    const tdGrade2 = document.createElement("td");
    tdGrade2.textContent = row.assignment2;

    const tdGrade3 = document.createElement("td");
    tdGrade3.textContent = row.assignment3;

    tr.appendChild(tdName);
    tr.appendChild(tdGrade1);
    tr.appendChild(tdGrade2);
    tr.appendChild(tdGrade3);
    tbody.appendChild(tr);
  });
}

fetchGradeData();
