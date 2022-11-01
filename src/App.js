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

  console.log(coords)

  return (
    <div className="App">
      <Nav />
      <img onClick={handler} src={image} alt="" />
    </div>
  );
}

export default App;
