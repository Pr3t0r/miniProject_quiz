/*************Kvíz játék*************
 * 
 * A játék 5 véletlenszerű kérdést tesz fel. Kiírja a lehetséges válaszokat a játékos válaszhat 1-et.
 * Folyamatosan kiírja, hogy hányadik kérdésnél járunk.
 * Miután elfogytak a kérdések, a játék véget ér és kiértékelődik. Gombnyomásra részletesen végigmehetünk a kérdéseken és megjelennek játékos válaszai megjelölve a jó válaszokkal.
 * Gombnyomásra a játék újrakezdhető.
 * 
 * RANDOMIZÁLNI a kérdéseket és a válaszokat
 * 
 * clean code
 * 
 */

const arrQuestions = [
     {
        question: 'Mi spanyolország fővárosa?',
        answers: ['Andorra', 'Barcelona', 'Madrid'],
        correct: 'Madrid'
     },
     {
        question: 'Melyik elemnek áll két betűből a vegyjele?',
        answers: ['Szén', 'Nitrogén', 'Alumínium', 'Oxigén'],
        correct: 'Alumínium'
     },
     {
        question: 'Hány liter sört tudsz beletölteni egy 1 köbméter űrtartalmú tartályba?',
        answers: ['10 litert', '100 litert', '1000 litert'],
        correct: '1000 litert'
     },
     {
        question: 'Melyik városnév, nem ugyanazt a várost jelöli?',
        answers: ['Konstantinápoly', 'Isztambul', 'Alexandria'],
        correct: 'Alexandria'
     },
     {
        question: 'Hány nap, míg a tojásból csibe lesz?',
        answers: ['28', '21', '56'],
        correct: '21'
     },
     {
        question: 'A Dunánál című vers, melyik magyar költőnk verse?',
        answers: ['Petőfi Sándor', 'József Attila', 'Arany János', 'Radnóti Miklós'],
        correct: 'József Attila'
     },
     {
        question: 'A felsoroltak közül, melyik gomba ehető?',
        answers: ['Sárga rókagomba', 'Fehér Galóca', 'Citromgalóca'],
        correct: 'Sárga rókagomba'
     },
     {
        question: 'A Föld, hányadik bolygó a Naptól számítva?',
        answers: ['Második', 'Harmadik', 'Negyedik'],
        correct: 'Harmadik'
     },
     {
        question: 'Melyik a legnagyobb szám a felsoroltak közül?',
        answers: [-10, 'Nulla', -1],
        correct: 'Nulla'
     },
]

var DOMelements, data, questionCounter, radioData, radioStatus, radioLabel, answerID;
var game; // 0 = game mode | 1 = result mode

DOMelements = {
   question: document.getElementById('question'),
   container: document.querySelector('.quiz__container'),
   btn__submit: document.querySelector('.btn__submit'),
   answers: document.querySelector('.answers'),
   p__counter: document.getElementById('question__counter'),
   start: document.querySelector('.btn__start'),
   result: document.querySelector('.btn__result'),
   h1: document.getElementById('question'),
   p__score: document.getElementById('score'),

}

DOMelements.answers.addEventListener('click', function (e) {
   
   answerID = e.target.parentNode.childNodes[1].id;
   answerID = answerID.replace('answer-',"");
   answerID = parseInt(answerID);

});

DOMelements.start.addEventListener('click', playGame);

DOMelements.result.addEventListener('click', result);

DOMelements.btn__submit.addEventListener('click', function(){


   switch (game) {
      case 0:
         getRadioStatus();
      
         if (isChecked()) {
             
            if (questionCounter < arrQuestions.length) {
               
               addScore();
               delQuiz();
               DOMelements.p__score.innerText = data.score.correct;
               questionCounter++;
               
               if (isGameOver()) {
                  
               }

               if (questionCounter < arrQuestions.length) {
                  nextQuestion();
               }
      
            } 
         } 

         break;
      case 1 :
         
         delQuiz();
         questionCounter++;
         if (isGameOver()) {
                  
         }
         if (questionCounter < arrQuestions.length) {
            nextQuestion();
            disableRadio();
            if (data.playerAnswers.string[questionCounter] === arrQuestions[questionCounter].correct) {
               removeFormatting();
               document.getElementById(`num-${arrQuestions[questionCounter].answers.indexOf(arrQuestions[questionCounter].correct)}`).classList.add('correct');
            } else {
               removeFormatting();
               document.getElementById(`num-${data.playerAnswers.id[questionCounter]}`).classList.add('incorrect');
               document.getElementById(`num-${arrQuestions[questionCounter].answers.indexOf(arrQuestions[questionCounter].correct)}`).classList.add('correct');
               
            }
         }
         
         
         
   }

});


//----------------------FUNCTIONS-------------------

function playGame() {
   
   data = {
      score: {
         correct: 0,
         incorrect: 0,
      },
      playerAnswers: {
         string: [],
         id: [],
      }
   }

   game = 0;

   init();
   DOMelements.btn__submit.innerText = "Submit";

}

function result(){
   
   game = 1;

   init();
   DOMelements.btn__submit.innerText = "Next";

   disableRadio();
         
         if (data.playerAnswers.string[questionCounter] === arrQuestions[questionCounter].correct) {
            removeFormatting();
            document.getElementById(`num-${arrQuestions[questionCounter].answers.indexOf(arrQuestions[questionCounter].correct)}`).classList.add('correct');
         } else {
            removeFormatting();
            document.getElementById(`num-${data.playerAnswers.id[questionCounter]}`).classList.add('incorrect');
            document.getElementById(`num-${arrQuestions[questionCounter].answers.indexOf(arrQuestions[questionCounter].correct)}`).classList.add('correct');
            
         }

}

function init() {
   
   DOMelements.btn__submit.disabled = false;

   questionCounter = 0;

   DOMelements.answers.style.display = "block";
   DOMelements.start.style.display = "none";
   DOMelements.result.style.display = "none";
   DOMelements.h1.style.display ="block";
   DOMelements.btn__submit.style.display ="block";
   DOMelements.p__counter.style.display = "block";
   DOMelements.p__score.style.display = "block";

   DOMelements.p__counter.innerText = `${questionCounter+1} / ${arrQuestions.length}`;

   nextQuestion();


}

function nextQuestion(){

      DOMelements.p__counter.innerText = `${questionCounter+1} / ${arrQuestions.length}`
      DOMelements.p__score.innerText = data.score.correct;

      addQuiz();
  
}

function getRadioStatus(){
   radioData = {
      radioStatus: [],
      radioLabel: [],
      radioID: [],

   }
   temp = document.querySelectorAll('.radio');
   temp.forEach(function (el){
      radioData.radioStatus.push(el.checked);
      radioData.radioLabel.push(el.nextSibling.innerText); 
      radioData.radioID.push(parseInt(el.id.replace('radio-',"")));
      
   });
   return radioData;
}

function getAnswer(){
   var x = radioData.radioStatus.indexOf(true);
   var y = radioData.radioLabel[x];
   data.playerAnswers.string.push(y);
   data.playerAnswers.id.push(answerID);
   
   //data.playerAnswers.id.push(document.querySelectorAll('.radio')[x].id.replace('radio-',""));

   return radioData.radioLabel[x];
}

function isChecked() {
   if(radioData.radioStatus.indexOf(true) === -1) {
      return false;
   } else {
      return true;
   }   
}

function addScore() {
   if (getAnswer() === arrQuestions[questionCounter].correct) {
      data.score.correct += 1;
   } else {
      data.score.incorrect += 1;
   }

}

function isGameOver() {
   if (questionCounter === arrQuestions.length) {      
      DOMelements.btn__submit.innerText = "A JÁTÉK VÉGETÉRT";
      
      DOMelements.start.style.display = "block";
      DOMelements.result.style.display = "block";

      DOMelements.btn__submit.disabled = true;


      return true;
   } 
   return false;
}

function addQuiz() {
   
   var html, newHtml;

   //<li class="lista" id="num-0"><input type="radio" class="radio" id="radio-0" name="answer" ><label class="label" for="radio-0" id="answer-0"></label></li>

   html = '<li class="lista" id="$numid$"><input type="radio" class="radio" id="$inputid$" name="answer" ><label class="label" for="$inputid2$" id="$labelid$"></label></li>';

   for (var i = 0; i < arrQuestions[questionCounter].answers.length; i++) {

      newHtml = html.replace("$inputid$", `radio-${i}`);
      newHtml = newHtml.replace("$numid$", `num-${i}`);
      newHtml = newHtml.replace("$inputid2$", `radio-${i}`);
      newHtml = newHtml.replace("$labelid$", `answer-${i}`);


      // válaszok kiírása
      DOMelements.answers.insertAdjacentHTML('afterbegin', newHtml);
      document.getElementById(`answer-${i}`).innerText = arrQuestions[questionCounter].answers[i];
      
      //console.log(`${arrQuestions[questionCounter].answers[i]} ::: ${i} ::: `)
   };
   // kérdés kiírása
   DOMelements.question.innerText = arrQuestions[questionCounter].question;

}

function delQuiz() {

   for (var i = arrQuestions[questionCounter].answers.length-1; i >= 0; i--) {
      DOMelements.answers.removeChild(DOMelements.answers.childNodes[i]);
      //console.log(`${arrQuestions[questionCounter].answers[i]} ::: ${i} ::: `)
   };
   DOMelements.question.innerText = "";
}

function disableRadio() {
   for (var i = 0; i < document.querySelector(".answers").getElementsByTagName("li").length ; i++) {
      document.getElementById(`radio-${i}`).disabled = true;
   }
}

function enableRadio() {
   for (var i = 0; i < document.querySelector(".answers").getElementsByTagName("li").length ; i++) {
      document.getElementById(`radio-${i}`).disabled = false;
   }
}

function removeFormatting() {
   
   for (var i = 0; i < document.querySelector(".answers").getElementsByTagName("li").length ; i++) {
      document.querySelectorAll('li')[i].classList.remove('.correct');
      document.querySelectorAll('li')[i].classList.remove('.incorrect');
   }

}


