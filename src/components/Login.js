import React, {useState, useContext} from 'react'
import Alert from './Alert'
import { AlertContext } from '../context/AlertContext'
import { Link, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TextField, Button, InputAdornment, InputLabel, OutlinedInput, FormControl, IconButton, FormHelperText } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    const [showPassword, setShowPassword] = useState(false)
    
    let navigate = useNavigate();
    const { showAlert } = useContext(AlertContext)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            showAlert("Logged in Successfully", "success");
            navigate("/");

        }
        else{
            showAlert("Invalid Credential", "danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
        <Alert alert={alert} />
        <div className='container mt-3 addnotes'>
        <Button className="mb-4" variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/about" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>About us</Button>

            <h2 style={{ fontWeight: "Bold" }}>Login to continue to iNotebook </h2>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <TextField color="secondary" label="Email" variant="outlined" required fullWidth type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="mb-3">
                <FormControl variant="outlined" fullWidth>
                            <InputLabel color="secondary" required  htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                className="form-control" value={credentials.password} onChange={onChange} name="password" 
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
                <Button type="submit" fullWidth size="large" className="mb-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}>Login</Button>
                 
            </form>
            <p>Don't have an account? <Link to="/signup" >Register here</Link> </p>

        </div>
        </>
    )
}

export default Login
