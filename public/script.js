document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".addButton").addEventListener("click", addEmployee);
    document.querySelectorAll(".updateButton").forEach(button => {
        button.addEventListener("click", (event) => updateEmployee(event));
    });

    document.querySelectorAll(".deleteButton").forEach(button => {
        button.addEventListener("click", (event) => deleteEmployee(event));
    });
});

const addEmployee = () => {
    window.location.href="/actions/add";
}

const updateEmployee = (event) => {
    const row = event.target.parentElement.parentElement;
    const id = row.children[0].textContent.trim();
    window.location.href = `/actions/update/${id}`;
}

const deleteEmployee = (event) => {
    const row = event.target.parentElement.parentElement;
    const id = row.children[0].textContent.trim();
    window.location.href = `/actions/delete/${id}`;
}