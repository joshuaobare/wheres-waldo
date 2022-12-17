import { Dialog , DialogContent , DialogTitle } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function Form(props) {
    const navigate = useNavigate()
    return(
        <Dialog open = {props.dialogOpen ? "open" : false}>
            <DialogTitle>Enter Your Name</DialogTitle>
            <DialogContent>                
                <form onSubmit={e => {
                    props.handleSubmit(e)
                    navigate("/leaderboards")}}
                >
                    <div className="form-main">
                        <div className="form-item">
                            <label htmlFor="name">Name:</label>
                            <input 
                                type="text" 
                                id="name"
                                name = "name"
                                onChange={props.handleChange}
                                value = {props.name}
                            />
                        </div>
                        <div className="form-item">
                            <label htmlFor="time">Time:</label>
                            <div id="time">{props.finalTime}</div>
                        </div>
                    </div>            
                    <div>
                        <button>SUBMIT</button>
                    </div>
                </form>
            </DialogContent>
            
        </Dialog>
        
    )
}