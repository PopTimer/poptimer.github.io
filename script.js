var  JS = {};
JS.timer = {
    number: document.querySelector('.userTime').value,
    initial_number: document.querySelector('.userTime').value,
    interval: "",
    flg_pause: false,
    bar_parts: 0,
    times: 0,
    qtd_exercises: 0,
    count_exercises: 1,
    initial_exercises: 1,
    qtd_times: 0,
    count_times: 1,
    initial_times: 1,
    rest_time: document.querySelector('.restTime').value,
    counter: true,
    init: function() {
        document.querySelector('.counterBg').classList.remove('yellow');
        document.querySelector('.counterBg').classList.add('red');
        JS.timer.counter = true;
        this.count();
    },
    formatTimes: function() {
        return  JS.timer.count_times.toString() + "/" + JS.timer.initial_times.toString();
    },
    formatExercises: function() {
        return  JS.timer.count_exercises.toString() + "/" + JS.timer.initial_exercises.toString();
    },
    formatSeconds: function(seconds) {
        if (seconds >= 3600) { 
            return new Date(seconds * 1000).toISOString().substr(11, 8);
        } else if (seconds >= 60) {
            return new Date(seconds * 1000).toISOString().substr(14, 5);
        } else {
            return seconds;
        }
    },
    initialLayoutCounter: function() {
        JS.timer.initial_number = document.querySelector('.userTime').value;
        JS.timer.initial_exercises = document.querySelector('.exercises').value;
        JS.timer.initial_times = document.querySelector('.times').value;
        document.querySelector('#insertTimer').style.display = "none";
        document.querySelector('.message-error').style.display = "none";
        document.querySelector('.controlTimer').style.display = "block";
        document.querySelector('.counterBg').style.display = "block";
        document.querySelector('.counterInfo').style.display = "flex";
        //document.querySelector('.valueTimer').innerHTML = this.formatSeconds(document.querySelector('.userTime').value);
        document.querySelector('.valueTimes').innerHTML = this.formatTimes();
        document.querySelector('.valueExercises').innerHTML = this.formatExercises();
        JS.timer.qtd_times = Number(document.querySelector('.times').value);
        JS.timer.qtd_exercises = Number(document.querySelector('.exercises').value);
        if(!JS.timer.counter) {
            this.number = document.querySelector('.restTime').value;
            document.querySelector('.valueTimer').innerHTML = this.formatSeconds(document.querySelector('.restTime').value);
        } else {
            this.number = document.querySelector('.userTime').value;
            document.querySelector('.valueTimer').innerHTML = this.formatSeconds(document.querySelector('.userTime').value);
        }
        JS.timer.configBar(this.number);
    },
    rest: function() {
        this.initialLayoutCounter();
        JS.timer.counter = false;
        JS.timer.number = JS.timer.rest_time;
        document.querySelector('.counterBg').classList.add('yellow');
        JS.timer.interval = setInterval(function() { 
            if(!JS.timer.flg_pause) { 
                JS.timer.substrate(); 
            } }, 1000);
        clearInterval(JS.timer.interval);
    },
    count: function() {
        let validForm;
        validForm = this.valid();
        if(validForm) {
            this.initialLayoutCounter();
            JS.timer.interval = setInterval(function() { 
                if(!JS.timer.flg_pause) { 
                    JS.timer.substrate(); 
                } }, 1000);
        } else {
            document.querySelector('.message-error').style.display = "block";
        }
    },
    substrate: function() {
        if (this.number > 0) {
            this.number = this.number - 1;
            if (JS.timer.counter == false && this.number <= 3) {
                var audio = new Audio('beginCount.wav');
                audio.play();
            }
            document.querySelector('.userTime').value = this.number;
            document.querySelector('.valueTimer').innerHTML = this.formatSeconds(this.number);
            document.querySelector('.barTimer div').style.width = (parseFloat(document.querySelector('.barTimer div').style.width) + JS.timer.bar_parts) + "%";
        } else {
            if(JS.timer.times <= 0) {
                if(JS.timer.counter == true) {
                    var audio = new Audio('boxingBell.mp3');
                    audio.play();
                }
                this.stopTimer();
            } else {
                JS.timer.times = JS.timer.times - 1;
                JS.timer.number = this.initial_number;
                this.count();
            }

        }
    },
    configBar: function(number) {
        JS.timer.bar_parts = 100/number;
        document.querySelector('.barTimer div').style.width = 0;
    },
    valid: function() {
        if(document.querySelector('.userTime').value == 0) {
            return false;
        } 
        
        if(document.querySelector('.userTime').value >= 86400) {
            return false;
        }
        return true;
    },
    pauseTimer: function() {
        if(!JS.timer.flg_pause) {
            JS.timer.flg_pause = true;
        } else {
            JS.timer.flg_pause = false;
        }
    },
    initialLayout: function() {
        document.querySelector('#insertTimer').style.display = "block";
        document.querySelector('.counterBg').style.display = "none";
        document.querySelector('.counterInfo').style.display = "none";
        document.querySelector('.controlTimer').style.display = "none";
        document.querySelector('.userTime').value = 0;
        JS.timer.flg_pause = false;
        clearInterval(JS.timer.interval);
        document.querySelector('.userTime').value = JS.timer.initial_number;
    },
    stopTimer: function() {
        this.initialLayout();
        if(JS.timer.count_times == JS.timer.qtd_times) {
            JS.timer.count_times = 1;

            if(JS.timer.count_exercises >= JS.timer.qtd_exercises) {
                JS.timer.count_exercises = 1;
                document.querySelector('.counterBg').classList.remove('red');
            } else {
                this.count_exercises = this.count_exercises + 1;
                if(JS.timer.counter == true) {
                    console.log("a")
                    JS.timer.counter = false;
                    document.querySelector('.counterBg').classList.remove('red');
                    document.querySelector('.counterBg').classList.add('yellow');
                    JS.timer.number = JS.timer.rest_time;
                    
                } else {
                    console.log("b")
                    JS.timer.counter = true;
                    document.querySelector('.counterBg').classList.remove('yellow');
                    document.querySelector('.counterBg').classList.add('red');

                }

                this.count();
            }
        } else {
            if(JS.timer.counter == true) {
                console.log("c")
                JS.timer.counter = false;
                document.querySelector('.counterBg').classList.remove('red');
                document.querySelector('.counterBg').classList.add('yellow');
                JS.timer.number = JS.timer.rest_time;
            } else {
                console.log("d")
                JS.timer.counter = true;
                this.count_times = this.count_times + 1;
                document.querySelector('.counterBg').classList.remove('yellow');
                document.querySelector('.counterBg').classList.add('red');
            }
            this.count();
        }
    },
    cancelTimer: function() {
        this.initialLayout();
        this.count_exercises = 1;
        this.count_times = 1;
        document.querySelector('.counterBg').classList.remove('red');
    }
}

document.querySelector('#insertTimer button').addEventListener("click", function() {JS.timer.init()}, false);
document.querySelector('.pause').addEventListener("click", function() {JS.timer.pauseTimer()}, false);
document.querySelector('.stop').addEventListener("click", function() {JS.timer.cancelTimer()}, false);
