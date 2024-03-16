import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Pagination({ paginationOption }) {
    const { currentPage, totalPage } = paginationOption;
    const navigate = useNavigate();

    const pageNumbers = () => {
        let numbers = [];
        for (let x = 1; x <= totalPage; x++) {
            numbers.push(
                <li key={x} className={`page-item ${currentPage === x ? 'active' : ''}`}>
                    <Button name={x} buttonClass={"page-link"} onClick={() => navigate(`?page=${x}`)} />
                </li>
            );
        }
        return numbers;
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <Button name={"«"} buttonClass={"page-link"} onClick={() => navigate(`?page=${currentPage > 1 ? currentPage - 1 : 1}`)} />
                </li>
                {pageNumbers()}
                <li className="page-item">
                    <Button name={"»"} buttonClass={"page-link"} onClick={() => navigate(`?page=${currentPage < totalPage ? currentPage + 1 : totalPage}`)} />
                </li>
            </ul>
        </nav>
    );
}
