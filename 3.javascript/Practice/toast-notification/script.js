const button = document.getElementById("button");
const toasts = document.getElementById("toasts");

const messages = [
    "Message One",
    "Message Two",
    "Message Three",
    "Message Four",
]

const types = ["info", "success", "error"];

button.addEventListener("click", () => createNotification());

function createNotification(message, type) {
    const notif = document.createElement("div");
    notif.classList.add("toast");
    notif.classList.add(type ? type : getRandomType());

    notif.innerText = message ? message : getRandomMessage();

    toasts.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    }, 3000);
}

function getRandomType() {
    return types[Math.floor(Math.random() * types.length)];
}

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
}