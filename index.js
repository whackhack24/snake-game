document.addEventListener('DOMContentLoaded', ()=>{
    const start=document.getElementById('start-btn');
    const reset=document.getElementById('reset-btn');
    const tile=document.getElementsByClassName('block');
    const gameOver=document.querySelector('.game-over');
    const score=document.getElementById('score');

    let snakeBody=[];
    let snakeMouthIndex;
    let intervalId;
    let foodIndex;
    let t=1000;
    function generateFood() {
        //196
        foodIndex=Math.floor(Math.random()*196);
        let foodCell=tile[foodIndex];
        while(snakeBody.includes(foodIndex)){
            score.textContent=parseInt(score.textContent)+1;
            generateFood();
        }
        foodCell.style.backgroundColor='red';
    }

    let currentDirection;
    function snake() {
        document.addEventListener('keydown', (e)=>{
            currentDirection=e.key;
        });
        for(let i=1;i<snakeBody.length;i++){
            if(snakeBody[i]===snakeMouthIndex){
                gameOver.style.display="block";
                clearInterval(intervalId);
            }
        }
        if(snakeMouthIndex%14===0 && currentDirection==="ArrowLeft"){
            gameOver.style.display="block";
            clearInterval(intervalId);
        }
        if(snakeMouthIndex%14===13 && currentDirection==="ArrowRight"){
            gameOver.style.display="block";
            clearInterval(intervalId);
        }
        if(snakeMouthIndex<=13 && currentDirection==="ArrowUp"){
            gameOver.style.display="block";
            clearInterval(intervalId);
        }
        if(snakeMouthIndex<=195 && snakeMouthIndex>=182 && currentDirection==="ArrowDown"){
            gameOver.style.display="block";
            clearInterval(intervalId);
        }
        if(currentDirection==="ArrowUp")
            snakeMouthIndex-=14;
        else if(currentDirection==="ArrowDown")
            snakeMouthIndex+=14;
        else if(currentDirection==="ArrowLeft")
            snakeMouthIndex-=1;
        else if(currentDirection==="ArrowRight")
            snakeMouthIndex+=1;
        // add new head
        snakeBody.unshift(snakeMouthIndex);
        //updating score
        if(snakeMouthIndex===foodIndex){
            score.textContent=parseInt(score.textContent)+1;
            generateFood();
            if(parseInt(score.textContent)%10===0){
                clearInterval(intervalId);
                if(t===100)
                    t=200;
                intervalId=setInterval(snake, t-100);
                t=t-100;
            }
        }
        else {
            // remove tail if not eating
            let tail = snakeBody.pop();
            tile[tail].style.backgroundColor = "rgba(255, 255, 0, 1)";
            tile[tail].style.border="none";
        }
        snakeBody.forEach(i => {
            tile[i].style.backgroundColor = 'white';
            tile[i].style.border="4px solid blue";
        });
    }
    start.addEventListener('click', ()=>{
        start.disabled=true;
        snakeBody=[104];
        snakeMouthIndex=104;
        tile[104].style.backgroundColor="white";
        tile[104].style.border="4px solid blue";
        //generating food
        generateFood();
        //snake(moving, length increment, collision)
        intervalId=setInterval(snake,1000);

    });

    reset.addEventListener('click', ()=>{
        snakeBody.forEach(i => {
            tile[i].style.backgroundColor = 'rgba(255, 255, 0, 1)';
        });
        gameOver.style.display="none";
        score.textContent="0";
        start.disabled=false;
        currentDirection="none";
    });
});