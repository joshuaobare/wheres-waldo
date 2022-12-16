import image from "../images/whereswaldo.jpg"
export default function Home(props) {

    const {handler , coords,charChecker,response} = props
    return (
        <div>
            <img onClick={handler} src={image} alt="" />
            <div style={coords} className="target-box">
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