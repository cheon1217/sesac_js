const body = document.body;
const toggleButton = document.getElementById("toggleTheme");

toggleButton.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    toggleButton.textContent = newTheme === "light" ? "Toggle Dark Mode" : "Toggle Light Mode";
    
    body.setAttribute("data-bs-theme", newTheme);
});