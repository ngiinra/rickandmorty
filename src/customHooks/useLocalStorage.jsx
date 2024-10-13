import { useEffect, useState } from "react";

export default function useLocalStorage(storageName,initialState){
    //برای خواندن دیتا از ذخیره حافظه مرورگر
    const [stateToBeSaved,setStateToBeSaved] = useState(()=> JSON.parse(localStorage.getItem(storageName))||initialState);
    useEffect(()=>{
        localStorage.setItem(storageName, JSON.stringify(stateToBeSaved));
    },[stateToBeSaved])

    return [stateToBeSaved, setStateToBeSaved];
}