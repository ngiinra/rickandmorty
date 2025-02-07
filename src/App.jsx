import './App.css'
import { TrashIcon } from "@heroicons/react/24/outline";
import "./css/character.css"
import Navbar, { Search } from "./components/Navbar"
import { useState } from "react";
import axios from "axios";
import Modal from "./components/Modal";
import ShownCharacter from "./components/ShownCharacter";
import { CharacterList, CharacterInList } from './components/CharacterList';
import useLocalStorage from './customHooks/useLocalStorage';
import useGetApi from './customHooks/useFetch';
import { useMainCharacterEpisodes } from './context/MainCharacterEpisodes';
import { useMainCharacter } from './context/MainCharacter';
import { Pagination } from './context/PaginationContext.jsx'

function App() {

    const [query, setQuery] = useState("");
    const [modal, setModal] = useState(false);
    const [liked, setLike] = useLocalStorage("Favorites", []);
    const { mainCharacter, setMainCharacter } = useMainCharacter();
    const { setMainCharacterEpisodes } = useMainCharacterEpisodes();
    const { isLoading, allData: allCharacters } = useGetApi("https://rickandmortyapi.com/api/character/?name=", query);

    //handellers
    function handleLikedCharacters(character) {
        if (isCharacterLiked(character.id) === false)
            setLike(pre => [...pre, character]);
    }

    function isCharacterLiked(id) {
        if (liked.length !== 0) {
            return [...liked].some((like) => like.id === id);
        }
        return false;
    }

    function handleShownCharacter(character) {
        if (mainCharacter.id === character.id) {
            setMainCharacter([]);
            setMainCharacterEpisodes([]);
        }
        else {
            setMainCharacter(character);
            async function settingMainCharacter(character) {
                const episodes = await character.episode;

                const episodesId = await episodes.map(e => e.split("/").at(-1));
                let { data } = await axios.get(`https://rickandmortyapi.com/api/episode/${episodesId}`);

                //وقتی یدونه اپیزود داره ارایه برنمیگردونه
                // و ابجکت تک برمیگردونه که داخل کاکپوننت نمایش اپیزود مپ داریم که فقط روی ارایه انجام میشه
                if (episodesId.length === 1)
                    data = [data]
                setMainCharacterEpisodes(data.slice(0, 10));
            }
            settingMainCharacter(character);
        }
    }

    function handleDeleteFavourite(id) {
        if (isCharacterLiked(id)) {
            const newLiked = [...liked].filter((char) => char.id !== id);
            setLike(newLiked);
        }
    }

    return (
        
        <div className='container'>
            {modal === true ?
                <Modal title="favourites list" setModal={setModal}>
                    <CharacterList errText={liked.length>0?"":"no liked founded!"}
                                    handleDeleteCharacter={handleDeleteFavourite}
                                    data= {liked}
                    />
                    
                </Modal>
                : ""}
            <Navbar liked={liked} foundedResults={allCharacters.items.length} onModal={setModal}>
                <Search setQuery={setQuery} query={query} />
            </Navbar>
            <div className='character-section'>
                <Pagination allData={allCharacters.items} dataListClassName="character-list">
                    <CharacterList handleShownCharacter={handleShownCharacter}
                        errText={allCharacters.errorMessage} isLoading={isLoading} />
                </Pagination>
                <ShownCharacter onLike={handleLikedCharacters}
                    isCharacterLiked={isCharacterLiked} 
                    key={mainCharacter.id}
                    />
            </div>

        </div>
    );
}

export default App
