import Home from "./components/Home";
import Nav from "./components/Nav";
import Form from "./components/Form"
import Leaderboards from "./components/Leaderboards";
import app from "./index"
import { HashRouter , Routes , Route } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDoc,
  getDocs
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { useEffect, useState } from "react";

function App() {

  const [coords , setCoords] = useState({})
  const [waldoCoords, setWaldoCoords] = useState()
  const [odlawCoords, setOdlawCoords] = useState()
  const [wilmaCoords, setWilmaCoords] = useState()
  const [whitebeardCoords, setWhitebeardCoords] = useState()
  const [waldoFound, setWaldoFound] = useState(false)
  const [odlawFound, setOdlawFound] = useState(false)
  const [wilmaFound, setWilmaFound] = useState(false)
  const [whitebeardFound, setWhitebeardFound] = useState(false)
  const [startTime , setStartTime] = useState("")
  const [timer, setTimer] = useState("")
  const [response, setResponse] = useState("")
  const [gameStart, setGameStart] = useState(false)
  const [gameEnd, setGameEnd] = useState(false)
  const [finalTime , setFinalTime] = useState("")
  const [name , setName] = useState("")
  const [leaderboard , setLeaderboard] = useState([])
  const [dialogOpen , setDialogOpen] = useState(false)
  const [leaderboardActive , setLeaderboardActive] = useState(false)

    
  async function leaderboardFetcher() {
    try{
      setLeaderboard([])
      const ref = await getDocs(collection(getFirestore(app), "leaderboards"))
      //console.log(ref)
      ref.forEach((doc) => {
        const {name,time} = doc._document.data.value.mapValue.fields
        setLeaderboard(prevState => {
          return [...prevState , {name : name.stringValue , time: parseInt(time.integerValue)}]
        })
        
      })
    }
    catch(error){
      console.error("Error fetching leaderboards")
    }
  }
  
  const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1)

  useEffect(() => {
    setStartTime(Date.now())
    async function coordsFetcher() {
      try{
        const ref = await getDocs(collection(getFirestore(app), "coordinates"))
        //console.log(ref)
        ref.forEach((doc) => {
          const {Odlaw , Waldo , Wilma, Whitebeard} = doc._document.data.value.mapValue.fields
          //console.log(doc)
          setOdlawCoords(JSON.parse(Odlaw.stringValue))
          setWaldoCoords(JSON.parse(Waldo.stringValue))
          setWilmaCoords(JSON.parse(Wilma.stringValue))
          setWhitebeardCoords(JSON.parse(Whitebeard.stringValue))
        })
      } catch(error) {
        console.error("Error fetching coordinates")
      }      
    
    }    
    coordsFetcher()
    leaderboardFetcher()
    
  }, [])
  

  useEffect(() => {
    const gameEndTest = () => {
      if (odlawFound && waldoFound && wilmaFound && whitebeardFound) {
        //setCoords({display:"none"})
        setGameStart(false)
        setGameEnd(true)
        setDialogOpen(true)
    
        setFinalTime(() => {
          const time = Date.now() - startTime
          let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((time % (1000 * 60)) / 1000);
    
          if(minutes<10) {minutes = "0"+minutes}
          if(seconds<10) {seconds = "0"+seconds}
    
          return `${minutes}:${seconds}`
        })
    
    
      }
    }
    gameEndTest()
    
  }, [waldoFound , odlawFound, wilmaFound, whitebeardFound, startTime])


  useEffect(() => {
    setTimeout(()=> {
      setTimer(() => {
        const time = Date.now() - startTime
        let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((time % (1000 * 60)) / 1000);

        if(minutes<10) {minutes = "0"+minutes}
        if(seconds<10) {seconds = "0"+seconds}

        return `${minutes}:${seconds}`
      })
    }, 1000)
    
    
  } , [startTime , timer])
  
   

  const handler = (event) => {
    const {bottom , height , left, right , top, width} = event.target.getBoundingClientRect()

    setGameStart(true)
    setCoords(prevState => {
      return {...prevState ,
              top: event.clientY -25,
              left: event.clientX -25,
              
            }})
    /*console.log("ran")
    console.log(top , left)
    console.log(event.clientY, event.clientX)*/
  }

  const charChecker = (event) => {
    const characterCoords = {
      "waldo": {...waldoCoords, top: waldoCoords.top + 25, left: waldoCoords.left + 25},
      "wilma": {...wilmaCoords, top: wilmaCoords.top + 25, left: wilmaCoords.left + 25},
      "odlaw": {...odlawCoords, top: odlawCoords.top + 25, left: odlawCoords.left + 25},
      "whitebeard": {...whitebeardCoords, top: whitebeardCoords.top + 25, left:whitebeardCoords.left + 25}
    }

    const characterFound = {
      "waldo": ()=> setWaldoFound(true),
      "wilma": ()=> setWilmaFound(true),
      "odlaw": ()=> setOdlawFound(true),
      "whitebeard": () => setWhitebeardFound(true)
    }

    const currCoords = [coords.left,coords.top]
    const testCoords = [characterCoords[event.target.dataset.name].left , characterCoords[event.target.dataset.name].top]
    
    if (((currCoords[0] >= testCoords[0] - 75) && (currCoords[0] <= testCoords[0] + 75)  ) && 
        ((currCoords[1] >= testCoords[1] - 75) && (currCoords[1] <= testCoords[1] + 75)  )){
          characterFound[event.target.dataset.name]()
          setResponse(`${capitalize(event.target.dataset.name)} Found!`)
            
    }else {
      setResponse("Wrong choice")              
  }

    console.log(currCoords)
    console.log(testCoords)
        
  }

  

  
  const handleChange = (event) => {
    setName(event.target.value)
  }
    
  const handleSubmit = (event) => {
    event.preventDefault()
    const minutes =  parseInt(finalTime.slice(0,2)) * 60
    const seconds = parseInt(finalTime.slice(3,5))

    async function submitter() {
      try {
        await addDoc(collection(getFirestore(), 'leaderboards'), {
          name: name,
          time: minutes + seconds
        });
      } catch(error) {
        console.error("Error writing to DB")
      }
      
    }
    submitter()
    leaderboardFetcher()
    setName("")
    setDialogOpen(false)

  }

  console.log(coords)

  const leaderboardHandler = (value) => {

    if (value === "home") {
      setLeaderboardActive(false)
      setStartTime(Date.now())
    } else {
      setLeaderboardActive(true)
    }

  }
 

  return (
    <HashRouter basename = "/">
      <div className="App">
      <Nav 
        timer= {timer} 
        finalTime={finalTime} 
        gameEnd={gameEnd}
        waldoFound = {waldoFound}
        odlawFound = {odlawFound}
        whitebeardFound = {whitebeardFound}
        wilmaFound = {wilmaFound}
        leaderboardActive = {leaderboardActive}
        leaderboardHandler = {leaderboardHandler}
        />
      {gameEnd ? 
        <Form 
          finalTime = {finalTime} 
          handleChange = {handleChange}
          name = {name}
          handleSubmit = {handleSubmit}
          dialogOpen = {dialogOpen} 
        /> : ""
      }
      <Routes>
        <Route path = "/" exact element = {
          <Home 
          coords = {coords}
          handler = {handler}
          charChecker = {charChecker}
          response = {response}
          gameStart = {gameStart}     
          />}  
        />
        <Route path = "/leaderboards" exact element = {<Leaderboards leaderboard= {leaderboard}/>}/>
      </Routes>
      

    </div>
    </HashRouter>
    
  );
}

export default App;
