import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [loading, setLoading] = useState(false); // 초기값 false
    const [count, setCount] = useState(1); // 초기값 1
    const [data, setData] = useState(null); // 초기값
    const [clearing, setClearing] = useState(false);

    const loadData = async () => {
        setLoading(true);

        // 강제로 1초 대기
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // TODO. 맨 뒤에 1을 랜덤으로 생성하시오 (1~10까지의 랜덤으로)
        const num = Math.floor(Math.random() * 100 + 1);
        // console.log(num);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${num}`);
            const result = await response.json();
            // console.log(result);
            setData(result);
        } catch (error) {
            setData({ error: true });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [count]);
    // 지켜볼 변수, 이 변수가 변경될 때마다, 이함수 안의 내용을 실행하라
    // 이 변수가 변경되었을 때 발생하는 side-effect를 해결하기 위한 함수를 정의하는 곳
    // [] <-- 이거의 의미는 최초 한번만 실행

    const clearData = async () => {
        setClearing(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setData(null);
        setCount(1);
        setClearing(false);
    }

    return (
        <div className="container my-4">
            <button 
                className="btn btn-primary" 
                onClick={() => setCount(count + 1)} 
                disabled={loading || clearing}>
                    {loading ? (
                        <>
                            <span class="spinner-border spinner-border-sm"></span>
                            {" "}Loading... ({count})
                        </>
                    ) : (
                        `Load Data (${count})`
                    )}
            </button>

            <button
                className="btn btn-danger ms-2"
                onClick={clearData} 
                disabled={loading || clearing || data === null || count === 1}>
                    {clearing ? (
                        <>
                            <span class="spinner-grow spinner-grow-sm"></span>
                            {" "}clearing...
                        </>
                    ) : (
                        'clear'
                    )}
            </button>

            {/* 결과를 출력할 공간 */}
            <div className="mt-4">
                {data ? (
                    data.error ? (
                        <div className="alert alert-danger">
                            <p style={{ color: "red" }}>데이터 로딩에 실패</p>
                        </div>
                    ) : (
                        <div className="alert alert-success">
                            <h3>{data.title}</h3>
                            <p>{data.body}</p>
                        </div>
                    ) 
                ): (
                    <div className="alert alert-secondary">
                        <p>No data loaded</p>
                    </div>
                )}
            </div>

            {/* 위랑 똑같은 코드를 if 구문으로 짜면?? */}
            {/* <div style={{ marginTop: "20px" }}>
                {(() => {
                    if (!data) {
                        return <p>No data loaded</p>
                    }
                    if (data.error) {
                        return <p style={{ color: "red" }}>데이터 로딩에 실패</p>
                    }
                    return (
                        <div>
                            <h3>{data.title}</h3>
                            <p>{data.body}</p>
                        </div>
                    );
                })}
            </div> */}
        </div>
    );
}

export default App;