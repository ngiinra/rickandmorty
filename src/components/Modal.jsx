import '../css/modal.css'
export default function Modal({title, children, setModal}){
    return(
        <div className='modal'>
            <div className='modal-content'>
                <span className='close-btn' onClick={()=>setModal(false)}>&times;</span>
                <center><h2>{title}</h2></center>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}