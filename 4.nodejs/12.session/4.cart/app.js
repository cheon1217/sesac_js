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
    res.json(cart);
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
    
    cart.push({
        id: product.id,
        name: product.name,
        price: product.price
    });

    req.session.cart = cart;

    res.json({message: "상품이 장바구니에 담겼습니다."});
});

app.listen(port, () => {
    console.log("Server Ready");
});