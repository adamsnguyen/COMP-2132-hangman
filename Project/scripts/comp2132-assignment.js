//Hangman Project Script

let asgnNum = "Hangman Project";

//Update Assignment # Headings
var elements = document.getElementsByClassName("asgnNum");

for (var i = 0; i < elements.length; i++) {
    elements[i].innerHTML = asgnNum;
}

var words = ["donuts", "beer", "nuclear", "treehouse", "clown", "pizza", "nerd", "radical", "elephant", "burger", "shorts"];

var chosenWord;
var chosenWordLetters = [];
var guessedLetters = [];
var gameStarted = false;
var letter;
var correctNumberCount = 0;
var incorrectNumberCount = 0;

let homerInterval;
var homerPosition = 0; 

//Play starts new game
$("#play-button").click(function () {
    runHomer();
    
    gameStarted = true;

    //Reset Variables
    chosenWord = words[Math.floor(Math.random() * words.length)];
    chosenWordLetters = [];
    guessedLetters = [];
    correctNumberCount = 0;
    incorrectNumberCount = 0;

    //Reset Homer
    for(var i = 1; i <=6;i++){
        $("#homer" + i).css("opacity", "0");
    }

    //Create/Fill chosen word letter array
    for (var i = 0; i < chosenWord.length; i++) {
        chosenWordLetters.push(chosenWord.charAt(i).toUpperCase());
    }

    //Change error text to red
    $("#error").css("color", "red");

    //Restart
    for (var i = 0; i < 10; i++) {
        $("#letter-" + i).text('?');
        $("#letter-" + i).css("background-color", "lightgrey");
    }

    //Hide extra letters
    for (var i = chosenWord.length; i < 10; i++) {
        $("#letter-" + i).css("background-color", "#f1e4de");
        $("#letter-" + i).text('');
    }

    //Clear the letter bank text output
    $("#letter-bank").text('');

    //Clear error/win messages
    $("#error").text('');
    

});

//Game Logic:

//Press submit button to submit letter
$("#submit-button").click(function () {
    submitLetter();
    $("#letter-guess").val('');
});

//Pressing Enter key in text input box to submit letter
$('#letter-guess').on('keypress', function (e) {
    if (e.which === 13) {
        submitLetter();
        $("#letter-guess").val('');
    }
});

//The long logic of submitting a letter...
function submitLetter() {
    
    if (gameStarted) {
        letter = $("#letter-guess").val().toUpperCase();

        //Already guessed letter?
        if (guessedLetters.includes(letter)) {
            $("#error").text("Doh! Already Guessed!");
        }

        //Is it a letter?
        if (!isalpha(letter)) {
            $("#error").text("Doh! Not a Letter!");
        }

        //If it is a letter and haven't yet been guessed...
        if (!guessedLetters.includes(letter) && isalpha(letter)) {
            
            //Clear error message
            $("#error").text('');
            
            //Add letter to text output and letter bank
            addLetter(letter);

            //If letter is correct, find letterbox and add, and increment correctNumberCount
            for (var i = 0; i < chosenWord.length; i++) {

                if (chosenWordLetters[i] == letter) {
                    $("#letter-" + i).text(letter.toUpperCase());
                    $("#letter-" + i).css("background-color", "teal");
                    correctNumberCount++;
                }
            }

            //If a wrong letter, then increase wrong count and make next picture of Homer visible 
            if (!chosenWordLetters.includes(letter.toUpperCase())) {
                incorrectNumberCount++;
                $("#homer" + incorrectNumberCount).css("opacity", "1");
            }
        }

        //Check if player wins
        if (correctNumberCount == chosenWord.length) {
            $("#error").css("color", "darkgreen");
            $("#error").text("Woohoo! You Win!");
            gameStarted = false;

        }

        //Check if player loses
        if (incorrectNumberCount == 6) {
            $("#error").text("Doh! No More Guesses. You Lose :(");

            //"turn off" game
            gameStarted = false;

            //Reveal Answer
            for (var i = 0; i < chosenWord.length; i++) {

                $("#letter-" + i).text(chosenWordLetters[i]);
                $("#letter-" + i).css("background-color", "red");

            }

        }
    } 
    //Remind player to press the play button if haven't done so but submitting a letter 
    else {
        $("#error").text("Doh! Press the Play Button to Start New Game!");
    }

}


//A function that uses regex to return a boolean of whether input is alpha or not
function isalpha(char) {
    return /^[A-Z]$/i.test(char);
}

//Add letter to letter bank text output and guessedLetters array
function addLetter(char) {
    if (gameStarted && isalpha(char)) {
        guessedLetters.push(char.toUpperCase());
        $("#letter-bank").append(char.toUpperCase());
    };
}

//Running homer animation
function runHomer(){

        homerInterval = setInterval(function(){

            document.getElementById('running-homer').style.right = `${homerPosition++}%`;

            if(homerPosition==100){
                clearInterval(homerInterval);
                homerPosition=-100;
            }

        }, 25)


    
}