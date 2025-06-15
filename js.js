document.addEventListener("DOMContentLoaded", () => {

    const ready_go_sounds_slow = [
    'assets/audio/slow-ready-go/slow_readygo_00.mp3',
    'assets/audio/slow-ready-go/slow_readygo_01.mp3',
    'assets/audio/slow-ready-go/slow_readygo_02.mp3',
    'assets/audio/slow-ready-go/slow_readygo_03.mp3',
    'assets/audio/slow-ready-go/slow_readygo_04.mp3',
    'assets/audio/slow-ready-go/slow_readygo_05.mp3',
    'assets/audio/slow-ready-go/slow_readygo_06.mp3',
    'assets/audio/slow-ready-go/slow_readygo_07.mp3',
    'assets/audio/slow-ready-go/slow_readygo_08.mp3',
    'assets/audio/slow-ready-go/slow_readygo_09.mp3',
    'assets/audio/slow-ready-go/slow_readygo_10.mp3',
    'assets/audio/slow-ready-go/slow_readygo_11.mp3',

    ];

    const ready_go_slow_AudioObjects = ready_go_sounds_slow.map(src => new Audio(src));

    const ready_go_sounds_fast = [
        'assets/audio/fast-ready-go/Ready_Go_00.mp3',
        'assets/audio/fast-ready-go/Ready_Go_01.mp3',
        'assets/audio/fast-ready-go/Ready_Go_02.mp3',
        'assets/audio/fast-ready-go/Ready_Go_03.mp3',
        'assets/audio/fast-ready-go/Ready_Go_04.mp3',
        'assets/audio/fast-ready-go/Ready_Go_05.mp3',
        'assets/audio/fast-ready-go/Ready_Go_06.mp3',
        'assets/audio/fast-ready-go/Ready_Go_07.mp3',
        'assets/audio/fast-ready-go/Ready_Go_08.mp3',
        'assets/audio/fast-ready-go/Ready_Go_09.mp3',
        'assets/audio/fast-ready-go/Ready_Go_10.mp3',
        'assets/audio/fast-ready-go/Ready_Go_11.mp3',
        'assets/audio/fast-ready-go/Ready_Go_12.mp3'

    ];

    const ready_go_fast_AudioObjects = ready_go_sounds_fast.map(src => new Audio(src));

    const ready_go_sounds_go = [
    'assets/audio/solo-readygo/Go_00.mp3',
    'assets/audio/solo-readygo/Go_01.mp3',
    'assets/audio/solo-readygo/Go_02.mp3',
    'assets/audio/solo-readygo/Go_03.mp3',
    'assets/audio/solo-readygo/Go_04.mp3',
    'assets/audio/solo-readygo/Go_05.mp3',
    'assets/audio/solo-readygo/Go_06.mp3',
    'assets/audio/solo-readygo/Go_07.mp3',
    'assets/audio/solo-readygo/Go_08.mp3',
    'assets/audio/solo-readygo/Go_09.mp3'
    ];

    const ready_go_go_AudioObjects = ready_go_sounds_go.map(src => new Audio(src));


    function playSound(sourceArray )
    {
        const randomIndex = Math.floor(Math.random() * sourceArray.length)
        sourceArray[randomIndex].currentTime = 0;
        sourceArray[randomIndex].play();

        countdownTimer.textContent = "GO!";
        startButton.textContent = "GO!";
        startButton.classList.remove("red");
        startButton.classList.add("green");
    }

    const roundSelection = document.getElementById("rounds");
    const roundsOutput = document.getElementById("rounds-output");
    let numberOfRounds = 1;
    let chosenNumberOfRounds = numberOfRounds;

    const setupTimeSelection = document.getElementById("setup-time");
    const setupTimeOutput = document.getElementById("setup-time-output");
    let setupTime = 4;
    let chosenSetupTime = setupTime;
    
    const startTypeSelection = document.getElementById("start-type");
    const startTypeOutput = document.getElementById("start-type-output");
    let startType = "fast";
    let chosenStartType = startType ;

    const intervalTypeSelection = document.getElementById("interval-style");
    let selectedIntervalType = "fixed"
    let capitalizedSelectedIntervalType =  selectedIntervalType.charAt(0).toUpperCase() + selectedIntervalType.slice(1);
    const intervalTypeOutput = document.getElementById("interval-style-output");

    const fixedTimeSelection = document.getElementById("fixed-time");
    const fixedTimeLabel= document.getElementById("fixed-time-label");
    const timeOutput = document.getElementById("countdown-time-output");

    const randomTimeSelection = document.getElementById("random-time-max");
    const randomTimeLabel = document.getElementById("random-time-max-label")
    let randomCountdownTime = 1;

    const startButton = document.getElementById("start-button");
    const countdownTimer = document.getElementById("countdown-timer-display");

    const resetButton = document.getElementById("reset-button");

    let countdownTime = "3";
    let chosenCountdownTime = countdownTime;

    let isInLoopAlready = false;
    let countdownInterval = null;
    let preCountdownTimeout = null;

    let wakeLock = null;

        async function requestWakeLock() {
            try {
                if ('wakeLock' in navigator) {
                    wakeLock = await navigator.wakeLock.request('screen');
                    console.log('Wake Lock is active.');

                    // Re-apply lock if it’s released
                    wakeLock.addEventListener('release', () => {
                        console.log('Wake Lock was released');
                    });
                }
                else {
                    console.warn("Wake Lock API not supported. Your device may sleep during operation.");
                }
            } catch (err) {
                console.error(`Failed to activate Wake Lock: ${err.message}`);
            }
        }

    AddEventListeners();

    function AddEventListeners()
    {
        roundSelection.addEventListener('change', (e) => {
            roundsOutput.textContent = "Rounds Remaining: " + e.target.value;
            numberOfRounds = parseInt(e.target.value);
            chosenNumberOfRounds = numberOfRounds;
        });

        startTypeSelection.addEventListener('change', (e) => {
            startTypeOutput.textContent = "Start Type: " + e.target.value;
            startType  = e.target.value;
            chosenStartType = startType;
        })

        setupTimeSelection.addEventListener('change', (e) => {
            setupTimeOutput.textContent = "Setup Time: " + e.target.value + " Seconds";
            setupTime = parseInt(e.target.value);
            chosenSetupTime = setupTime;
        })

        intervalTypeSelection.addEventListener('change', (e) => {
            selectedIntervalType = e.target.value;

            if(selectedIntervalType === "fixed")
            {
                randomTimeSelection.classList.add("hidden");
                randomTimeLabel.classList.add("hidden");

                fixedTimeSelection.classList.remove("hidden");
                fixedTimeLabel.classList.remove("hidden");
            }
            else if (selectedIntervalType === "random")
            {
                randomTimeSelection.classList.remove("hidden");
                randomTimeLabel.classList.remove("hidden");

                fixedTimeSelection.classList.add("hidden");
                fixedTimeLabel.classList.add("hidden");
            }
            capitalizedSelectedIntervalType =  selectedIntervalType.charAt(0).toUpperCase() + selectedIntervalType.slice(1);
            intervalTypeOutput.textContent = "Interval Type: " + capitalizedSelectedIntervalType;
        });

        fixedTimeSelection.addEventListener('change', (e) => {
            timeOutput.textContent = "Countdown: " + e.target.value + " Seconds";
            countdownTime = parseInt(e.target.value);
            chosenCountdownTime = countdownTime;
        })

        randomTimeSelection.addEventListener('change', (e) => {
            timeOutput.textContent = "Countdown: Up To " + e.target.value + " Seconds"
            countdownTime = parseInt(e.target.value);
            chosenCountdownTime = countdownTime;
        })

        startButton.addEventListener("click", (e) => {   
            
            if(isInLoopAlready === false)
            {
                isInLoopAlready = true;
                requestWakeLock();
                PreCountdownBuffer();   
            }
                
        });

        resetButton.addEventListener("click", (e) => {
            ResetAll();
        })
    }

    function ResetAll()
    {
        if (wakeLock !== null) {
            wakeLock.release();
            wakeLock = null;
        }

        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }

        if(preCountdownTimeout) {
            clearTimeout(preCountdownTimeout);
            preCountdownTimeout = null;
        }

        numberOfRounds = chosenNumberOfRounds;
        countdownTime = chosenCountdownTime;
        setupTime = chosenSetupTime;
        startType = chosenStartType;

        countdownTimer.textContent = "--";
        roundsOutput.textContent = "Rounds Remaining: " + numberOfRounds;

        startButton.classList.remove("red", "green", "orange");
        startButton.classList.add("green");
        startButton.textContent = "START";

        isInLoopAlready = false;
    }

    function PreCountdownBuffer()
    {
        countdownTimer.textContent = "...";

        const delay = setupTime * 1000;

        if (selectedIntervalType === "random")
        {

            randomCountdownTime = Math.floor((Math.random() * countdownTime)) + 1;

            preCountdownTimeout = setTimeout(() => Countdown(randomCountdownTime), delay);
            //const buffer = setTimeout(Countdown(randomCountdownTime), setupTime * 1000);
        }
        else{
            preCountdownTimeout = setTimeout(() => Countdown(countdownTime), delay);
            //const buffer = setTimeout(Countdown(countdownTime), setupTime * 1000);
        }

        
        startButton.classList.remove("green");
        startButton.classList.add("orange");
        startButton.textContent = "SETUP";
    }

    function LastRoundCooldownBuffer()
    {
        numberOfRounds = chosenNumberOfRounds;
                    isInLoopAlready = false;
                    startButton.classList.remove("red");
                    roundsOutput.textContent = "Rounds Remaining: " + numberOfRounds;
                    startButton.textContent = "START";
    }

  

    function Countdown(finalCountdownTime)
    {
        startButton.classList.remove("orange");
        startButton.classList.add("red");
        startButton.textContent = "WAIT";
        numberOfRounds --;
        roundsOutput.textContent = "Rounds Remaining: " + (parseInt(numberOfRounds + 1));

        countdownTimer.textContent = finalCountdownTime;


       

        countdownInterval = setInterval(() => {

            finalCountdownTime--;
            countdownTimer.textContent = finalCountdownTime;

            if(finalCountdownTime <= 0) {

                clearInterval(countdownInterval); // stop the timer
                countdownInterval = null;
                countdownTime = chosenCountdownTime;
                        
       

                if(startType === "fast")
                {
                    playSound(ready_go_fast_AudioObjects);
                }
                else if (startType === "slow")
                {
                    playSound(ready_go_slow_AudioObjects);
                }
                else
                {
                    playSound(ready_go_go_AudioObjects);
                }
                        
                

                if (numberOfRounds > 0)
                {
                            
                    preCountdownTimeout = setTimeout(() => PreCountdownBuffer(), 3000);
                }
                else
                {
                    preCountdownTimeout = setTimeout(() => LastRoundCooldownBuffer(), 3000);
                   
                   
                }

            }
        }, 1000);
    }
})