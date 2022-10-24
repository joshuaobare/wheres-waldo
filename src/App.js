import image from "./images/whereswaldo.jpg"
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <img src={image} alt="" />
      
    </div>
  );
}

export default App;
