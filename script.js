function k(event) {

    if (event.which == 13) {
        //alert('enter'); // Enter
        if (rw == 0) {
            rw = setInterval(run, 100);
            bw = setInterval(b, 100);
            fw = setInterval(fmove, 100);
            sw = setInterval(updateScore, 100);
            fid = f();
        }

    }

    if (event.which == 38 | event.which == 104) {
        //alert(event.which); // pageUP // numPad 8
        if (jw == 0) {
            clearInterval(rw);
            rw = -1;
            jw = setInterval(jump, 100);
        }
    }

    if (event.which == 32) {
        //alert('space'); // Space
        space();
    }
}

/* function for space */
function space() {
    if (!(rw == 0 && bw == 0)) {
        clearInterval(rw);
        rw = 0;
        clearInterval(bw);
        bw = 0;
        clearInterval(jw);
        jw = 0;
        clearInterval(fw);
        fw = 0;
        clearInterval(sw);
        sw = 0;
    }
}

/* Add Audio */
var rs = new Audio('./res/Run/run.mp3');
rs.loop = true;

var js = new Audio('./res/Jump/jump.mp3');
var ds = new Audio('./res/Dead/dead.mp3');

/* Background Animation */
var num = 0;
var bw = 0;
function b() {
    var b = document.getElementById('b');
    num = num - 10;
    b.style.backgroundPositionX = num + 'px';
}

/* Run Animation */
var r = 1;
var rw = 0;
function run() {
    var br = document.getElementById('i');
    r = r + 1;
    if (r == 9) {
        r = 1;
    }
    br.src = './res/Run/Run (' + r + ').png';
    // add sound
    rs.play();
}

/* Jump Animation */
var j = 1;
var jw = 0;
var t = 390;
function jump() {
    if (j <= 6) {
        t = t - 35;
    } else if (j >= 7) {
        t = t + 35;
    }
    var bj = document.getElementById('i');
    bj.style.marginTop = t + 'px';

    j = j + 1;
    if (j == 13) {
        j = 1;

        clearInterval(jw);

        rw = setInterval(run, 100);
        jw = 0;

        if (fid == 0) {
            fid = f();
        }
        if (fw == 0) {
            fw = setInterval(fmove, 100);
        }
        if (bw == 0) {
            bw = setInterval(b, 100);
        }
        if (sw == 0) {
            sw = setInterval(updateScore, 100);
        }
    }
    bj.src = './res/Jump/Jump (' + j + ').png';
    // add sound
    rs.pause();
    js.play();
}

/* Dead Animation */
var d = 1;
var dw = 0;
function dead() {
    var bd = document.getElementById('i');
    d = d + 1;
    if (d == 11) {
        d = 10;
        i.style.marginTop = '390px';

        document.getElementById('end').style.visibility = 'visible';
        document.getElementById('eScore').innerHTML = us;
    }
    bd.src = './res/Dead/Dead (' + d + ').png';
    // add sound
    rs.pause();
    ds.play();
}

/* Flame Animation */
var x = 500;
var fid = 0;
function f() {
    for (var y = 0; y < 20; y++) {
        var g = document.createElement('img');
        g.className = 'flame';
        g.src = './res/flame.gif';
        g.style.marginLeft = x + 'px';

        if (y <= 10) {
            x = x + 700;
        }
        if (y >= 11) {
            x = x + 500;
        }


        g.id = 'f' + y;

        document.getElementById('b').appendChild(g);
    }
}

/* Flame Move Animation */
var fw = 0;
function fmove() {
    for (var y = 0; y < 20; y++) {
        var z = getComputedStyle(document.getElementById('f' + y));  // this can use for get all css which we told tag
        var p = parseInt(z.marginLeft) - 20;

        document.getElementById('f' + y).style.marginLeft = p + 'px';

        /* Function for CheckDead */
        if (p <= 300 && p >= 150) {
            if (jw == 0) {
                dead();
                clearInterval(rw);
                rw = -1;
                clearInterval(jw);
                jw = -1;
                clearInterval(fw);
                clearInterval(sw);
                clearInterval(bw);
                dw = setInterval(dead, 100);
            }
            /*
            if(mt>210){
                alert('dead');
            }
            */
            //alert(t);
        }
        //alert(p); // 280, 120 // 180, 215
        //alert(z.marginLeft);
        //CheckDead();
    }
}

/* Function for Update Score */
var sw = 0;
var us = 0;
function updateScore() {
    us = us + 10;
    document.getElementById('score').innerHTML = us;
}

/* reload Game again */
function re(){
    location.reload();
}