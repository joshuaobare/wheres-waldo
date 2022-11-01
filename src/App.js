import image from "./images/whereswaldo.jpg"
import Nav from "./components/Nav";
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
  const [startTime , setStartTime] = useState("")
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    setStartTime(Date.now())
  }, [])

  useEffect(() => {
    setTimeout(()=> {
      setTimer(Date.now() - startTime)
    }, 1000)
  } , [startTime , timer])
  
  function timeChanger() {
    setInterval(Date.now() - startTime, 1000)
  }


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
              bottom: bottom,
              height: height,
              left: left,
              right: right,
              top: top,
              width: width,
            }})
    
    console.log(event.target.getBoundingClientRect())
  }

  

  return (
    <div className="App">
      <Nav startTime= {timer}/>
      <img onClick={handler} src={image} alt="" />
    </div>
  );
}

export default App;
