var  JS = {};
JS.timer = {
    number: document.querySelector('.userTime').value,
    initial_number: document.querySelector('.userTime').value,
    interval: "",
    flg_pause: false,
    bar_parts: 0,
    times: 0,
    exercises: document.querySelector('.exercises').value,
    qtd_times: 0,
    count_times: 0,

    count: function() {
        let validForm;
        console.log(JS.timer.times);
        if(JS.timer.times != 1) {
            validForm = true;
        } else {
            validForm = this.valid();
        }
        if(validForm) {
            document.querySelector('#insertTimer').style.display = "none";
            document.querySelector('.message-error').style.display = "none";
            document.querySelector('.controlTimer').style.display = "block";
            document.querySelector('.valueTimer').style.display = "block";
            document.querySelector('.valueTimer').innerHTML = document.querySelector('.userTime').value;
            JS.timer.initial_number = document.querySelector('.userTime').value;
            JS.timer.qtd_times = Number(document.querySelector('.times').value);
            JS.timer.configBar(document.querySelector('.userTime').value);
            this.number = document.querySelector('.userTime').value;
            JS.timer.interval = setInterval(function() { 
                if(!JS.timer.flg_pause) { 
                    JS.timer.substrate() 
                   
                } }, 1000);
        } else {
            document.querySelector('.message-error').style.display = "block";
        }
    },
    substrate: function() {
        if (this.number > 0) {
            this.number = this.number - 1;
            document.querySelector('.userTime').value = this.number;
            document.querySelector('.valueTimer').innerHTML = this.number;
            document.querySelector('.barTimer div').style.width = (parseFloat(document.querySelector('.barTimer div').style.width) + JS.timer.bar_parts) + "%";
            /*document.querySelector('.barTimer span').innerHTML = (parseFloat(document.querySelector('.barTimer div').style.width) + JS.timer.bar_parts) + "%"*/
        } else {
            if(JS.timer.times <= 0) {
                this.stopTimer();
            } else {
                JS.timer.times = JS.timer.times - 1;
                console.log(JS.timer.times, this.initial_number);
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
        } else {
            return true;
        }
    },
    pauseTimer: function() {
        if(!JS.timer.flg_pause) {
            JS.timer.flg_pause = true;
        } else {
            JS.timer.flg_pause = false;
        }
    },
    stopTimer: function() {
        document.querySelector('#insertTimer').style.display = "block";
        document.querySelector('.valueTimer').style.display = "none";
        document.querySelector('.controlTimer').style.display = "none";
        document.querySelector('.userTime').value = 0;
        JS.timer.flg_pause = false;
        clearInterval(JS.timer.interval);
        console.log(JS.timer.count_times);
        JS.timer.count_times = JS.timer.count_times + 1;
        document.querySelector('.userTime').value = JS.timer.initial_number;
        console.log(JS.timer.count_times, JS.timer.count_times < JS.timer.qtd_times, JS.timer.qtd_times);
        if(JS.timer.count_times == JS.timer.qtd_times) {
            JS.timer.count_times = 0;
        } else {
            JS.timer.count();
        }


    }
}

document.querySelector('#insertTimer button').addEventListener("click", function() {JS.timer.count()}, false);
document.querySelector('.pause').addEventListener("click", function() {JS.timer.pauseTimer()}, false);
document.querySelector('.stop').addEventListener("click", function() {JS.timer.stopTimer()}, false);
