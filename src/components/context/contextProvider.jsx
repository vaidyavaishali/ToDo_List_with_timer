import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom/dist"
import userContext from "./contextAPI"
const ContextProvider = (props) => {
    const [input, setInput] = useState({ email: "", password: "" })
    const [signup, setSignup] = useState({ email: "", password: "", confirm_Password: "" })
    const [data, setdata] = useState([])
    const [history, sethistory] = useState([])
    const [activities, setactivity] = useState({ activity: "" })
    const [username, setUserName] = useState("")
    const [sec, setSec] = useState(0)
    const [min, setmin] = useState(0)
    const [hr, sethr] = useState(0)
    const [ft, setft] = useState(0)
    const id = useRef()
    useEffect(() => {
        return () => clearInterval(id.current)
    }, [ft])

    const navigate = useNavigate()
    useEffect(()=>{
      let filterdata = data.filter((items)=>{
        return items.Status === "completed"
      })
      sethistory(filterdata)
    },[data, sethistory])
  console.log(history);
    const signinUser = async () => {
        await axios.post("https://to-do-list-backend-jpzc.onrender.com/login", input).then((res) => {
            window.sessionStorage.setItem("token", res.data.token)
            FetchData();
        }).catch(e => {
            console.log(e)
        })
    }

    const FetchData = () => {
        const token = window.sessionStorage.getItem("token")
        const config = {
            headers: {
                authorization: token
            }
        }
        axios.get("https://to-do-list-backend-jpzc.onrender.com/todopost", config).then((res) => {
            setdata(res.data.todo)
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            navigate("/todo")
        })
    }

    const Logout = ()=>{
        window.sessionStorage.removeItem("token")
        navigate('/')
    }

    const CreateToDo = async () => {
        const token = window.sessionStorage.getItem("token")
        const config = {
            headers: {
                authorization: token
            }
        }   
        await axios.post("https://to-do-list-backend-jpzc.onrender.com/todopost", activities, config).then((res) => {
            if (res.status === 200) {
                FetchData()
            }
        }).catch(e => {
            console.log(e)
        })
    }
    const Timer = () => {
        id.current = setInterval(() => {
            setSec((prev) => (prev + 1))
            if (sec === 60) {
                setmin((prev) => (prev + 1))
                setSec(0)
                if (min === 60) {
                    sethr((prev) => (prev + 1))
                    // setFinal_time(`${hr}:${min}:${sec}`)
                    setmin(0)
                }
            }
        }, 1000)
    }
    const update_Time = async (id1, st) => {
        const token = window.sessionStorage.getItem("token")
        const config = {
            headers: {
                authorization: token
            }
        }
      await axios.put(`https://to-do-list-backend-jpzc.onrender.com/todopost/${id1}`, {time_taken:`${hr} : ${min}: ${sec}`, Status:st},config).then((res)=>{
        if(res.status === 200){
          FetchData()      
        }
      }).catch((e)=>{
        console.log(e)
      })
    }


    const SignUpSubmit = async () => {
        if (validateUser(signup)) {
            await axios.post("https://to-do-list-backend-jpzc.onrender.com/register", signup).then((res) => {
                if (res.status === 200) {
                    alert("registerd successFully")
                    navigate("/")
                }
            }).catch((e) => {
                console.log(e)
            })
        }
    }
    let validateUser = (value) => {
        if (!value.email) {
            alert("email is require")
            return 0
        } else if (!value.password) {
            alert("password is require")
            return 0
        } else if (value.password.length < 6) {
            alert("length should be greater than 6")
            return 0
        } else if (value.password !== value.confirm_Password) {
            alert("password doesnt match")
            return 0
        }
        return 1
    }

    const Pause_timer = () => {
        clearInterval(id.current)
    }

    const End_timer = (id1, st) => {
        clearInterval(id.current)
        update_Time(id1,st)
        setft((p) => p + 1)
        setSec(0)
        setmin(0)
        sethr(0)
    }
    return (
        <>
            <userContext.Provider value={{ Logout,input, setInput, signinUser, setUserName, username, data, CreateToDo, setactivity, setSignup, SignUpSubmit, signup, activities, Pause_timer, End_timer, Timer, update_Time, history}}>
                {props.children}
            </userContext.Provider>
        </>
    )
}
export default ContextProvider