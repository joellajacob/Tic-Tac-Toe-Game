let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let currPlayer = "X"; //X or O
let winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
  ]; 
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let mainContainer = document.querySelector(".main-container");
// let buttonClicks =0;

  
const dispRes = (winner,isDraw)=>{
  if(!isDraw){
    msg.innerText = `Player ${winner} wins!`;
  }
  else{
    msg.innerText = `It's a draw!`;
  }
  msgContainer.style.display = "flex";
  mainContainer.style.display = "none";
  boxes.forEach((box)=>{
    box.disabled=true;
  })
}

const checkWinner = () => {
  for(let pattern of winPatterns){
    // console.log(pattern);
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    
    //dont check for win if all boxes of the pattern is not filled
    if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
      if(pos1Val===pos2Val && pos2Val===pos3Val){
        console.log(`winner ${pos1Val}`);
        dispRes(pos1Val,false);
      }
    }
  }
}

const checkTie = () => {
  for(let i=0;i<9;i++){
    if(boxes[i].innerText===""){
      return;
    }
  }
  dispRes(null,true);
}

const resetGame = () =>{
  boxes.forEach((box)=>{
    box.disabled=false;
    box.innerText = "";
    box.classList.remove("X","O");
    msgContainer.style.display = "none";
    mainContainer.style.display = "flex";
    // console.log("this is new game");
  })
  currPlayer = "X";
}

 //main logic
boxes.forEach((box)=>{
  box.addEventListener("click",()=>{
    if(currPlayer === "X"){
      box.innerText = "X";
      box.classList.add("X");
    }
    else{
      box.innerText = "O";
      box.classList.add("O");
    }
    // buttonClicks+=1;
    currPlayer = currPlayer === "X"?"O":"X";
    box.disabled= true;
    checkWinner();
    checkTie();
  })
})

newBtn.addEventListener("click",resetGame);

resetBtn.addEventListener("click",resetGame);


