import image from "./images/whereswaldo.jpg"
import Nav from "./components/Nav";
import Form from "./components/Form"
import app from "./index"
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
  const [gameEnd, setGameEnd] = useState(false)
  const [finalTime , setFinalTime] = useState("")
  const [name , setName] = useState("")

    
     

  useEffect(() => {
    setStartTime(Date.now())
    async function fetcher() {
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
    
    }
    fetcher()
    
  }, [])

  /*useEffect(() => {
    
  }, [coords])*/

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
  
  
  /* useEffect(() => {
    
      saveCoords(coords)
    
    
  }, [coords])

  async function saveCoords(coord) {

    if (coord === {}) {
      return
    }else {
      try {
        await addDoc(collection(getFirestore(), 'coordinates'), {
          coords : coord
        });
      }
      catch(error) {
        console.error('Error writing new message to Firebase Database', error);
      }
    }
    
    
  } */

  const handler = (event) => {
    const {bottom , height , left, right , top, width} = event.target.getBoundingClientRect()
    
    setCoords(prevState => {
      return {...prevState ,
              /*bottom: bottom,
              height: height,
              width: width,
              right: right,*/
              top: event.clientY -25,
              left: event.clientX -25,
              
            }})
    console.log("ran")
    console.log(top , left)
    console.log(event.clientY, event.clientX)
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

    if (coords === characterCoords[event.target.dataset.name]) {      
      characterFound[event.target.dataset.name]()
    } else {
        setResponse("Wrong choice")              
    }

    // if all characters are found the target box is hidden
    if (!odlawFound && !waldoFound && !wilmaFound && !whitebeardFound) {
      setCoords(prevState => {
        return {...prevState, display:"none"}
      })
      
      setGameEnd(true)

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

  const handleChange = (event) => {
    setName(event.target.value)
  }
  //console.log(name)
  
  const handleSubmit = (event) => {
    event.preventDefault()

    async function submitter() {
      await addDoc(collection(getFirestore(), 'leaderboards'), {
        name: name,
        time: finalTime
      });
    }
    submitter()

  }
 

  return (
    <div className="App">
      <Nav timer= {timer} finalTime={finalTime} gameEnd={gameEnd}/>
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
      {gameEnd ? 
        <Form 
          finalTime = {finalTime} 
          handleChange = {handleChange}
          name = {name}
          handleSubmit = {handleSubmit} 
        /> : ""
      }
      
    </div>
  );
}

export default App;
