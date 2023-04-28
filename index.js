let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

//winning pattern Array
let winningPattern = [
    [0,1,2],
    [0,3,6],
    [2,5,8],
    [6,7,8],
    [3,4,5],
    [1,4,7],
    [0,4,8],
    [2,4,6],
];

//Player 'x' playes first
let xTurn = true;
let count = 0;

//Disable All Buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
};

//Enable all buttons(for new game and restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    })

    //disable popup
    popupRef.classList.add("hide");
};

//This function is exicuted when a player wins
const winFunction = (letter) => {
    disableButtons();
    if(letter == "X"){
        msgRef.innerHTML = "<lord-icon src='https://cdn.lordicon.com/ihyatngg.json' trigger='loop' delay='0' colors='primary:#66eece,secondary:#3080e8' style='width:250px;height:250px'> </lord-icon> <br> 'X' Wins";
    }
    else{
        msgRef.innerHTML = "<lord-icon src='https://cdn.lordicon.com/ihyatngg.json' trigger='loop' delay='0' colors='primary:#66eece,secondary:#3080e8' style='width:250px;height:250px'> </lord-icon> <br> 'O' Wins";
    }
    xTurn = true;
};

//function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "<lord-icon src='https://cdn.lordicon.com/ihyatngg.json' trigger='loop' delay='0' colors='primary:#66eece,secondary:#3080e8' style='width:250px;height:250px'> </lord-icon> <br> It's a Draw"; };

//New Game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// win Logic
const winChecker = () => {
    //loop through all win patterns
    for(let i of winningPattern){
        let[element1,element2,element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText
        ];
        if(element1 != "" && (element2 != "") && (element3 != "")){
            if(element1 == element2 && element2 == element3){
                winFunction(element1);
            }
        }
    }
};


//Display x/o on click
btnRef.forEach((element) => {
    element.addEventListener("click",() => {
        if(xTurn){
        xTurn = false;
        //Display X
        element.innerText = "X";
        element.disabled = true;
    }
    else{
        xTurn = true;
        //Display O
        element.innerText = "O";
        element.disabled = true;
    }
    // increment count on each click
    count+=1;
    if(count == 9){
        drawFunction();
    }
    //check for win on every click
    winChecker();
    });
});

//Enable Buttons and disable popup on page load
window.onload = enableButtons;