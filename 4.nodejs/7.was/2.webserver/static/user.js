async function readUsers(users) {
    const response = await fetch(`/user/${users}`);
    const result = response.json();
    console.log("Result: ", result);
}