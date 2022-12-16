import uniqid from "uniqid"

export default function Leaderboards(props) {
    const leaderboardData = props.leaderboard
    leaderboardData.sort((a,b) => parseFloat(a.time) - parseFloat(b.time))
    
    return (
        <div className="leaderboards">
            <h1>Leaderboards</h1>        
            <table>
                <tbody>
                    <tr className="leaderboard-header">
                        <th>#</th>
                        <th>Username</th>
                        <th>Time</th>
                    </tr>
                    {leaderboardData.map((data,index) => {   
                        let minutes = Math.floor((data.time / 60 ));                    
                        let seconds = data.time - (minutes*60)                    
                        if(minutes<10) {minutes = "0"+minutes}
                        if(seconds<10) {seconds = "0"+seconds}                     
                        const time = `${minutes}:${seconds}`                    

                        return (
                            <tr key={uniqid()} className="leaderboard-item">
                                <td className="leaderboard-item-number">{index+1} </td>
                                <td>{data.name}</td> 
                                <td>{time}</td>
                            </tr>                    
                        )
                    })}
                </tbody>
                
            </table>
        </div>
    )
}