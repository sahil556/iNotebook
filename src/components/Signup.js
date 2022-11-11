import React, {useState, useContext} from 'react'
import { AlertContext } from '../context/AlertContext';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email: "", password: "", cpassword:""}) 
    let navigate = useNavigate();

    const {alert, showAlert} = useContext(AlertContext)
    const handleSubmit = async (e) => {
        e.preventDefault();
       const {name, email, password} = credentials; 
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/");
            showAlert("Account Created Successfully", "success");

        }
        else{
            showAlert(json.error, "danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <>
        <Alert alert={alert}/>
       
        <div className='container mt-2'>
            <h2>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' className="form-control" id="name" required aria-describedby="emailHelp" onChange={onChange} placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='email' className="form-control" id="email" required onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' className="form-control"  minLength={5} required id="password" onChange={onChange} placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" name='cpassword' className="form-control" minLength={5} required id="cpassword" onChange={onChange} placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}

export default Signup
