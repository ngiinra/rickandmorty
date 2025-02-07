import { useEffect, useReducer, useRef } from 'react';
import '../css/pagination.css'
import { usePaginationContext } from '../context/PaginationContext';

const dots = "...";
const prevDot = "prevDot";
const nextDot = "nextDot";
const nextButton = "next";
const prevButton = "prev";

export default function PaginationBussiness({ children, dataListClassName }) {
    const { currentPage, setCurrentPage, countOfPages: pagesLength } = usePaginationContext();
    const buttonsKeys = useRef([]);
    const clickedButton = useRef(1);
    useEffect(() => {
        if (pagesLength !== 0) {
            const arr = [];
            for (let i = 0; i < pagesLength; i++) {
                arr[i] = { key: i + 1, value: i + 1 };
            }
            arr[pagesLength] = { key: prevDot, value: dots };
            arr[pagesLength + 1] = { key: nextDot, value: dots };

            buttonsKeys.current = arr;
            dispatchButtonsList({ type: "initial", buttonsKeys });
        }
    }, [pagesLength]);

    useEffect(() => {
        setCurrentPage(clickedButton.current);
    }, [clickedButton.current])

    const [buttonsList, dispatchButtonsList] = useReducer(buttonsListReducer, []);



    function buttonsListReducer(state, { type, buttonsKeys }) {
        switch (type) {
            case "initial":
                clickedButton.current = 1;
                break;
            case prevButton:
                clickedButton.current = currentPage - 1;
                break;
            case nextButton:
                clickedButton.current = currentPage + 1;
                break;
            case prevDot:
                if (state - 5 >= 1) {
                    clickedButton.current = currentPage - 5;
                } else {
                    clickedButton.current = 1;
                }
                break;
            case nextDot:
                if (state + 5 <= pagesLength) {
                    clickedButton.current = currentPage + 5;
                } else {
                    clickedButton.current = pagesLength;
                }
                break;
            default:
                clickedButton.current = type;
                break;
        }
        if (pagesLength > 7) {
            let arr;
            if (clickedButton.current > 4 && clickedButton.current < pagesLength - 3) {
                arr = [1,
                    prevDot,
                    clickedButton.current - 2,
                    clickedButton.current - 1,
                    clickedButton.current,
                    clickedButton.current + 1,
                    clickedButton.current + 2,
                    nextDot,
                    pagesLength];
            } else if (clickedButton.current <= 4) {
                arr = [1, 2, 3, 4, 5, nextDot, pagesLength];
            } else if (clickedButton.current >= pagesLength - 3) {
                arr = [1, prevDot,
                    pagesLength - 4,
                    pagesLength - 3,
                    pagesLength - 2,
                    pagesLength - 1,
                    pagesLength];
            }

            for (let i = 0; i < arr.length; i++) {
                arr[i] = buttonsKeys.current.find(x => x.key === arr[i]);
            }
            return arr;
        }
        if (pagesLength <= 7) {
            return buttonsKeys.current.slice(0, pagesLength);
        }
    }

    function showButtonList() {
        let buttons = [];
        buttonsList.map((i) => {
            buttons.push(
                <button
                    onClick={() => dispatchButtonsList({ type: i.key, buttonsKeys })}
                    key={i.key}
                    className={currentPage === i.key ? "activePageBtn" : "pageBtn"}
                > {i.value} </button>
            )
        });
        return buttons;
    }
    return (

        <div className={dataListClassName}>
            {children}
            <div className="pagination">
                <button
                    onClick={() => dispatchButtonsList({ type: prevButton, buttonsKeys })}
                    key={prevButton}
                    disabled={currentPage === 1}> ◀️</button>

                {showButtonList()}

                <button
                    key={nextButton}
                    onClick={() => dispatchButtonsList({ type: nextButton, buttonsKeys })}
                    disabled={currentPage === pagesLength}>▶️</button>
            </div>
        </div>
    );
}

