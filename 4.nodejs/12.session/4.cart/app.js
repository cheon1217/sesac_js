const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const port = 3000;

const products = [
    {id: 1, name: "바나나", price: 2000},
    {id: 2, name: "사과", price: 3000},
    {id: 3, name: "오렌지", price: 1500},
]

// 정적 폴더를 public으로 정의
// 그말인즉, 사용자가 route를 요청해서, 그 중에 없으면?? 여기를 뒤져서 있는 파일 가져감
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "my-secret-1234",
    resave: false,
    saveUninitialized: true
}));

app.get("/products", (req, res) => {
    res.json(products);
});

app.get("/cart", (req, res) => {
    const cart = req.session.cart || [];
    res.json({ cart, totalCount: calculateTotalCount(cart) });
    // TODO: 카트 항목의 합산 가격도 반환하기
})

app.post("/add-to-cart/:productId", (req, res) => {
    const productId = parseInt(req.params.productId);
    // console.log(productId, typeof productId);
    const product = products.find((p) => p.id === productId);

    if (!product) {
        return res.status(404).json({message: "상품이 없어요 ㅠ"});
    }

    // TODO: 장바구니에 담는 코드 작성
    const cart = req.session.cart || []; // 있으면 해당 세션의 카트 가져오고 없으면 빈 배열로 초기화
    
    // 상품이 이미 장바구니에 있는지 확인
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
        existingItem.count += 1; // 있다면 개수 증가
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            count: 1,
        });
    }

    req.session.cart = cart;

    res.json({ message: "상품이 장바구니에 담겼습니다.", cart, totalCount: calculateTotalCount(cart) });
});

app.post("/update-product/:productId", (req, res) => {
    const productId = parseInt(req.params.productId);
    const modify = parseInt(req.query.modify);

    if (isNaN(productId) || isNaN(modify)) {
        return res.status(400).json({ message: "잘못된 요청" });
    }

    const cart = req.session.cart || [];

    const item = cart.find((i) => i.id === productId);

    if (!item) {
        return res.status(404).json({ message: "상품을 찾을 수 없음" });
    }

    item.count = Math.max(1, item.count + modify);

    req.session.cart = cart;

    res.json({ cart, totalCount: calculateTotalCount(cart) });
});

app.post("/remove-product/:productId", (req, res) => {
    const productId = parseInt(req.params.productId);

    if (isNaN(productId)) {
        return res.status(400).json({ message: "잘못된 요청" });
    }

    // const로 주면 error발생
    let cart = req.session.cart || [];
    const cartItemInd = cart.findIndex((i) => i.id === productId);

    if (cartItemInd === -1) {
        return res.status(404).json({ message: "상품을 찾을 수 없음" });
    }

    cart = cart.filter((_, i) => i !== cartItemInd);
    req.session.cart = cart;

    res.json({ cart, totalCount: calculateTotalCount(cart) });
});

app.listen(port, () => {
    console.log("Server Ready");
});

function calculateTotalCount(cart) {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
}