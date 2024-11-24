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
        console.log(data.words.length);
        this.wordIndex = Math.floor(Math.random() * data.words.length);
        this.word = data.words[this.wordIndex].word;

        this.createRow();
    }
    createRow(){
        this.inputs = document.createElement("span");
        this.inputs.classList.add("wordle__inputs");
        this.wordle.appendChild(this.inputs);

        for(let i = 0; i < 5; i++){
            this.input = document.createElement("article");
            this.input.classList.add("wordle__input");
            this.inputs.appendChild(this.input);
        }

        this.wordArray = [];
        this.index = 0;
    }
    addInput(event){
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
                console.log("no more elements")
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
            console.log("check wordarray length after enter " + this.wordArray.length);
            if(this.wordArray.length == 5){
                let getLetters = this.word.split("");
                console.log(this.wordArray);
                console.log(this.word.split(""));
                if(this.wordArray.join("") === this.word){
                    console.log("u got the word!");
                    for(let i = 0; i < this.getInputs.length; i++){
                        this.getInputs[i].style.background = "green";
                    }
                    console.log("only once okay?");
                    console.log(this.index);
                    this.guessed();
                    return;
                }
                else{
                    console.log("this better not be running");
                    for(let i = 0; i < 5; i++){
                        if(this.wordArray[i] === getLetters[i]){
                            this.getInputs[i].style.background = "green";
                            getLetters[i] = null;
                        }
                        else if(getLetters.includes(this.wordArray[i]) && this.wordArray[i] !== getLetters[i]){
                            this.getInputs[i].style.background = "yellow";
                            getLetters[getLetters.indexOf(this.wordArray[i])] = null;

                        }
                        else{
                            this.getInputs[i].style.background = "grey";
                        }
                    }
                    if(document.getElementsByClassName("wordle__inputs").length >= 6){
                        console.log("that was ur last chance");
                        this.inputsIndex = 0;
                        return;
                    }
                    else{
                        this.inputsIndex++;
                        console.log("does this maybe run?");
                        this.wordArray = [];
                        this.createRow(this.inputsIndex);
                    }
                }
            }
            else{
                this.notenoughAlert = document.createElement("div");
                this.notenoughAlert.classList.add("alerts__notenough");
                this.notenoughAlert.innerText = "not enough letters";
                this.body.appendChild(this.notenoughAlert);
            }
        }
        
    }
    guessed(){
        if(this.isGuessed){
            return;
        }
        this.isGuessed = true;
        console.log("honeymoon");
        this.modal = document.createElement("div");
        this.modal.classList.add("modal");
        this.modal.innerText = "modal"
        this.body.appendChild(this.modal)
    }
}

export default Wordle;