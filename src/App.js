import image from "./images/whereswaldo.jpg"
import Nav from "./components/Nav";
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
  const [startTime , setStartTime] = useState("")
  const [timer, setTimer] = useState("")

  useEffect(() => {
    setStartTime(Date.now())
    async function fetcher() {
      const ref = await getDocs(collection(getFirestore(app), "coordinates"))
      console.log(ref)
      ref.forEach((doc) => {
        setWaldoCoords(doc._document.data.value.mapValue.fields.coords.mapValue.fields)
      })
    
    }
    fetcher()
    
  }, [])

  useEffect(() => {
    
  }, [coords])

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

  let style

  const handler = (event) => {
    const {bottom , height , left, right , top, width} = event.target.getBoundingClientRect()

    style = {
      left: left, top: top
    }
    
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
    console.log(event.clientX)
  }

  console.log(waldoCoords)

  return (
    <div className="App">
      <Nav startTime= {timer}/>
      <img onClick={handler} src={image} alt="" />
      <div style={coords} className="target-box">
        <div className="square"></div>
        <div className="character-list">
          <div>Waldo</div>
          <div>Odlaw</div>
          <div>Wilma</div>
          
        </div>
      </div>
      
    </div>
  );
}

export default App;
