document.addEventListener("DOMContentLoaded", () => {
    // displayCart();

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
    const cartAll = cart.cart || [];
    const cartTabletbody = document.querySelector("#cartTable tbody");
    const total = document.querySelector("#totalCount");
    const emptyCartRow = document.querySelector("#emptyCart");

    cartTabletbody.innerHTML = "";
    emptyCartRow.style.display = "none";

    if (cartAll.length === 0) {
        emptyCartRow.style.display = "table-row";
    }

    let totalCount = 0;
    
    cart.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <span class="modify" id="modify-${item.id}">${item.count}</span>
                <button onclick="increase(${item.id})">+</button>
                <button onclick="decrease(${item.id})">-</button>
            </td>
            <td><button onclick="removeProduct(${item.id})">삭제</button></td>
        `;
        cartTabletbody.appendChild(row);
        totalCount += item.price * item.count;
    });

    console.log(totalCount);
    total.textContent = totalCount;
}

function increase(productId) {
    updateCount(productId, 1);
};

function decrease(productId) {
    updateCount(productId, -1);
};

function updateCount(productId, modify) {
    fetch(`/update-product/${productId}?modify=${modify}`, { method: "POST" })
        .then((response) => response.json())
        .then((cart) => {
            displayCart(cart);
        });
}

function addToCart(productId) {
    fetch(`/add-to-cart/${productId}`, {method: "POST"})
    // TODO: 나중에 성공,실패 등등 확인하는 코드 작성
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            fetch("/cart")
                .then((response) => response.json())
                .then((cart) => {
                    window.location.href = "/index.html";
                });
        });
}
