document.addEventListener('DOMContentLoaded', ()=>{
    const start=document.getElementById('start-btn');
    const reset=document.getElementById('reset-btn');
    const tile=document.getElementsByClassName('block');
    const gameOver=document.querySelector('.game-over');
    const score=document.getElementById('score');

    let snakeMouth;
    let snakeMouthIndex;
    let intervalId;
    let snakeLength=1;
    let foodIndex;
    function generateFood() {
        //196
        foodIndex=Math.floor(Math.random()*196);
        let foodCell=tile[foodIndex];
        foodCell.style.backgroundColor='red';
    }

    let currentDirection;
    function snake() {
        document.addEventListener('keydown', (e)=>{
            currentDirection=e.key;
        });
        snakeMouth.style.backgroundColor='rgb(255,255,158)';
        if(currentDirection==="ArrowUp")
        {
            snakeMouth=tile[snakeMouthIndex-14];
            snakeMouthIndex-=14;
        }
        else if(currentDirection==="ArrowDown")
        {
            snakeMouth=tile[snakeMouthIndex+14];
            snakeMouthIndex+=14;
        }
        else if(currentDirection==="ArrowLeft")
        {
            snakeMouth=tile[snakeMouthIndex-1];
            snakeMouthIndex-=1;
        }
        else if(currentDirection==="ArrowRight")
        {
            snakeMouth=tile[snakeMouthIndex+1];
            snakeMouthIndex+=1;
        }
        //updating score
        if(snakeMouthIndex===foodIndex)
        {
            snakeLength+=1;
            score.textContent=parseInt(score.textContent)+1;
            generateFood();
        }
        snakeMouth.style.backgroundColor='green';
    }
    start.addEventListener('click', ()=>{
        start.disabled=true;
        snakeMouth=tile[104];
        snakeMouthIndex=104;
        snakeMouth.style.backgroundColor='green';
        //generating food
        generateFood();
        //snake(moving, length increment, collision)
        intervalId=setInterval(snake,1000);

    });

    reset.addEventListener('click', ()=>{

    });
});