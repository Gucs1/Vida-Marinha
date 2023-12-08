//selecionando todos os elementos
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// se o botão startQuiz for clicado
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //mostra caixa de informações
}

// se o botão exitQuiz for clicado
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //oculta caixa de informações
}
// se o botão continuarQuiz for clicado
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //oculta caixa de informações
    quiz_box.classList.add("activeQuiz"); //mostra caixa de quiz
    showQuetions(0); //Chama a função showQestions
    queCounter(1); //passando 1 parâmetro para queCounter
    startTimer(15); //Chama a função startTimer
    startTimerLine(0); //Chama a função startTimerLine
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// se o botão restartQuiz for clicado
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //mostra caixa de quiz
    result_box.classList.remove("activeResult"); //oculta a caixa de resultados
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //Chama a função showQestions
    queCounter(que_numb); //passando o valor que_numb para queCounter
    clearInterval(counter); //limpa contador
    clearInterval(counterLine);//limpa counterLine
    startTimer(timeValue); //Chama a função startTimer
    startTimerLine(widthValue); //Chama a função startTimerLine
    timeText.textContent = "Tempo restante"; //muda o texto de timeText para Time Left
    next_btn.classList.remove("show"); //oculta o próximo botão
}

// se o botão quitQuiz for clicado
quit_quiz.onclick = ()=>{
    window.location.reload(); //recarrega a janela atual
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// se o botão Próxima Que for clicado
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //se a contagem de perguntas for menor que o comprimento total da pergunta
        que_count++; //incrementa o valor que_count
        que_numb++; //incrementa o valor que_numb
        showQuetions(que_count); //Chama a função showQestions
        queCounter(que_numb); //passa o valor que_numb para queCounter
        clearInterval(counter); //Limpa counter
        clearInterval(counterLine); //Limpa counterLine
        startTimer(timeValue); //Chama a função startTimer
        startTimerLine(widthValue); //Chama a função startTimerLine
        timeText.textContent = "Tempo restante";//muda o timeText para Tempo restante
        next_btn.classList.remove("show"); //oculta o próximo botão
    }else{
        clearInterval(counter); //Limpa counter
        clearInterval(counterLine); //Limpa counterLine
        showResult(); //chamando a função showResult
    }
}

//obtendo perguntas e opções do array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

   //criando uma nova tag span e div para pergunta e opção e passando o valor usando o índice do array
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adicionando nova tag span dentro de que_tag
    option_list.innerHTML = option_tag; //adicionando nova tag div dentro de option_tag
    
    const option = option_list.querySelectorAll(".option");

    // define o atributo onclick para todas as opções disponíveis
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
//criando as novas tags div para ícones
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//se o usuário clicou na opção
function optionSelected(answer){
    clearInterval(counter); //Limpa counter
    clearInterval(counterLine); //Limpa counterLine
    let userAns = answer.textContent; //obtendo a opção selecionada pelo usuário
    let correcAns = questions[que_count].answer; //obtendo a resposta correta do array
    const allOptions = option_list.children.length; //obtendo todos os itens de opção
    
    if(userAns == correcAns){ //se a opção selecionada pelo usuário for igual à resposta correta do array
        userScore += 1; //atualizando o valor da pontuação com 1
        answer.classList.add("correct"); //Adiciona cor verde para corrigir a opção selecionada
        answer.insertAdjacentHTML("beforeend", tickIconTag); //Adiciona ícone de marca para corrigir a opção selecionada
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //Adiciona cor vermelha para corrigir a opção selecionada
        answer.insertAdjacentHTML("beforeend", crossIconTag); //Adiciona ícone de cruz para corrigir a opção selecionada
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //se houver uma opção que corresponda a uma resposta de array
                option_list.children[i].setAttribute("class", "option correct"); //Adiciona cor verde à opção correspondente
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //Adiciona ícone de marca à opção correspondente
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //uma vez que o usuário seleciona uma opção, desativa todas as opções
    }
    next_btn.classList.add("show"); //mostra o próximo botão se o usuário tiver selecionado alguma opção
}

function showResult(){
    info_box.classList.remove("activeInfo"); //oculta caixa de informações
    quiz_box.classList.remove("activeQuiz"); //ocultar caixa de teste
    result_box.classList.add("activeResult"); //mostra caixa de resultado
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // se o usuário acertou mais de 3
        //criando uma nova tag span e passando o número da pontuação do usuário e o número total da pergunta
        let scoreTag = '<span>Perfeito! 🎉, você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adicionando nova tag span dentro de score_Text
    }
    else if(userScore > 1){ // se o usuário acertou mais de 1
        let scoreTag = '<span>Parabéns 😎, Você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // se o usuário não acertou nenhuma
        let scoreTag = '<span>Treine mais 😐, Você so acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //alterando o valor de timeCount com valor de tempo
        time--; //decrementa o valor do tempo
        if(time < 9){ //se o timer for menor que 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //adiciona um 0 antes do valor do tempo
        }
        if(time < 0){ //se o timer for menor que 0
            clearInterval(counter); //Limpa counter
            timeText.textContent = "Fim do tempo"; 
            const allOptions = option_list.children.length; //obtendo todos os itens de opção
            let correcAns = questions[que_count].answer; //obtendo a resposta correta do array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //se houver uma opção que corresponda a uma resposta de array
                    option_list.children[i].setAttribute("class", "option correct"); //adicionando cor verde à opção correta
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);  //adicionando ícone de marca à opção correspondente
                    console.log("Fim do tempo: resposta correta selecionada automaticamente.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //uma vez que o usuário seleciona uma opção, desativa todas as opções
            }
            next_btn.classList.add("show"); //mostra o próximo botão se o usuário tiver selecionado alguma opção
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //atualizando o valor do tempo com 1
        time_line.style.width = time + "px"; //aumentando a largura de time_line com px por valor de tempo
        if(time > 549){ //se o valor do tempo for maior que 549
            clearInterval(counterLine); //limpa counterLine
        }
    }
}

function queCounter(index){
    //criando uma nova tag span e passando o número da pergunta e o total da pergunta
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ questions.length +'</p> perguntas</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adicionando nova tag span dentro de bottom_ques_counter


}