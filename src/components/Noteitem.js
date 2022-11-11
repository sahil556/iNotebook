import React, {useContext} from 'react'
import { AlertContext } from '../context/AlertContext';
import noteContext from "../context/notes/noteContext"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const {showAlert} = useContext(AlertContext)
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">  
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <IconButton onClick={() => { deleteNote(note._id); showAlert("Deleted successfully", "success") }} className="mb-2 ms-auto" color="secondary">
                            <DeleteOutlineOutlinedIcon color="secondary" />
                        </IconButton>
                        <IconButton className="mb-2" color="secondary" onClick={()=>{updateNote(note); }}>
                            <EditIcon color="secondary" />
                        </IconButton>
                        {/* <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); showAlert("Deleted successfully", "success")}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateNote(note); }}></i> */}
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted">#{note.tag}</h6>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem
