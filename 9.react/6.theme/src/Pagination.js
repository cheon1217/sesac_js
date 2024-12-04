const Pagination = () => {


    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
            <li className="page-item">
                <span aria-hidden="true">&laquo;</span>
            </li>
            <li className="page-item">1</li>
            <li className="page-item">2</li>
            <li className="page-item">3</li>
            <li className="page-item"><span aria-hidden="true">&raquo;</span></li>
            </ul>
        </nav>
    );
};

export default Pagination;