
class User {
    // constructor(){};
    constructor(user = '', repositories = '', followers = '', followings = '', publicGists = '', scoreTotal = '') {
        this.username = user;
        this.nRepos = repositories;
        this.nFollowers = followers;
        this.nFollowings = followings;
        this.nPublicGist = publicGists;
        this.score = scoreTotal;
    }
    
    async getDataUser(username) {
        const url = `https://api.github.com/users/${username}`;
        try {
            let dataUser = await fetch(url);
            dataUser = await dataUser.json();
            this.username = dataUser['login'];
            this.nRepos = dataUser['public_repos'];
            this.nFollowers = dataUser['followers'];
            this.nFollowings = dataUser['following'];
            this.nPublicGist = dataUser['public_gists'];
            this.score = parseInt(this.nRepos + this.nFollowers + this.nFollowings + this.nPublicGist);
        } catch (error) {
            console.log("Drama: " + error);
        }
    }
}

const inputUserOne = document.querySelector("#userOne");
const inputUserTwo = document.querySelector("#userTwo");
const btnGoUserOne = document.querySelector("#btnGo1");
const btnGoUserTwo = document.querySelector("#btnGo2");

btnGoUserOne.addEventListener('click', function () {
    if (inputUserOne.value.length === 0) {
        alert("Ingrese un nombre de usuario de GitHub");
    } else {
        let user = new User();
        user.getDataUser(inputUserOne.value.trim());
        console.log(user);
    }
});

btnGoUserTwo.addEventListener('click', function () {
    if (inputUserTwo.value.length === 0) {
        alert("Ingrese un nombre de usuario de GitHub");
    } else {
        const user2 = new User(inputUserTwo.value.trim());
        user2.getDataUser(inputUserTwo.value.trim());
        console.log(user2);
    }
});

