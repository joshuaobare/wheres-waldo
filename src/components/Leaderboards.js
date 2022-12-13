import uniqid from "uniqid"

export default function Leaderboards(props) {
    const leaderboardData = props.leaderboard
    leaderboardData.sort((a,b) => parseFloat(a.time) - parseFloat(b.time))
    
    return (
        <div>
            <h1>Leaderboards</h1>        
            <div>
                
                {leaderboardData.map(data => {   
                    let minutes = Math.floor((data.time / 60 ));                    
                    let seconds = data.time - (minutes*60)                    
                    if(minutes<10) {minutes = "0"+minutes}
                    if(seconds<10) {seconds = "0"+seconds}                     
                    const time = `${minutes}:${seconds}`                    

                    return (
                    <div key={uniqid()}>{data.name} : {time}</div>
                    )
                })}
            </div>
        </div>
    )
}