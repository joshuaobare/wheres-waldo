import image from "./images/whereswaldo.jpg"
import Nav from "./components/Nav";

function App() {

  const handler = (event) => {
    const {width , height} = event.target.getBoundingClientRect()
    
    console.log(width+window.scrollX , height+window.scrollY)
  }

  return (
    <div className="App">
      <Nav />
      <img onClick={handler} src={image} alt="" />
    </div>
  );
}

export default App;
