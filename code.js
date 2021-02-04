const createFlash = document.getElementById("new_card");
const questionInput = document.getElementById("question-input");
const answerInput = document.getElementById("answer-input");
const flashCardList = document.getElementById("item-container");
const feedback = document.getElementById("feedback");
const clear = document.querySelector("#clear-list");
let flashCardItems = [];

//handle complete/edit/delete buttons
const configButtons = function(itemBox){
    const items = flashCardList.querySelectorAll(".item");
    items.forEach(function(item){
        console.log(itemBox);
        if(item.querySelector(".question").textContent === itemBox.question){
            //Show/Hide Answer event listener
             item.querySelector(".item-show").addEventListener('click', function(){
                var answer = item.querySelector(".answer");
                if (answer.style.display === "block") {
                    answer.style.display = "none";
                } else {
                    answer.style.display = "block";
                }
             });
            //Edit event listener
            item.querySelector(".item-edit").addEventListener('click', function(){
                answerInput.value = itemBox.answer;
                questionInput.value = itemBox.question;
                flashCardList.removeChild(item);
                flashCardItems = flashCardItems.filter(function(item){
                   return item !== itemBox; 
                });
            });
            //Delete event listener
            item.querySelector(".item-delete").addEventListener('click', function(){
                flashCardList.removeChild(item);
                flashCardItems = flashCardItems.filter(function(item){
                    return item !== itemBox;
                });
                setLocalStorage(flashCardItems);
            });
        };
    });
};

//generate the to-do items list
const generateList = function(flashCardItems){
    flashCardList.innerHTML = '';
    flashCardItems.forEach(function(item){
        flashCardList.insertAdjacentHTML('afterbegin', `<div class="item">
                <p class="question">${item.question}</p><hr><p class="answer">${item.answer}</p><button class="item-show item-button">Show/Hide Answer</button><button class="item-edit item-button">Edit</button> <button class="item-delete item-button">Delete</button>
            </div>`);
        configButtons(item);
    });

};

//get local storage to access items so if the page is refreshed, you don't lose the flashcards
const getLocalStorage = function (){
    const storage = localStorage.getItem('flashCardItems');
    const comp = localStorage.getItem('complete');
    if (storage === 'undefined' || storage === null){
        flashcardItems = [];
    }
    else{
        flashCardItems = JSON.parse(storage);
        generateList(flashCardItems);
    }
};

//set local storage to hold items so if the page is refreshed, you don't lose the flashcards
const setLocalStorage = function (flashCardItems){
    localStorage.setItem('flashCardItems', JSON.stringify(flashCardItems));
};

//local storage from page
getLocalStorage();

//add item to the list
createFlash.addEventListener('submit', function(event){ 
    event.preventDefault();
    const questionContent = questionInput.value;
    const answerContent = answerInput.value;
    if (questionContent.length === 0 || answerContent.length === 0){
        feedback.style.display = "block";
        setTimeout(
            function(){
                feedback.style.display = "none";
                }, 1000);
    } 
    else {
        const flashCardContent = {
            question: questionContent,
            answer: answerContent
        }
        flashCardItems.push(flashCardContent);
        console.log(flashCardItems);
        generateList(flashCardItems);
        setLocalStorage(flashCardItems);
    }
    answerInput.value = '';
    questionInput.value = '';
    });

//clear items from entire list
clear.addEventListener('click', function (){
    toDoItems = [];
    localStorage.clear();
    generateList(toDoItems);
})