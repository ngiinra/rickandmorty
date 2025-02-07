import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetApi(url,query){
    const [isLoading,setIsLoading]= useState(false);
    const [allData,setAllData]=useState({items:[], errorMessage:""});

    useEffect(()=>{
        //برای clean up function
        const abortController = new AbortController();
        const signal = abortController.signal;
    
        async function fetchCharacters(){
            try{
                setIsLoading(true);
                const {data}= await axios.get(`${url+query}`,{signal});
                setAllData({items:data.results, errorMessage:""});

            }catch(err){
                if (!axios.isCancel(err)){
                    setAllData({items:[], errorMessage:await err.message});
                }
            }finally{
                setIsLoading(false);
            }
        }
    
        fetchCharacters();
        return ()=>{
            abortController.abort();
        }
    },[query]);

    return {isLoading, allData};
}