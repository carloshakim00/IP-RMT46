import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Pagination({ paginationOption }) {
    const { currentPage, totalPage } = paginationOption;
    const navigate = useNavigate();

    const pageNumbers = () => {
        let numbers = [];
        for (let x = 1; x <= totalPage; x++) {
            numbers.push(
                <Button key={x} name={x} buttonClass={"tw-join-item tw-btn"} onClick={() => navigate(`?page[size]=10&page[number]=${x}`)} />
            );
        }
        return numbers;
    };

    return (
        <div className="tw-join tw-flex tw-justify-center">
            <Button name={"«"} buttonClass={"tw-join-item tw-btn"} onClick={() => navigate(`?page[size]=10&page[number]=${currentPage > 1 ? currentPage - 1 : 1}`)} />
            {pageNumbers()}
            <Button name={"»"} buttonClass={"tw-join-item tw-btn"} onClick={() => navigate(`?page[size]=10&page[number]=${currentPage < totalPage ? currentPage + 1 : totalPage}`)} />
        </div>
    );
}
