import './App.css'
import { EyeIcon, EyeSlashIcon, TrashIcon } from "@heroicons/react/24/outline";
import "./css/character.css"
import Navbar, { Search } from "./components/Navbar"
import { useState } from "react";
import Loading from "./components/Loading";
import { Toaster } from 'react-hot-toast';
import axios from "axios";
import Modal from "./components/Modal";
import ShownCharacter from "./components/ShownCharacter";
import { CharacterList , CharacterInList} from './components/CharacterList';
import useLocalStorage from './customHooks/useLocalStorage';
import useGetApi from './customHooks/useFetch';

function App() {

    const [query, setQuery]= useState("");
    const [modal, setModal]= useState(false);
    const [liked, setLike] =useLocalStorage("Favorites",[]);
    const [mainCharacter,setMainCharacter]=useState([]);
    const [mainCharacterEpisodes,setMainCharacterEpisodes]=useState([]);
    const {isLoading, allCharacters} = useGetApi("https://rickandmortyapi.com/api/character/?name=",query);
    

    //handellers
    function handleLikedCharacters(character){
        if (isCharacterLiked(character.id)===false)
            setLike(pre=>[...pre,character]);
    }

    function isCharacterLiked(id){
        if (liked.length!==0){
            return [...liked].some((like)=> like.id===id);
        }
        return false;
    }
    
    function handleShownCharacter(character){
        if (mainCharacter.id===character.id){
            setMainCharacter([]);
            setMainCharacterEpisodes([]);
        }
        else{
            setMainCharacter(character);
            async function settingMainCharacter(character){
                const episodes = await character.episode;

                const episodesId= await episodes.map(e => e.split("/").at(-1) );
                let {data} = await axios.get(`https://rickandmortyapi.com/api/episode/${episodesId}`);
                
                //وقتی یدونه اپیزود داره ارایه برنمیگردونه
                // و ابجکت تک برمیگردونه که داخل کاکپوننت نمایش اپیزود مپ داریم که فقط روی ارایه انجام میشه
                if (episodesId.length===1)
                    data=[data]
                setMainCharacterEpisodes(data.slice(0,10));
            }
            settingMainCharacter(character);
        }
    }

    function handleDeleteFavourite(id){
        if (isCharacterLiked(id)){
            const newLiked=[...liked].filter((char)=> char.id!==id);
            setLike(newLiked);
        }
    }

    return (
        <div className='charcter-comp'>
            {modal===true?        
            <Modal title="favourites list" setModal={setModal}>
                {liked.map(eachLike=> {
                    return <CharacterInList key={eachLike.id} data={eachLike}>
                                <div onClick={()=>handleDeleteFavourite(eachLike.id)}>
                                    {<TrashIcon className="icon" />}
                                </div>
                        </CharacterInList>})}
            </Modal>
            :""}
            <Toaster/>
            <Navbar liked={liked} foundedResults={allCharacters.length} onModal={setModal}>
                <Search setQuery={setQuery} query={query}/>
            </Navbar>
            <CharacterList >
                <div className="character-list">
                    {   isLoading?<Loading/>:
                        allCharacters.map(eachCharacter=> {
                            return <CharacterInList key={eachCharacter.id} data={eachCharacter}>
                                        <div onClick={()=>handleShownCharacter(eachCharacter)}>
                                            {mainCharacter.id===eachCharacter.id?<EyeSlashIcon className="icon" />
                                            :<EyeIcon className="icon"/>}
                                        </div>
                                    </CharacterInList>})}
                </div>
            </CharacterList>
            <ShownCharacter characterData={mainCharacter} episodeData={mainCharacterEpisodes} onLike={handleLikedCharacters} isCharacterLiked={isCharacterLiked}/>
        </div>
    );
}

export default App
