import '../css/navbar.css'
import {HeartIcon} from "@heroicons/react/24/outline"
export default function Navbar({liked,foundedResults,children, onModal}){
    return (
        <nav className="navbar">
            <div className="navbar__logo">LOGO 🫠</div>
            {children}
            <div className="navbar__resultnum">found {foundedResults} result</div>
            <button>
                <HeartIcon className='navbar__heart'/>
                <span className='badge' onClick={()=>onModal(pre=>!pre)}>{liked?.length}</span>
            </button>
        </nav>
    )
}

export function Search({query, setQuery}){
    return (
        <input 
        type="text"
        className="navbar__search"
        placeholder="search ..."
        onChange={e=> setQuery(e.target.value)}
        value={query}
        />
    );
}