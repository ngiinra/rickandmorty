import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useGetApi(url,query){
    const [isLoading,setIsLoading]= useState(false);
    const [allCharacters,setAllCharacters]=useState([]);

    useEffect(()=>{
        //برای clean up function
        const abortController = new AbortController();
        const signal = abortController.signal;
    
        async function fetchCharacters(){
            try{
                setIsLoading(true);
                const {data}= await axios.get(`${url+query}`,{signal});
                setAllCharacters(data.results.slice(0,5));

            }catch(err){
                console.log(err);
                if (!axios.isCancel(err)){
                    toast.error(await err.message);
                    setAllCharacters([]);
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

    return {isLoading, allCharacters};
}