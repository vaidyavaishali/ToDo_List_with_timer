import { useContext } from 'react'
import { Link} from 'react-router-dom'
import './signup.css'
import userContext from '../context/contextAPI'
const Signup = () => {
    const {signup,setSignup ,SignUpSubmit} = useContext(userContext)

    return (
        <>
            <div style={{ "width": "300px", "height": "auto", "boxShadow": "5px 5px 5px #cccc", "margin": "100px auto", borderRadius: "20px", padding: "30px", textAlign: "center", "position": "relative" }}>
                <h3>Register</h3>
                <div className="email div">
                    <input type="text" placeholder="Enter email Adderss" onChange={(e) => { setSignup({ ...signup, email: e.target.value }) }} />
                </div>
                <div className="password div">
                    <input type="password" placeholder="Enter password" onChange={(e) => { setSignup({ ...signup, password: e.target.value }) }}></input>
                </div>
                <div className="con_pass div">
                    <input type="password" placeholder="confirm password" onChange={(e) => { setSignup({ ...signup, confirm_Password: e.target.value }) }}></input>
                </div>
                <button className='reg-btn' onClick={()=>SignUpSubmit()}>Register</button>
                <Link to="/">
                    <p style={{ color: "red" }}>Member Login</p>
                </Link>

            </div>
        </>
    )
}
export default Signup