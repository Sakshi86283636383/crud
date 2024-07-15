var selectedRow = null;

// Show alerts
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);
    
    setTimeout(() => div.remove(), 3000);
}

// Clear All fields
function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollnumber").value = ""; // corrected ID
    selectedRow = null; // Reset selectedRow after clear
}

// Function to handle form submission or update
function addOrUpdateStudent() {
    var firstName = document.querySelector("#firstName").value;
    var lastName = document.querySelector("#lastName").value;
    var rollNumber = document.querySelector("#rollnumber").value;

    if (firstName === "" || lastName === "" || rollNumber === "") {
        showAlert("Please fill in all fields", "danger");
        return;
    }

    if (selectedRow === null) {
        // Add new row if selectedRow is null
        var table = document.querySelector("#student-list");
        var newRow = table.insertRow();

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);

        cell1.textContent = firstName;
        cell2.textContent = lastName;
        cell3.textContent = rollNumber;

        cell4.innerHTML = '<a href="#" class="btn btn-warning btn-sm edit">Edit</a> ' +
                          '<a href="#" class="btn btn-danger btn-sm delete">Delete</a>';

        showAlert("Student Data Added", "success");

        clearFields();
    } else {
        // Update existing row if selectedRow is not null
        selectedRow.cells[0].textContent = firstName;
        selectedRow.cells[1].textContent = lastName;
        selectedRow.cells[2].textContent = rollNumber;

        showAlert("Student Data Updated", "info");

        clearFields();
    }
}

// Event listener for form submission
document.querySelector("#student-form").addEventListener("submit", function(e) {
    e.preventDefault();
    addOrUpdateStudent();
});

// Event listener for table rows (for edit and delete buttons)
document.querySelector("#student-list").addEventListener("click", function(e) {
    e.preventDefault();
    var target = e.target;

    // Edit button clicked
    if (target.classList.contains("edit")) {
        // Select the row to edit
        selectedRow = target.parentElement.parentElement;

        // Populate form fields with selected row data
        document.querySelector("#firstName").value = selectedRow.cells[0].textContent;
        document.querySelector("#lastName").value = selectedRow.cells[1].textContent;
        document.querySelector("#rollnumber").value = selectedRow.cells[2].textContent;
    }

    // Delete button clicked
    if (target.classList.contains("delete")) {
        if (confirm("Are you sure you want to delete this student's data?")) {
            target.parentElement.parentElement.remove();
            showAlert("Student Data Deleted", "danger");
        }
    }
});
