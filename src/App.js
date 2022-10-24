import image from "./images/whereswaldo.jpg"
import Nav from "./components/Nav";

function App() {

  const handler = (event) => {
    console.log(event.target.getBoundingClientRect() , event.target.clientY)
  }

  return (
    <div className="App">
      <Nav />
      <img onClick={handler} src={image} alt="" />
    </div>
  );
}

export default App;
