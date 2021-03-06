const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}
//if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

const next_btn = document.querySelector(".next_btn");
const back_btn = document.querySelector(".back_btn");

//if continueQuiz button clicked
continue_btn.onclick = ()=>{
    start_btn.remove();
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    next_btn.style.opacity=1;
    back_btn.style.opacity=1;
    document.querySelector(".timer").style.opacity=1;
}
   let que_count = 0;
   let que_numb = 1;
   let userScore = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    let con=document.querySelector(".content");
    con.style.opacity=1; //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    showQuetions(que_count); //calling showQestions function
}
// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

// if Next Que button clicked
next_btn.onclick = ()=>{
        if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
}
}

let finish_btn=document.querySelector(".timer .finish")
finish_btn.onclick = ()=>{
    result_box.classList.add("activeResult");
    showResult();
    let con=document.querySelector(".content");
    con.style.opacity=0;
}

back_btn.onclick = ()=>{
    if(que_count>=0)
    {
        que_count--; //decrement the que_count value
        que_numb--; //decrement the que_numb value
        showQuetions(que_count); //calling showQestions function
    }
}
// // getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span> (a) '+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span> (b) '+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span> (c) '+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span> (d) '+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");
    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }

}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fa fa-check" aria-hidden="true"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fa fa-times" aria-hidden="true"></i></div>';
//if user clicked on option
function optionSelected(answer){
    // clearInterval(counter); //clear counter
    // clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    userAns=userAns.split(") ")[1];
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent.split(") ")[1] == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}
function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 7){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<div>Congratulations Man!!</div>  <div>You got <span>'+ userScore +'</span> out of <span>'+ questions.length +'</span></div>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<div>Nice Job!!</div> <div>You got <span>'+ userScore +' </span> out of <span>'+ questions.length +'</span></div>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<div>Better Luck Next Time!!</div> <div>You got only <span>'+ userScore +' </span> out of <span>'+ questions.length +'</span></div>';
        scoreText.innerHTML = scoreTag;
    }
}
function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index;
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}
