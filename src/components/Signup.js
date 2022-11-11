import React, {useState, useContext} from 'react'
import { AlertContext } from '../context/AlertContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import avataars from "../images/avataaars.png"
import Alert from './Alert';
import "../styles/signupstyle.css"
import { TextField, Button, InputAdornment, InputLabel, OutlinedInput, FormControl, IconButton, FormHelperText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email: "", password: "", cpassword:""}) 
    const [showPassword, setShowPassword] = useState(false)
    
    let navigate = useNavigate();
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const {alert, showAlert} = useContext(AlertContext)
    const handleSubmit = async (e) => {
        e.preventDefault();
       const {name, email, password, cpassword} = credentials; 
       if(cpassword !== password)
       {
        showAlert("password & confirm password must be same !", "danger");
       }
       else if(!regularExpression.test(password))
       {
        showAlert("password should be alphanumerical and contain atleast one special character!", "danger");
       }
       else
       {
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
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <>
        <Alert alert={alert}/>
       
        <div className="d-flex mt-3">
        <div className="col-md-5" id='hideimg'>
                    <img className="img-fluid" src={avataars} alt="register" style={{ width: "100%", height: "100vh", objectFit: "cover" }} />
                </div>

            <div className="col-md-7 ps-5 pe-5 pt-2" style={{ width: "50%" }}>
            <Button className="mb-4" variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/about" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>About us</Button>
            <h2 style={{ fontWeight: "Bold" }}>Create an account to use iNotebook</h2>
            <p className="mb-4">Use your email to create a new account</p>
            <form autoComplete='off' onSubmit={handleSubmit}>
            <div className="form-group mb-4">
                    <TextField color="secondary" type="text" name='name' className="form-control" id="name" required aria-describedby="emailHelp" onChange={onChange} label="Your Name" variant="outlined" fullWidth  />
                </div>
                <div className="form-group mb-4">
                    <TextField type="email" name='email' className="form-control" id="email" required onChange={onChange} aria-describedby="emailHelp" color="secondary" label="Email"  fullWidth />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mb-2">
                <FormControl variant="outlined" fullWidth>
                            <InputLabel color="secondary" required  htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                className="form-control" onChange={onChange} name="password" minLength={5} required
                                id="outlined-adornment-password"
                                color="secondary"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"  />
                                <FormHelperText  id="outlined-weight-helper-text"></FormHelperText>
                        </FormControl>
                </div>
                <div className="form-group mb-2">
                    <FormControl variant="outlined" fullWidth>
                            <InputLabel color="secondary" required  htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                className="form-control" onChange={onChange} name="cpassword" minLength={5} required
                                id="outlined-adornment-password"
                                color="secondary"
                                type={showPassword ? 'text' : 'password'}
                                label="Confirm Password"  />
                                <FormHelperText  id="outlined-weight-helper-text"></FormHelperText>
                        </FormControl>
                </div>
                <br></br>
                <Button type="submit" fullWidth size="large" className="mb-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}>SignUp</Button>
            </form>
            <p>Have an account? <Link to="/login" >login</Link> </p>

            </div>
        </div>
        </>
    )
}

export default Signup
