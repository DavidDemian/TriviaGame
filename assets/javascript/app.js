$(document).ready(function () {

    var options = [{
        question: "Who won the 1994 FIFA World Cup?",
        choice: ["Italy", "Argentina", "Germany", "Brazil"],
        answer: 3,
        photo: "assets/images/brazil.jpg"
    }, {
        question: "Anfield is the home of which English Premier League club?",
        choice: ["Everton", "Liverpool", "Man UTD", "Arsenal"],
        answer: 1,
        photo: "assets/images/anfield.jpg"
    }, {
        question: "What are the home colors of the FC Barcelona soccer uniform?",
        choice: ["Orange and White", "Black and White", "Blue and Red"],
        answer: 2,
        photo: "assets/images/fcb.jpg"
    }, {
        question: "Which country has won the most FIFA World Cups?",
        choice: ["Italy", "Brazil", "Spain", "Argentina"],
        answer: 1,
        photo: "assets/images/brazillogo.png"
    }, {
        question: "Which country won the 2010 Africa Cup of Nations?",
        choice: ["Egypt", "Senegal", "Ghana", "Tunisia"],
        answer: 0,
        photo: "assets/images/egypt.jpg"
    }, {
        question: "Which nation’s football team won the FIFA World Cup in 2006?",
        choice: ["Italy", "Brazil", "Spain", "Argentina"],
        answer: 0,
        photo: "assets/images/italy.jpg"
    }, {
        question: "In April 2011 Louis van Gaal was sacked as coach of which European football club?",
        choice: ["Bayern Munich", "Arsenal", "Barcelona", "Schalke"],
        answer: 0,
        photo: "assets/images/bmfc.jpg"
    }];


    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];



    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
        $("#start").hide();
        $("#h2").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })
    //timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random() * options.length);
        pick = options[index];
        console.log(pick);
        console.log(pick.choice[pick.answer]);


        //iterate through answer array and display
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);

        }



        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }


    function hidepicture() {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 20;

            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Done!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 2000);


    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })

})