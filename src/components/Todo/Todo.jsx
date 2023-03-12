import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import userContext from "../context/contextAPI"
import SideBar from "./Sidbar"

const ToDo = () => {
    const { username, data, Pause_timer, End_timer, Timer, update_Time, Logout } = useContext(userContext)
    const [start, setStart] = useState(true);
    const [end, setEnd] = useState(false);
    const [resume, setResume] = useState(true);
    const [log, set_log] = useState(true)
    const navigate = useNavigate();
    const check = () => {
        if (data.length === 0 || data[data.length - 1].Status === "completed") {
            navigate('/newtodo')
        } else {
            alert("complete current task first")
            navigate('/todo')
        }
    }
    const Set_Logiout = () => {
        set_log(!log)
    }
    return (
        <>
            <div className="main-div">
                <nav className="navbar">
                    <h1>To Do List
                    </h1>
                    <p style={{ float: "right", "marginRight": "10%", marginLeft: "75%", marginTop: "-2%" }} onClick={Set_Logiout}>
                        <i class="fa fa-user" aria-hidden="true" style={{marginRight:"10px"}}></i>
                        {username}
                        {!log ?
                            <h4 onClick={() => Logout()} className="logout">LogOut</h4> : ""}

                    </p>



                </nav>
                <button style={{ margin: "30px 0px", "width": "20%", "height": "4%", backgroundColor:"#0c446e", color:"white", border:"none", borderRadius:"20px" }} onClick={check}
                
                >
                    <i class="fa fa-plus" aria-hidden="true" style={{marginRight:"4%"}}>
                    </i>

                    Add New Activity</button>
                <table >
                    <tr >
                        <th>Activity</th>
                        <th>Status</th>
                        <th>Time Taken</th>
                        <th>Action</th>
                    </tr>
                    {data.map((items, i) => {
                        return (
                            <tr key={i}>
                                <td >{items.activity}</td>
                                <td>{items.Status}</td>
                                <td>{items.Status === "completed" ? <p>{items.time_taken}</p> : ""}</td>
                                {!end && items.Status !== "completed" ? <td>
                                    {start ? <button onClick={() => { Timer(); update_Time(items._id, "ongoing"); setStart(false) }}>{resume ? "start" : "resume"}</button> :
                                        <span><button onClick={() => { End_timer(items._id, "completed"); setEnd(true) }}>End</button><button onClick={() => { setResume(false); setStart(true); Pause_timer(items._id) }}>Pause</button></span>}</td> : <td></td>}

                            </tr>
                        )
                    })}

                </table>
                <SideBar />

            </div>
        </>
    )
}
export default ToDo