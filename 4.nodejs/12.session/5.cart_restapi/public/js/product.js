import { fetch_checkLoginStatus } from "./checkuser.js"

document.addEventListener("DOMContentLoaded", () => {
    fetch_checkLoginStatus();
    loadProduct();
});

function loadProduct() {
    fetch("/api/products")
        .then((response) => response.json())
        .then((products) => displayProducts(products))
}

function displayProducts(products) {
    const productTableBody = document.querySelector("#productTable tbody");

    products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button class="add-to-cart-btn" data-product-id="${product.id}">담기</button></td>
        `
        productTableBody.appendChild(row);

        row.querySelector(".add-to-cart-btn").addEventListener("click", function () {
            const productId = this.getAttribute("data-product-id");
            addToCart(productId);
        }, { once: true });
    });
}

function addToCart(productId) {
    // fetch 구현 필요
    fetch(`api/cart/${productId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status === 200) {
                // 장바구니 담기 성공
                return response.json();
            } else if (response.status === 401) {
                response.json()
                    .then((data) => {
                        alert(data.message);
                        if (data.redirectUrl) {
                            window.location.href = data.redirectUrl;
                        }
                        throw new Error("Unauthorized");
                    });
                // 장바구니 담기 실패
            } else {
                throw new Error("Failed to fetch cart data");
            }
        })
        .then((data) => {
            alert(data.message);
            return fetch("/api/cart")
        })
        .then((response) => response.json())
        .then((data) => {
            window.location.href = "/cart";
        })
        .catch(error => {
            console.error("주문 오류:", error);
            alert("상품 담기 실패");
        });
}