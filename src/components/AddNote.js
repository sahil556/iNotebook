import React, {useContext,useState,useEffect} from 'react'
import noteContext from "../context/notes/noteContext"
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AlertContext } from '../context/AlertContext';

const AddNote = (props) => {
    let navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('token')) 
        {
            navigate('/login');
        }
        
        // eslint-disable-next-line
    }, [])
   
    const context = useContext(noteContext);
    const {addNote} = context;
    const {showAlert} = useContext(AlertContext)
    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        navigate('/');
        showAlert("Added successfully", "success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
            <div className="container mt-4 addnotes" >
                <Button className="mb-4" variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Home</Button>
                <h2 style={{ fontWeight: "Bold" }}>Create new Note</h2>
                <p className="mb-4">Add  a new note with your info / notes</p>


            <form autoComplete='off' className="my-3">
                <div className="title mb-4">
                    <TextField
                    color="secondary" 
                    label="Title" variant="outlined" fullWidth className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
                    {/* <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />  */}
                </div>
                <div className="description mb-3">
                    <TextField
                    color="secondary" 
                    label="Description" variant="outlined" fullWidth className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                    {/* <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required /> */}
                </div>
                <div className="mb-3">
                    <TextField
                    color="secondary" 
                    label="Tag" variant="outlined" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} fullWidth />
                    {/* <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required /> */}
                </div>
               
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary mb-4" 
                fullWidth size="large"  variant="contained" color="secondary"style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }} onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
