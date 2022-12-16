import image from "../images/whereswaldo.jpg"
export default function Home(props) {

    const {handler , coords,charChecker,response, gameStart} = props
    
    const display = gameStart ? "flex" : "none"
    const style = {...coords , display : display}

    return (
        <div className="home">
            <img onClick={handler} src={image} alt="characters" className="main-img"/>
            <div style={style} className="target-box">
                <div className="square"></div>
                <div className="character-list">
                    <div data-name="waldo" className="char-name" onClick={charChecker}>Waldo</div>
                    <div data-name="odlaw" className="char-name" onClick={charChecker}>Odlaw</div>
                    <div data-name="wilma" className="char-name" onClick={charChecker}>Wilma</div>
                    <div data-name="whitebeard" className="char-name" onClick={charChecker}>Whitebeard</div>                
                </div>
            </div>
            <div id="response">{response}</div>
        </div>

    )
}