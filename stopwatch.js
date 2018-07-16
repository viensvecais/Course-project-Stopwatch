//stopwatch.js
$(function(){
    //variables
var mode = 0;//App mode
var timeCounter = 0;//time counter
var lapCounter = 0;//lap counter
var action;//variable for setInterval
var lapNumber = 0;//Number of Laps
        //minutes,seconds,centiseconds for time and lap
var timeMinutes, timeSeconds, timeCSec, lapMinutes, lapSeconds, lapCSec;
    //On App load show start and lap buttons
    hideShowButtons("#startButton", "#lapButton");
    //click on startButton
    $("#startButton").click(function(){
        //mode on
        mode = 1;
        //show stop and lap buttons
        hideShowButtons("#stopButton", "#lapButton");
        //start counter
        startAction();
    });
    
    //click on stopButton
    $("#stopButton").click(function(){
        //show resume and reset buttons
        hideShowButtons("#resumeButton","#resetButton");
        //stop counter
        clearInterval(action);
    });
        
    //click on resumeButton
    $("#resumeButton").click(function(){
        //show stop and lap buttons
        hideShowButtons("#stopButton", "#lapButton")
        //start counter
        startAction();
    });
        
    //click on resetButton
    $("#resetButton").click(function(){
        //reload the page
        location.reload();
    });
    
    //click on lapButton
    $("#lapButton").click(function(){
        if(mode){
            //if mode is ON
            //stop action
            clearInterval(action);
            //resetLap and print lap details
            lapCounter = 0;
            addLap();
            //start action
            startAction();
        }
    });
        
            
            
            
    
    //functions
    //hideshowButtons function shows two buttons
    function hideShowButtons(x,y){
        $(".btn").hide();
        $(x).show();
        $(y).show();
    };
    //start the counter
    function startAction(){
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 60*100*100){
                timeCounter=0;
            }
            lapCounter++;
            if(lapCounter == 60*100*100){
                lapCounter = 0;
            }
            updateTime();
        },10);
    };
    //updateTime: converts counters to min,sec,centisec
    function updateTime(){
        //1min=60*100centiseconds=6000centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        //1sec=100centiseconds
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCSec = (timeCounter%6000)%100;
        $("#timeMin").text(format(timeMinutes));
        $("#timeSec").text(format(timeSeconds));
        $("#timeCSec").text(format(timeCSec));
        //1min=60*100centiseconds=6000centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        //1sec=100centiseconds
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapCSec = (lapCounter%6000)%100;
        $("#lapMin").text(format(lapMinutes));
        $("#lapSec").text(format(lapSeconds));
        $("#lapCSec").text(format(lapCSec));
    }

    //format numbers (always 2 digits)
    function format(num){
        if(num<10){
            return "0" + num;
        }else{
            return num;
        }
    }
    //addLap function: print lap details inside the lap box
    function addLap(){
        lapNumber++;
        var myLapDetails = 
            "<div class='lap'>" +
                "<div class='lapTimeTitle'>" +
                    "Lap " + lapNumber + 
                "</div>" +
                "<div class='lapTime'>" +
                    "<span>" + format(lapMinutes) + "<span>" + 
                    ":<span>" + format(lapSeconds) + "<span>" + 
                    ":<span>" + format(lapCSec) + "<span>" + 
                "</div>" +
            "</div>";
        $(myLapDetails).prependTo("#laps");
    };
});