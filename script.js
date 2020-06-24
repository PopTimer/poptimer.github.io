var  JS = {};
JS.timer = {
    number: document.querySelector('.userTime').value,
    interval: "",
    flg_pause: false,
    count: function() {
        const validForm = this.valid();
        if(validForm) {
            document.querySelector('.editTimer').style.display = "none";
            document.querySelector('.message-error').style.display = "none";
            document.querySelector('.controlTimer').style.display = "block";
            document.querySelector('.valueTimer').style.display = "block";
            document.querySelector('.valueTimer').innerHTML = document.querySelector('.userTime').value;
            this.number = document.querySelector('.userTime').value;
            this.interval = setInterval(function() { 
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
        } else {
            this.stopTimer();
        }
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
        document.querySelector('.editTimer').style.display = "block";
        document.querySelector('.valueTimer').style.display = "none";
        document.querySelector('.controlTimer').style.display = "none";
        document.querySelector('.userTime').value = 0;
        JS.timer.flg_pause = false;
        clearInterval(this.interval);
    }
}

document.querySelector('.confirmTimer').addEventListener("click", function() {JS.timer.count()}, false);
document.querySelector('.pause').addEventListener("click", function() {JS.timer.pauseTimer()}, false);
document.querySelector('.stop').addEventListener("click", function() {JS.timer.stopTimer()}, false);
