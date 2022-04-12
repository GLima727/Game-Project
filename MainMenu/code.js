function gameStart() {
    playerStart()
}

function playerStart(){

}
function receivePlayerName(){
    gameStart();
    var playerName = document.getElementById("nameInput").value;
    console.log(playerName.length)

    if(playerName.length > 10){
        /*document.querySelector(".nameInputError").classList.add('inpErr'); typing animation*/
        document.getElementById("nameInputError").innerHTML = " The name must have 10 characters or less.";
    }
    else if(playerName == "Joe" || playerName == "joe"){

        document.getElementById("nameInputError").innerHTML = "<l> Joe who?<l/>";
    }
    else if(playerName == "Joe Mamma" || playerName == "Joe mamma" || playerName == "joe Mamma" || playerName == "joe mamma"){

        document.getElementById("nameInputError").innerHTML = "<l> Joe Mamma who?<l/>";
    }

    else if(playerName != ""){
        player.name = playerName;
        
        document.getElementById("headerMenuText").innerHTML = "<l>Player Name: <span style='color: #8d99ae;font-size: 1.6vw'>" + player.name + "</l>";
        document.getElementById('startMenuBox').remove();
        
    }
}
const player = new Player();

