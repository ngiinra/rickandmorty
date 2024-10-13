export function CharacterList({children}){
    return <div>{children}</div>;
}

export function CharacterInList({data,children}){
    return(
        <div className="character">
            <img src={data?.image} className="charcter-pic" alt="character picture"/>
            <div>
                <span>{data.gender==="Male"?"👨🏻‍🦰":"👩🏻‍🦰"}</span>
                <span> {data?.name}</span>
            </div>
            <div>
                <span className={`status ${data.status==="Alive"?"":"red"}`}></span>
                <span> {data.status}</span>
                <span> - {data.species}</span>
            </div>
            {children}
        </div>
    );
}

