import { useEffect, useState } from "react"

export default function Nav(props) {

    

    return (
        <nav>
            <h1>Where's Waldo?</h1>
            <div className="nav-list">
                <ul>
                    <li>Home</li>
                    <li>Leaderboards</li>
                    <li>{!props.gameEnd ? props.timer : props.finalTime}</li>                    
                </ul>
            </div>
        </nav>
    )
}