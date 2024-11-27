import Leaderboard from "../Leaderboard/Leaderboard.js";

class Header{
    constructor(){
        this.modalState = false;
        this.createHeader();
    }
    createHeader(){
        this.body = document.querySelector("body");
        this.header = document.createElement("header");
        this.header.classList.add("header");
        this.body.appendChild(this.header);

        this.navigation = document.createElement("nav");
        this.navigation.classList.add("header__navigation");
        this.header.appendChild(this.navigation);

        this.leaderboard = document.createElement("button");
        this.leaderboard.classList.add("header__navigation--leaderboard");
        this.navigation.appendChild(this.leaderboard);

        this.icon = document.createElement("i");
        this.icon.classList = "fa-solid fa-ranking-star header__navigation--leaderboard-icon";
        this.leaderboard.appendChild(this.icon);

        this.createModal();
    }
    createModal(){
        console.log(this.modalState);
        this.leaderboardButton = document.getElementsByClassName("header__navigation--leaderboard")[0];
        this.leaderboardButton.onclick = () => {
            if(this.modalState == false){
                this.lead = new Leaderboard();
                this.modalState = true;
            }
            else{
                document.querySelector(".leaderboard").remove();
                this.modalState = false;
            }
        }
    }
}

export default Header;