document.addEventListener("DOMContentLoaded", () => {
    fetch("/products")
        .then(response => response.json())
        .then(products => displayProducts(products));

    fetch("/cart")
        .then(response => response.json())
        .then(products => displayCart(products));
});

function displayProducts(products) {
    const productTabletbody = document.querySelector("#productTable tbody");

    products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button onclick="addToCart(${product.id})">담기</button></td>
        `;
        productTabletbody.appendChild(row);
    });
}

function displayCart(cart) {
    const cartTabletbody = document.querySelector("#cartTable tbody");
    cartTabletbody.innerHTML = "";
    
    cart.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
        `;
        cartTabletbody.appendChild(row);
    });
}

function addToCart(productId) {
    fetch(`/add-to-cart/${productId}`, {method: "POST"});
    // TODO: 나중에 성공,실패 등등 확인하는 코드 작성
}
