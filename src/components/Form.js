export default function Form(props) {
    return(
        <form onSubmit={props.handleSubmit}>
            <div className="form-item">
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    id="name"
                    name = "name"
                    onChange={props.handleChange}
                    value = {props.name}
                />
            </div>
            <div className="form-item">
                <div>Time</div>
                <div>{props.finalTime}</div>
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
}