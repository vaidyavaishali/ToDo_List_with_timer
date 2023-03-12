import { useContext} from "react"
import userContext from "../context/contextAPI"
import './todo.css'
const NewToDo = () => {
    const { CreateToDo, setactivity, activities } = useContext(userContext);
    return (
        <>
            <div className="newtodo" style={{ "textAlign": "center", "margin": "50px auto 0", height: "35vh", width: "30vw", border: "2px solid black", background: "grey", "border-radius": "10px", backgroundColor:" rgb(177, 163, 163)" }}>
                <h3>Add New To Do</h3>
                <input type="text" placeholder="Add New Activity" onChange={(e) => { setactivity({ ...activities, activity: e.target.value }) }} style={{ "height": "13%", "width": "80%", margin: "10px auto 0", fontSize:"100%", textAlign:"center" }}/>
                <button onClick={()=>CreateToDo()} style={{marginTop:"5%", "width": "50%", "height": "13%", backgroundColor:"#0c446e", color:"white", border:"none", borderRadius:"20px" }}>
                <i class="fa fa-plus" aria-hidden="true" style={{marginRight:"4%"}}></i>

                    Add New Activity</button>

            </div>
        </>
    )
}
export default NewToDo