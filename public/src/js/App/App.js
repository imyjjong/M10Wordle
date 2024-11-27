import Header from "../Header/Header.js";
import Wordle from "../Wordle/Wordle.js";
class App{
    constructor(){
        this.header = new Header();
        this.wordle = new Wordle();
    }
}

export default App;