class Player{
    constructor(url){
        this.data = new Fetch();
        console.log(url);
        this.createPlayer(url);
    }
    async createPlayer(url){
        document.querySelector(".main").remove();
        this.body = document.querySelector("body");
        this.main = document.createElement("main");
        this.main.classList.add("main");
        this.body.appendChild(this.main);

        const data = await this.data.fetchUrl(url);
        console.log(data);

        this.player = document.createElement("section");
        this.player.classList.add("player");
        this.main.appendChild(this.player);

        this.account = document.createElement("div");
        this.account.classList.add("player__account");
        this.player.appendChild(this.account);

        this.image = document.createElement("img");
        this.image.classList.add("player__image");
        this.image.setAttribute("src", data.player[0].photo);
        this.account.appendChild(this.image);

        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("player__wrapper");
        this.account.appendChild(this.wrapper);

        this.name = document.createElement("h2");
        this.name.classList.add("player__name");
        this.name.innerText = data.player[0].name;
        this.wrapper.appendChild(this.name);

        if(data.rank == 1){
            this.crown = document.createElement("i");
            this.crown.classList = "fa-solid fa-crown player__name--crown";
            this.name.appendChild(this.crown);
        }

        this.stats = document.createElement("span");
        this.stats.classList.add("player__stats");
        this.wrapper.appendChild(this.stats);

        for(let i = 0; i < 3; i++){
            this.ranked = document.createElement("article");
            this.ranked.classList.add("player__stats--stat");
            this.stats.appendChild(this.ranked);

            this.rankText = document.createElement("p");
            this.rankText.classList.add("player__stats--stat-text");
            this.ranked.appendChild(this.rankText);

            this.rank = document.createElement("p");
            this.rank.classList.add("player__stats--rank");
            this.ranked.appendChild(this.rank);
        }

        document.getElementsByClassName("player__stats--stat-text")[0].innerText = "Rank";
        document.getElementsByClassName("player__stats--stat-text")[1].innerText = "Score";
        document.getElementsByClassName("player__stats--stat-text")[2].innerText = "Plays";

        document.getElementsByClassName("player__stats--rank")[0].innerText = data.rank;
        document.getElementsByClassName("player__stats--rank")[1].innerText = data.player[0].score;
        document.getElementsByClassName("player__stats--rank")[2].innerText = data.player[0].plays;
    }
}

export default Player;