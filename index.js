document.addEventListener('DOMContentLoaded', ()=>{
    const start=document.getElementById('start-btn');
    const reset=document.getElementById('reset-btn');
    const tile=document.getElementsByClassName('block');
    const gameOver=document.querySelector('.game-over');

    let snakeMouth;
    let snakeMouthIndex;
    let intervalId;
    function generateFood() {
        //196
        let index=Math.floor(Math.random()*196);
        let foodCell=tile[index];
        foodCell.style.backgroundColor='red';
    }

    function snakeDirection(e){
        if(e.key==="ArrowUp")
            snakeMouth=tile[snakeMouthIndex-14];
        else if(e.key==="ArrowDown")
            snakeMouth=tile[snakeMouthIndex+14];
        else if(e.key==="ArrowLeft")
            snakeMouth=tile[snakeMouthIndex-1];
        else if(e.key==="ArrowRight")
            snakeMouthIndex=tile[snakeMouthIndex+1];
    }
    function snake() {
        document.addEventListener('keydown', (e)=>{
            snakeDirection(e);
        });
        
    }
    start.addEventListener('click', ()=>{
        start.disabled=true;
        snakeMouth=tile[104];
        snakeMouthIndex=104;
        snakeMouth.style.backgroundColor='green';
        //updating score
        //generating food
        generateFood();
        //snake(moving, length increment, collision)
        intervalId=setInterval(snake,1000);

    });

    reset.addEventListener('click', ()=>{

    });
});