import { createContext, useContext, useState } from "react";

const MainCharacter = createContext();

export function MainCharacterProvider({children}){
    const [mainCharacter,setMainCharacter]=useState([]);
    return (
        <MainCharacter.Provider value={{mainCharacter,setMainCharacter}}>
            {children}
        </MainCharacter.Provider>
    );
}

export function useMainCharacter(){
    if (MainCharacter===undefined)
        return new Error ("there is no provider called");
    return useContext(MainCharacter);
}