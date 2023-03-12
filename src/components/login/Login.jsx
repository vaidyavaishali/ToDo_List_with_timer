import { useContext } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../context/contextAPI'
import './Login.css'
const Login = () => {
    const { input, setInput, signinUser, setUserName } = useContext(userContext)
    return (
        <>
            <div style={{ "width": "300px", "height": "auto", "boxShadow": "5px 5px 5px #cccc", "margin": "100px auto", borderRadius: "20px", padding: "30px", textAlign: "center", "position": "relative" }}>
                <h3>Login</h3>
                <div className="email div">
                    <input type="text" placeholder="Enter email Adderss" onChange={(e) => {setInput({...input, email: e.target.value}); setUserName(e.target.value)}} />
                </div>
                <div className="password div">
                    <input type="password" placeholder="Enter password" onChange={(e) => { setInput({ ...input, password: e.target.value }) }} ></input>
                </div>
                <button className='reg-btn' onClick={()=>signinUser()}>Login</button>
                <Link to="/signup">
                    <p style={{ color: "red" }}>Register</p>
                </Link>

            </div>

        </>
    )
}
export default Login