import { useContext } from "react"
import userContext from '../context/contextAPI'
const SideBar = ()=>{
    const { Logout, history } = useContext(userContext)
    return(
        <>
        <nav style={{height:"105vh", "width":"30vh", "background":"#0c446e" ,"position":"absolute", top:"15.3%", color:"white"}}>
            <h3><i>To Do List history</i></h3>
            {
                history && history.map((items, i)=>{
                    return (
                        <div key={i}>
                            <p><span style={{color:"greenyellow"}}>{items.activity}</span> : <span>{items.time_taken}</span></p>
                        </div>
                    )
                })
            }
        </nav>
        </>
    )
}
export default SideBar