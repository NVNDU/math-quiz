let interval = undefined;
let count = 0;
let randomnum1 =0;
let randomnum2 =0;
let selectedOp = "";
let marks = 0;

let minElement=document.getElementById("min");
let secElement=document.getElementById("sec");
let questionNum=document.getElementById("qnum");

let num_1 = document.getElementById("num1");
let num_2 = document.getElementById("num2");
let operator = document.getElementById("operator");
let answer = document.getElementById("answer");
let table = document.getElementById("result_table");
let timespan = document.getElementById("timespan");
let markspan = document.getElementById("marks");

let op = ['+','-','/','*'];
let result = [];

const printPage = () =>{
    window.print();
}

const setTableData = ()=>{
    result.forEach(item=>{
        let row = document.createElement("tr");

        for(let key in item){
            if(item.hasOwnProperty(key)){
                let cell = document.createElement("td");
                cell.textContent = item[key];
                row.appendChild(cell);
            }
        }

        table.appendChild(row);
    })
}

const setAnswer = () =>{
    let correctAnswer = 0;
    let userAnswer = parseFloat(answer.value);

    switch(selectedOp){
        case "+" : correctAnswer = randomnum1 + randomnum2;break;
        case "-" : correctAnswer = randomnum1 - randomnum2;break;
        case "/" : correctAnswer = parseFloat((randomnum1 / randomnum2).toFixed(1));break;
        case "*" : correctAnswer = randomnum1 * randomnum2;break;
    }

    result.push({
        'qno':count,
        'question': (randomnum1+" "+selectedOp+" "+randomnum2),
        'user Answer' : userAnswer,
        'correct Answer' : correctAnswer,
        'isCorrect' : userAnswer === correctAnswer 
    });

    if( userAnswer === correctAnswer){
        marks+=2;
        console.log(marks);
    }

    if (count==5) {
        timespan.innerHTML = minElement.innerHTML+':'+secElement.innerHTML;
        markspan.innerHTML = marks;
        setTableData();
        count = 0;
        reset();
    }else{
        createQuestion();
    }
}


const createQuestion = () =>{

    setQuestionNumber();
    
    randomnum1 = Math.floor(Math.random() * 100)+1;
    randomnum2 = Math.floor(Math.random() * 100)+1;
    
    num_1.innerHTML = randomnum1;
    num_2.innerHTML = randomnum2;

    selectedOp =  op [Math.floor(Math.random() * 4)];
    operator.innerHTML = selectedOp;

    answer.value="";
}

const setQuestionNumber = () =>{
    count++;
    questionNum.innerHTML=count;
    
}

const reset = ()=>{
    if(interval){
        clearInterval(interval);
    }
    minElement.innerHTML="00";
    secElement.innerHTML="00";
    questionNum.innerHTML=0;
}

const start= ()=>{
    result = [];
    marks = 0;
    table.innerHTML = "";
    answer.value="";
    timespan.innerHTML = "00:00";
    markspan.innerHTML = 0;
    countDown();
}

const countDown = () =>{
    
    createQuestion();

    if(interval){
        clearInterval(interval);
    }

    let sec = 0;
    let min = 0;

    interval = setInterval(() => {

        if (sec==59) {
            min++;
            sec = 0;
        }
        if(sec<10){
            secElement.innerHTML="0"+sec;
        }else{
            secElement.innerHTML=sec;
        }

        if(min<10){
            minElement.innerHTML="0"+min;
        }else{
            minElement.innerHTML=min;
        }

        sec++;

    }, 1000);
}
