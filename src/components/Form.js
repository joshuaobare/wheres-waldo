import { Dialog , DialogContent , DialogTitle } from "@mui/material"


export default function Form(props) {
    return(
        <Dialog open = {props.dialogOpen ? "open" : false}>
            <DialogTitle>Enter Your Name</DialogTitle>
            <DialogContent>                
                <form onSubmit={props.handleSubmit}>
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