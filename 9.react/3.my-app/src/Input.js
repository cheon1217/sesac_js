const Input = ({ setMessage }) => {

    const onChangeHandler = (e) => {
        const newValue = e.target.value;
        // console.log("뉴 벨류:", newValue);
        setMessage(newValue);
    }

    return (
        <div>
            <label>메세지 입력:</label>
            <input 
                type="text" 
                placeholder="메세지를 입려하세요" 
                // onChange={(e) => setMessage(e.target.value)} 
                onChange={onChangeHandler}
            />
        </div>
    );
}

export default Input;