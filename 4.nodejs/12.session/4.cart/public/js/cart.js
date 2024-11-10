document.addEventListener("DOMContentLoaded", () => {
    // displayCart();

    fetch("/products")
        .then(response => response.json())
        .then(products => displayProducts(products));

    
    fetch("/cart")
        .then(response => response.json())
        .then(cartItem => displayCart(cartItem));
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

function displayCart(cartItem) {
    const cart = cartItem.cart || [];
    const cartTabletbody = document.querySelector("#cartTable tbody");
    const totalSpan = document.querySelector("#totalCount");
    const emptyCartRow = document.querySelector("#emptyCart");

    cartTabletbody.innerHTML = "";
    emptyCartRow.style.display = "none";

    if (cart.length === 0) {
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
                <span class="count" id="count-${item.id}">${item.count}</span>
                <button onclick="increase(${item.id})">+</button>
                <button onclick="decrease(${item.id})">-</button>
            </td>
            <td><button onclick="removeProduct(${item.id})">삭제</button></td>
        `;
        cartTabletbody.appendChild(row);
        totalCount += item.price * item.count;
    });

    console.log(totalCount);
    totalSpan.textContent = totalCount;
}

function increase(productId) {
    updateCount(productId, 1);
};

function decrease(productId) {
    updateCount(productId, -1);
};

function updateCount(productId, modify) {
    fetch(`/cart/${productId}?modify=${modify}`, { method: "PUT" })
        .then((response) => response.json())
        .then((cartItem) => {
            displayCart(cartItem);
        });
}

function removeProduct(productId) {
    fetch(`/cart/${productId}`, { method: "DELETE" })
        .then(async (response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 204) {
                return {};
            } else {
                throw new Error("삭제 실패");
            }
        })
        .then((cartItem) => {
            displayCart(cartItem);
        })
}

function addToCart(productId) {
    fetch(`/cart/${productId}`, {method: "POST"})
    // TODO: 나중에 성공,실패 등등 확인하는 코드 작성
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            fetch("/cart")
                .then((response) => response.json())
                .then(() => {
                    window.location.href = "/index.html";
                });
        });
}
