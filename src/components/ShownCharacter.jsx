import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useMainCharacterEpisodes } from "../context/MainCharacterEpisodes";
import { useMainCharacter } from "../context/MainCharacter";

export default function ShownCharacter({onLike,isCharacterLiked}){
    const {mainCharacterEpisodes} = useMainCharacterEpisodes();
    const {mainCharacter : characterData} = useMainCharacter(); 
    if (characterData.length===0 && mainCharacterEpisodes.length===0)
        return <div className="no-character">Please select a character</div>
    return(
        <div>
            <div className="shown-charcter">
                <img src={characterData?.image} className="charcter-pic" alt="character picture"/>
                <h2>
                    <span>{characterData.gender==="Male"?"👨🏻‍🦰":"👩🏻‍🦰"}</span>
                    <span> {characterData.name}</span>
                </h2>
                <div className="status-text">
                    <span className={`status ${characterData.status==="Dead"?"red":""}`}> </span>
                    <span>  {characterData.status}</span>
                    <span> - {characterData.species}</span>
                </div>
                <div> 
                    <p><span className="location-text">Last known location: </span>{characterData?.location?.name}</p>
                </div>
                {isCharacterLiked(characterData.id)?"Already in favorites ✅":
                <button className="add-to-fav-btn" onClick={()=>onLike(characterData)}>
                    Add to favorite
                </button>
                }
            </div>
            <ListOfEpisodes/>
        </div>
    );
}

function ListOfEpisodes(){
    const {mainCharacterEpisodes:episodesData} =useMainCharacterEpisodes();
    const [direction, setDirection]= useState(true); // true means asc
    let sortedEpisodes=[];

    if (direction){
        sortedEpisodes = [...episodesData].sort((a,b)=>{
        return new Date(a.air_date) - new Date(b.air_date) ;   
        })
    }else{
        sortedEpisodes = [...episodesData].sort((a,b)=>{
            return new Date(b.air_date) - new Date(a.air_date);   
        })
    }

    if(episodesData.length===0) return <div>not found.</div>
    return(
        <div className="shown-charcter-episodes">
            <div className="episode-row-1">
                <h2 className="episode-h2">List of episodes</h2>
                <span className="episode-col-2"
                onClick={()=>setDirection(pre=> !pre)}>
                    <ArrowUpCircleIcon className={"icon"}
                     style={{rotate: direction? "0deg" : "180deg" ,transition:"all 0.2s ease-in-out"}}/>
                </span>
            </div>
            <div>
                {sortedEpisodes.map((eps,index)=>{
                    return(
                        <div className="episode-data" key={eps.id}>
                            <span>{String(index+1).padStart(2,0)} - </span>
                            <span>{eps.episode} : </span>
                            <span>{eps.name}</span>
                            <span className="episode-col-2">{eps.air_date}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}