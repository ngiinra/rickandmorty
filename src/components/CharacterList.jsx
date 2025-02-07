import { EyeIcon, EyeSlashIcon, TrashIcon } from "@heroicons/react/24/outline";
import Loading from "./Loading";
import { useMainCharacter } from "../context/MainCharacter";
import { usePaginationContext } from "../context/PaginationContext";

export function CharacterList({data, errText, handleShownCharacter, isLoading, handleDeleteCharacter}) {
    const {dataInPage} = usePaginationContext();
    function showContent(){
        const content = [];
        if (data){ // without pagination
            {data.map(eachCharacter => {
                content.push( <CharacterInList key={eachCharacter.id}
                                            data={eachCharacter} 
                                            handleDeleteCharacter={handleDeleteCharacter}/>)
            })}
        }else{ // with pagination
            {dataInPage.map(eachCharacter => {
                content.push( <CharacterInList key={eachCharacter.id}
                                            data={eachCharacter}
                                            handleShownCharacter={handleShownCharacter} />)
            })}

        }
        return content;
    }

    if (isLoading) return <Loading/> 
    return (
        <div>
            <div>{errText?errText:""}</div>
            {showContent()}
        </div>
    );
}

export function CharacterInList({ data , handleShownCharacter, handleDeleteCharacter}) {
    const {mainCharacter} = useMainCharacter();
    function operationButton(){
        let operation="";
        if (handleShownCharacter && !handleDeleteCharacter){
            operation=
                <div onClick={() => handleShownCharacter(data)} >
                    {mainCharacter.id === data.id ? <EyeSlashIcon className="icon" />
                        : <EyeIcon className="icon" />}
                </div>;
            
        }else if (!handleShownCharacter && handleDeleteCharacter){
            operation=
                <div onClick={()=>handleDeleteCharacter(data.id)}>
                    {<TrashIcon className="icon" />}
                </div>;
        }else{
            throw new Error(" characterInList component has too many arguments.")
        }
        return operation;
    }
    return (
        <div className="character">
            <img src={data?.image} className="charcter-pic" alt="character picture" />
            <div>
                <span>{data.gender === "Male" ? "👨🏻‍🦰" : "👩🏻‍🦰"}</span>
                <span> {data?.name}</span>
            </div>
            <div>
                <span className={`status ${data.status === "Alive" ? "" : "red"}`}></span>
                <span> {data.status}</span>
                <span> - {data.species}</span>
            </div>
            {operationButton()}
        </div>
    );
}

