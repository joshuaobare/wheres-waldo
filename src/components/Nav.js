import { useEffect, useState } from "react"
import Waldo from "../images/characters/waldo.gif"
import Wilma from  "../images/characters/wilma.gif"
import Whitebeard from  "../images/characters/whitebeard.gif"
import Odlaw from  "../images/characters/odlaw.gif"


export default function Nav(props) {

    const style = { opacity: 0.7}
    const style2 = { color: "white" } 

    const {waldoFound , wilmaFound , odlawFound , whitebeardFound} = props

    return (
        <nav>
            <h1>Where's Waldo?</h1>
            <div className="character-icon-section">
                <div>
                    <img src={Waldo} alt="waldo icon" className="character-icon" style={waldoFound? style : null}/>
                    <div>Waldo</div>
                </div>
                <div>
                    <img src={Wilma} alt="wilma icon" className="character-icon wilma" style={wilmaFound? style : null}/>
                    <div>Wilma</div>
                </div>
                <div>
                    <img src={Whitebeard} alt="whitebeard icon" className="character-icon" style={whitebeardFound? style : null}/>
                    <div>Wizard</div>
                </div>
                <div>
                    <img src={Odlaw} alt="Odlaw icon" className="character-icon" style={odlawFound? style : null}/>
                    <div>Odlaw</div>
                </div>
            </div>           

            <div className="nav-list">
                <ul>
                    <li>Home</li>
                    <li>Leaderboards</li>
                    <li className="timer">{!props.gameEnd ? props.timer : props.finalTime}</li>                    
                </ul>
            </div>
        </nav>
    )
}