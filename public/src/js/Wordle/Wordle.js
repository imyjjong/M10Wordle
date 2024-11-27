import Login from "../Login/Login.js";

class Wordle{
    constructor(){
        this.data = new Fetch();
        this.word = "";
        this.wordArray = [];
        this.inputsIndex = 0;
        this.index = 0;
        this.isGuessed = false;
        window.addEventListener("keydown", this.addInput.bind(this));
        this.createWordle();
    }
    async createWordle(){
        this.body = document.querySelector("body");

        this.main = document.createElement("main");
        this.main.classList.add("main");
        this.body.appendChild(this.main);

        this.wordle = document.createElement("section");
        this.wordle.classList.add("wordle");
        this.main.appendChild(this.wordle);

        const data = await this.data.fetch();
        this.wordIndex = Math.floor(Math.random() * data.words.length);
        this.word = data.words[this.wordIndex].word;
        // this.word = "witch";

        this.createRow();
        this.createKeyboard();
    }
    createRow(){
        for(let i = 0; i < 6; i++){
            this.inputs = document.createElement("span");
            this.inputs.classList.add("wordle__inputs");
            this.wordle.appendChild(this.inputs);
    
            for(let i = 0; i < 5; i++){
                this.input = document.createElement("article");
                this.input.classList.add("wordle__input");
                this.inputs.appendChild(this.input);
            }
        }
        console.log(this.inputsIndex);

        this.wordArray = [];
        this.index = 0;
    }
    async createKeyboard(){
        console.log("keyboard");
        this.keyboard = document.createElement("div");
        this.keyboard.classList.add("keyboard");
        this.wordle.appendChild(this.keyboard);

        const data = await this.data.fetch();

        for(let i = 0; i < data.letters.length; i++){
            this.key = document.createElement("button");
            this.key.classList = "keyboard__key keyboard__key--"+data.letters[i].letter;
            this.key.innerText = data.letters[i].letter;
            this.keyboard.appendChild(this.key);
        }

        this.keyClick();
    }
    keyClick(){
        this.getKeys = document.getElementsByClassName("keyboard__key");
        for(let i = 0; i < this.getKeys.length; i++){
            this.getKeys[i].onclick = () => {
                console.log(this.getKeys[i].innerText);
            }
        }
    }
    addInput(event){
        if(this.inputsIndex > 5){
            return;
        }
        this.getInputs = document.getElementsByClassName("wordle__inputs")[this.inputsIndex].children;
        if(event.code.substring(0, 3) === "Key"){
            console.log(event.key);
            if(this.getInputs.length >= this.index + 1){
                console.log("index is "+ this.index);
                this.getInputs[this.index].innerText = event.key;
                this.wordArray.push(event.key.toLowerCase());
                console.log(this.getInputs.length);
                this.index++;
            }
            else{
                console.log("no more elements");
            }
        }
        else if(event.key === "Backspace"){
            if(this.index - 1 >= 0 && this.isGuessed == false){
                this.index--;
                this.getInputs[this.index].innerText = "";
                this.wordArray.pop();
                console.log("index after backspace " + this.index);
            }
            else{
                console.log(this.index + " after failed backspace");
                return;
            }
        }
        else if(event.key === "Enter"){
            let getLetters = this.word.split("");
            this.checkGuess(getLetters);
        }
        
    }
    async checkGuess(getLetters){
        const data = await this.data.fetch();
        const getWords = data.words.map(getWord => getWord.word);
        this.getInputs = document.getElementsByClassName("wordle__inputs")[this.inputsIndex].children;
        console.log("check wordarray length after enter " + this.wordArray.length);
        if(this.wordArray.length == 5){
            console.log(this.wordArray);
            console.log(this.word.split(""));
            if(this.wordArray.join("") === this.word){
                console.log("u got the word!");
                if(this.word === "witch" || this.word === "coven" || this.word === "crone"){
                    for(let i = 0; i < this.getInputs.length; i++){
                        this.getInputs[i].classList.add("wordle__reveal--purple");
                    }
                }
                else{
                    for(let i = 0; i < this.getInputs.length; i++){
                        this.getInputs[i].classList.add("wordle__reveal--green");
                    }
                }
                console.log("only once okay?");
                console.log(this.index);
                setTimeout(() => {
                    this.guessed();
                    return;
                }, 4000);
            }   
            else if(!getWords.includes(this.wordArray.join(""))){
                this.noword = document.createElement("div");
                this.noword.classList.add("alerts__notenough");
                this.noword.innerText = "not in word list";
                this.body.appendChild(this.noword);
                this.nowordRow = document.getElementsByClassName("wordle__inputs")[this.inputsIndex];
                this.nowordRow.classList.add("wordle__inputs--notenough");
                setInterval(() => {
                    this.nowordRow.classList.remove("wordle__inputs--notenough");
                    this.noword.remove();
                }, 2000)
            }
            else if(this.wordArray.join("") !== this.word && this.inputsIndex == 5){
                setTimeout(() => {
                    this.failedAlert = document.createElement("div");
                    this.failedAlert.classList.add("alerts__notenough");
                    this.failedAlert.innerText = "the word was " + this.word;
                    this.body.appendChild(this.failedAlert);
                }, 5000);
            }
            else{
                for(let i = 0; i < 5; i++){
                    console.log(this.wordArray[i])
                    console.log(getLetters[i])
                    if(this.wordArray[i] === getLetters[i]){
                        this.getInputs[i].classList.add("wordle__reveal--green");
                        let getLetter = this.getInputs[i].innerText.toUpperCase();
                            console.log(document.getElementsByClassName("keyboard__key--"+getLetter));
                            setTimeout(() => {
                                document.getElementsByClassName("keyboard__key--"+getLetter)[0].classList.add("keyboard__key--green");
                            }, 4000);
                        getLetters[i] = null;
                        console.log(getLetters);
                    }
                    if(getLetters.includes(this.wordArray[i]) && this.wordArray[i] !== getLetters[i]){
                        if(this.getInputs[i].className === "wordle__input"){
                            this.getInputs[i].classList.add("wordle__reveal--yellow");
                            let getLetter = this.getInputs[i].innerText.toUpperCase();
                            console.log(document.getElementsByClassName("keyboard__key--"+getLetter));
                            setTimeout(() => {
                                document.getElementsByClassName("keyboard__key--"+getLetter)[0].classList.add("keyboard__key--yellow");
                            }, 4000);
                        }
                        getLetters[getLetters.indexOf(this.wordArray[i])] = null;

                    }
                    else{
                        if(this.getInputs[i].className === "wordle__input"){
                            this.getInputs[i].classList.add("wordle__reveal--grey");
                            console.log(this.getInputs[i].innerHTML)
                            let getLetter = this.getInputs[i].innerText.toUpperCase();
                            console.log(document.getElementsByClassName("keyboard__key--"+getLetter));
                            setTimeout(() => {
                                document.getElementsByClassName("keyboard__key--"+getLetter)[0].classList.add("keyboard__key--grey");
                            }, 4000);
                        }
                    }
                }
                if(this.inputsIndex >= 6){
                    console.log("that was ur last chance");
                    this.inputsIndex = 0;
                    console.log("idk i think after enter check atfer inputs: " + this.inputsIndex);
                    this.wordArray = [];
                    this.index = 0;
                    return;
                }
                else{
                    this.inputsIndex++;
                    console.log("idk i think after enter check: " + this.inputsIndex);
                    console.log("does this maybe run?");
                    this.index = 0;
                    this.wordArray = [];
                }
            }
        }
        else{
            console.log(this.inputsIndex);
            this.notenoughAlert = document.createElement("div");
            this.notenoughAlert.classList.add("alerts__notenough");
            this.notenoughAlert.innerText = "not enough letters";
            this.body.appendChild(this.notenoughAlert);
            this.notenoughRow = document.getElementsByClassName("wordle__inputs")[this.inputsIndex];
            this.notenoughRow.classList.add("wordle__inputs--notenough");
            setInterval(() => {
                this.notenoughRow.classList.remove("wordle__inputs--notenough");
                this.notenoughAlert.remove();
            }, 2000)
        }
    }
    guessed(){
        if(this.isGuessed){
            return;
        }
        this.isGuessed = true;
        console.log("honeymoon");
        console.log(this.inputsIndex);
        this.login = new Login(this.inputsIndex);
    }
}

export default Wordle;