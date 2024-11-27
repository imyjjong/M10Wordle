class Login{
    constructor(getScore){
        this.getScore(getScore);
    }
    getScore(getScore){
        let score = 0;
        switch(getScore){
            case 0:
                score = 50;
                break;
            case 1:
                score = 25;
                break;
            case 2:
                score = 20;
                break;
            case 3:
                score = 10;
                break;
            case 4:
                score = 5;
                break;
            case 5:
                score = 1;
                break;
        }
        console.log(score);
        this.createLogin(score);
    }
    createLogin(score){
        this.body = document.querySelector("body");

        this.login = document.createElement("section");
        this.login.classList.add("login");
        this.body.appendChild(this.login);

        this.loginHeader = document.createElement("article");
        this.loginHeader.classList.add("login__heading");
        this.login.appendChild(this.loginHeader);

        this.crown = document.createElement("i");
        this.crown.classList = "fa-solid fa-crown login__heading--icon";
        this.loginHeader.appendChild(this.crown);

        this.title = document.createElement("h2");
        this.title.classList.add("login__heading--title");
        this.title.innerText = "You guessed it";
        this.loginHeader.appendChild(this.title);

        this.text = document.createElement("p");
        this.text.classList.add("login__heading--text");
        this.text.innerText = "Save your score by entering your name";
        this.loginHeader.appendChild(this.text);

        this.form = document.createElement("form");
        this.form.classList.add("login__form");
        this.form.setAttribute("id", "loginForm");
        this.form.setAttribute("action", "signin.php");
        this.form.setAttribute("method", "GET");
        this.login.appendChild(this.form);

        this.input = document.createElement("input");
        this.input.classList.add("login__input");
        this.input.setAttribute("type", "text");
        this.input.setAttribute("name", "signin");
        this.input.setAttribute("placeholder", "Insert your name");
        this.form.appendChild(this.input);

        this.score = document.createElement("input");
        this.score.setAttribute("type", "hidden");
        this.score.setAttribute("name", "score");
        this.score.value = score;
        this.form.appendChild(this.score);
        
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.toPhpWithGet(event);
        });
    }
    toPhpWithGet(event){
        let form = event.target;
        const data = new FormData(form);
        
        let url = "signin.php?signin="+data.get("signin")+"&score="+data.get("score");
        fetch(url)
        .then((response)=>{
            console.log(response);
        });
        window.location.reload();
    }
}

export default Login;