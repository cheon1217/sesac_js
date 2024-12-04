import { useEffect } from "react";

const Message = ({ count, message }) => {

    useEffect(() => {
        // 메세지가 변경될 때, 사이드이펙트??
        document.title = message || "기본타이틀";
    }, [message]);

    useEffect(() => {
        // 여기는 최초 1회 (페이지가 렌더링 될 때) 호출하는 것
        console.log("컴포넌트 로딩");
        return () => {
            console.log("컴포넌트 초기화");
        }
    }, []);

    useEffect(() => {
        // 카운트가 짝수냐 홀수냐에 따라
        document.body.style.backgroundColor = count % 2 === 0 ? "lightblue" : "lightcoral";
        return () => {
            // 배경색 초기화
            document.body.style.backgroundColor = "";
        }
    }, [count]);

    return (
        <div>
            <h3>메세지: {message}</h3>
            {count > 10 && <p>많이 클릭하셨네요</p>}
            {count < 0 && <p>음수입니다, 잘못 클릭하셨나요?</p>}
        </div>
    );
};

export default Message;