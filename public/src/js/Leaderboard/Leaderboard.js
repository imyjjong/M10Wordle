import Player from "../Player/Player.js";

class Leaderboard{
    constructor(){
        this.data = new Fetch();
        this.createLeaderboard();
    }
    async createLeaderboard(){
        this.main = document.querySelector(".main");

        this.leaderboard = document.createElement("section");
        this.leaderboard.classList.add("leaderboard");
        this.main.appendChild(this.leaderboard);
        
        this.title = document.createElement("h2");
        this.title.classList.add("leaderboard__title");
        this.title.innerText = "Leaderboard";
        this.leaderboard.appendChild(this.title);

        this.list = document.createElement("ul");
        this.list.classList.add("leaderboard__list");
        this.leaderboard.appendChild(this.list);

        const data = await this.data.fetchUrl("leaderboard.php");
        let ranking = [...data.scores].sort((a, b) => b.score - a.score);
        console.log(ranking);

        ranking.forEach((player, index) => {
            this.item = document.createElement("li");
            this.item.classList.add("leaderboard__player");
            this.item.setAttribute("id", player.idScores);
            this.list.appendChild(this.item);

            this.rank = document.createElement("p");
            this.rank.classList.add("leaderboard__player--rank");
            this.rank.innerText = index + 1;
            this.item.appendChild(this.rank);
            console.log(index + 1);

            this.name = document.createElement("p");
            this.name.classList.add("leaderboard__player--name");
            this.name.innerText = player.name;
            this.item.appendChild(this.name);

            this.name.onclick = (event) => {
                event.preventDefault();
                let url = "player.php?id="+player.idScores+"&rank="+index;
                this.player = new Player(url);
                
            }

            this.score = document.createElement("p");
            this.score.classList.add("leaderboard__player--score");
            this.score.innerText = player.score;
            this.item.appendChild(this.score);

        })
        
        this.getWinner();
    }
    getWinner(){
        this.winner = document.getElementsByClassName("leaderboard__player--name")[0];

        this.crown = document.createElement("i");
        this.crown.classList = "fa-solid fa-crown leaderboard__player--name-crown";
        this.winner.appendChild(this.crown);
    }
}

export default Leaderboard;