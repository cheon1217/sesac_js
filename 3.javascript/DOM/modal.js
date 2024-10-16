const open = document.getElementById("open");
const close = document.getElementById("close");
// const modal = document.getElementsByClassName("modalContainer")[0];
const modal = document.querySelector(".modalcontainer");

// open.onclick = function() {
//     modal.style.display = "block";
// }

// close.onclick = function() {
//     modal.style.display = "none";
// }

open.onclick = () => {modal.style.display = "flex"};
close.onclick = () => {modal.style.display = "none"};