import { createContext, useContext , useEffect, useState} from "react";
import PaginationBussiness from "../components/PaginationBussiness";

function usePagination(allData){
    const dataLengthInEachPage = 5;
    const [dataInPage,setDataInPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [countOfPages, setCountOfPages] = useState(1);
    useEffect(()=>{
        const pageStartAt = (currentPage-1)* dataLengthInEachPage;
        const pageEndAt = pageStartAt+(dataLengthInEachPage);
        setDataInPage(allData.slice(pageStartAt,pageEndAt));
        setCountOfPages(Math.ceil(allData.length/dataLengthInEachPage)===0?1:Math.ceil(allData.length/dataLengthInEachPage));
    },[allData, currentPage]);
    return {dataInPage, currentPage, setCurrentPage , countOfPages};
}

const PaginationContext = createContext("");

const PaginationProvider= function ({allData,children}){
    const {dataInPage, currentPage, setCurrentPage , countOfPages} = usePagination(allData);
    return (
        <PaginationContext.Provider value={{dataInPage, currentPage, setCurrentPage , countOfPages}}>
            {children}
        </PaginationContext.Provider>
    )
}

/**
 * Used for accessing to pagination context data.
 * @returns {React<context>} context with 4 values 
 * {dataInPage : array, currentPage : number
 * , setCurrentPage: function , countOfPages : number}
 */
export const usePaginationContext=()=>{
    const context = useContext(PaginationContext);
    if (context===undefined)
        return new Error ("there is no provider called for Pagination context.");
    return context;
}

/**
 * 
 * @param {html} children has open and close tag 
 * @param {array} allData array of objects contains data
 * @param {string} dataListClassName class name of data view
 */
export function Pagination({children, allData, dataListClassName}){

    return (
        <PaginationProvider allData={allData}>
            <PaginationBussiness dataListClassName={dataListClassName}>
                {children}
            </PaginationBussiness>
        </PaginationProvider>
    )
}