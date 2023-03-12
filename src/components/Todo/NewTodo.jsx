import { useContext} from "react"
import userContext from "../context/contextAPI"
import './todo.css'
const NewToDo = () => {
    const { CreateToDo, setactivity, activities } = useContext(userContext);
    return (
        <>
            <div className="newtodo" style={{ "textAlign": "center", "margin": "50px auto 0", height: "100px", width: "300px", border: "2px solid black", background: "grey", "border-radius": "10px" }}>
                <input type="text" placeholder="Add New Activity" onChange={(e) => { setactivity({ ...activities, activity: e.target.value }) }} style={{ "height": "20px", "width": "200px", margin: "10px auto 0" }}/>
                <button onClick={()=>CreateToDo()}>Add New Ativity</button>

            </div>
        </>
    )
}
export default NewToDo