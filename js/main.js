var test = "fhazeifhazeiuohfzae";

startTime()

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('clock').innerHTML =
    h + ":" + m;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

document.getElementById("todo-show").addEventListener("click", function(){
  console.log('here');
let list = document.getElementById("todo-list").style.opacity;
    if (list == 0.9)
      document.getElementById("todo-list").style.opacity = 0;
    else
      document.getElementById("todo-list").style.opacity = 0.9;
});
