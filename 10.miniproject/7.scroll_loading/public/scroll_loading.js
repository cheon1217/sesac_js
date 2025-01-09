const container = document.getElementById("scroll-container");
let itemsPerLoad = 20;
let start = 0;
let end = start + itemsPerLoad;
let isLoading = false; // 로딩 상태를 저장하는 플래그
let totalItems = 0;
const maxVisibleItems = 100;

// 초기 데이터 로딩
fetchData();

// 필요할 때 데이터 로딩
function fetchData() {
    isLoading = true; // 로딩 시작
    fetch(`/api/data?start=${start}&end=${end}`)
        .then((response) => response.json())
        .then((items) => {
            console.log(`시작: ${start}, 끝: ${end}`);
            items.forEach((item) => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("item");
                itemElement.textContent = item;
                container.appendChild(itemElement);
            })

            while (container.children.length > maxVisibleItems) {
                container.removeChild(container.firstChild);
            }

            totalItems += items.length;
    
            start += items.length;
            end = start + itemsPerLoad;
            isLoading = false; // 로딩 완료
        })
        .catch(() => {
            isLoading = false; // 로딩 실패 시에도 플래그 초기화
        });
}

function fetchPrevData() {
    const firstItem = container.firstElementChild;
    console.log(firstItem);

    const pend = firstItem ? parseInt(firstItem.textContent.replace("Item ", "")) -1 : 0;
    const pstart = pend - itemsPerLoad;

    console.log(`이전 데이터 로딩 ... ${pstart} ~ ${pend}`);
    fetch(`/api/data?start=${pstart}&end=${pend}`)
        .then((response) => response.json())
        .then((items) => {
            items.forEach((item) => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("item");
                itemElement.textContent = item;
                container.insertBefore(itemElement, firstItem);
            });

            // 좌표를 계산해서 그만큼 스크롤바를 이동
            const firstItemHeight = firstItem.clientHeight;
            const beforeLoadingPos = firstItemHeight * items.length;
            window.scrollTo(0, beforeLoadingPos);
            // window.scrollBy(0, 50);

            // 화면에 초과된 갯수를 뒤에서 삭제
            while (container.children.length > maxVisibleItems) {
                container.removeChild(container.lastChild);
            }
        })
}

// 스크롤 위/아래래
window.addEventListener("scroll", () => {
    // console.log(`스크롤 위치 : ${window.innerHeight}, ${window.scrollY}, ${document.body.offsetHeight}`);
    if (!isLoading && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("화면 끝에 있음!");
        // 숫자 하드 코딩이 아닌 start, end 변수를 사용하여 데이터를 가져옴
        fetchData();
    } else if (!isLoading && window.scrollY === 0) { 
        console.log("화면 맨 위에 있음!");
        fetchPrevData();
    }
});

// const loadData = (start, end) => {
//     isLoading = true; // 로딩 시작
//     fetch(`/api/data?start=${start}&end=${end}`)
//         .then((response) => response.json())
//         .then((items) => {
//             console.log(`시작: ${start}, 끝: ${end}`);
//             items.forEach((item) => {
//                 const itemElement = document.createElement("div");
//                 itemElement.classList.add("item");
//                 itemElement.textContent = item;
//                 container.appendChild(itemElement);
//             });
//             isLoading = false; // 로딩 완료
//         })
//         .catch(() => {
//             isLoading = false; // 로딩 실패 시에도 플래그 초기화
//         });
// };

// // 초기 데이터 로드
// loadData(start, end);

// window.addEventListener("scroll", () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !isLoading) {
//         console.log("화면 끝에 있음!");
//         // 데이터를 가져온 후 end 변수를 업데이트
//         const newStart = end + 1;
//         const newEnd = end + 20;
//         loadData(newStart, newEnd);
//         end = newEnd;
//     }
// });