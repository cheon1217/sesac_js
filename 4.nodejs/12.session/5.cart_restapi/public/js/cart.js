import { fetch_checkLoginStatus } from "./checkuser.js"

document.addEventListener("DOMContentLoaded", () => {
    fetch_checkLoginStatus();

    loadCart();
});

function loadCart() {
    fetch(`/api/cart`)
        .then(async (response) => {
            if (response.status === 200) {
                // 카드 가져오기 성공
                return response.json();
            } else if (response.status === 401) {
                const data = await response.json();
                alert(data.message);

                if (data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                }

                throw new Error("Unauthorized");
            } else {
                throw new Error("Failed to fetch cart data");
            }
        })
        .then((cart) => {
            displayCart(cart);
        })
        .catch((err) => {
            console.error(err);
        });
}

function displayCart(cartData) {
    const cart = cartData.cart || [];
    const cartTableBody = document.querySelector("#cartTable tbody");
    const totalAmountSpan = document.querySelector("#totalAmount");
    const emptyCartMessage = document.querySelector("#emptyCartMessageRow");

    cartTableBody.innerHTML = "";
    emptyCartMessage.style.display = "none";

    if (cart.length === 0) {
        emptyCartMessage.style.display = "table-row";
    }

    let totalAmount = 0;

    cart.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}
                <button class="increase-btn" data-product-id="${item.id}">+</button>
                <button class="decrease-btn" data-product-id="${item.id}">-</button>
            </td>
            <td><button class="remove-btn" data-product-id="${item.id}">삭제</button></td>
        `
        cartTableBody.appendChild(row);
        totalAmount += item.price * item.quantity;

        // 이벤트 리스터 등록
        row.querySelector(".increase-btn").addEventListener("click", (e) => {
            const productId = e.target.getAttribute("data-product-id");
            updateQuantity(productId, 1);
        }, { once: true });

        row.querySelector(".decrease-btn").addEventListener("click", (e) => {
            const productId = e.target.getAttribute("data-product-id");
            updateQuantity(productId, -1);
        }, { once: true });

        row.querySelector(".remove-btn").addEventListener("click", (e) => {
            const productId = e.target.getAttribute("data-product-id");
            removeFromCart(productId);
        }, { once: true });
    });

    totalAmountSpan.textContent = totalAmount;
}

function updateQuantity(productId, change) {
    fetch(`/api/cart/${productId}?change=${change}`, {
        method: "PUT",
    })
        .then((response) => response.json())
        .then((data) => {
            // 업데이트 성공
            displayCart(data)
        })
}

function removeFromCart(productId) {
    fetch(`/api/cart/${productId}`, {
        method: "DELETE"
    })
        .then(async (response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 204) {
                return {};
            } else {
                throw new Error("Failed to delete item from cart");
            }
        })
        .then((data) => {
            // 삭제 성공
            displayCart(data);
        })
}