import { createContext, useContext, useState } from "react";

const MainCharacterEpisodes = createContext();

export function MainCharacterEpisodesProvider({children}){
    const [mainCharacterEpisodes,setMainCharacterEpisodes]=useState([]);
    return (
        <MainCharacterEpisodes.Provider value={{mainCharacterEpisodes,setMainCharacterEpisodes}}>
            {children}
        </MainCharacterEpisodes.Provider>
    );
}

export function useMainCharacterEpisodes(){
    const context = useContext(MainCharacterEpisodes);
    if (context===undefined)
        return new Error ("there is no provider called");
    return context;
}