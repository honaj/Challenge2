let can = document.querySelector("canvas").getContext("2d");
let storeImage = document.getElementById("storeImage");
let compareImage = document.getElementById("compareImage");
let resultText = document.getElementById("resultText");
let mouseDown = false;
let x;
let y;
//let controlImage;
//let score;
let rArray = [];
can.lineWidth = 10;
can.strokeStyle = "red";

can.canvas.addEventListener("mousemove", draw);
can.canvas.addEventListener("mousedown", setMouseDown);
can.canvas.addEventListener("mouseup", setMouseUp);
storeImage.addEventListener("mousedown", storePixels);
compareImage.addEventListener("mousedown", comparePixels);

function draw(evt)
{
    let oldX = x;
    let oldY = y;
    x = evt.x;
    y = evt.y;
    if(mouseDown)
    {
        can.beginPath();
        can.moveTo(oldX, oldY);
        can.lineTo(x, y);
        can.stroke();
        can.closePath();
    }
}

function setMouseDown(evt)
{
    mouseDown = true;
}

function setMouseUp(evt)
{
    mouseDown = false;
}

function storePixels()
{
    let getImage = can.getImageData(0, 0, can.canvas.width, can.canvas.height);
    for(let i = 0; i < getImage.data.length; i += 4)
    {
        rArray.push(getImage.data[i]);
        //console.log(rArray[i]);
    }
    console.log(rArray.length);
    //localStorage.setItem("controlImage", JSON.stringify(can.getImageData(0, 0, can.canvas.width, can.canvas.height)));
    localStorage.setItem("controlPixels", )
    can.clearRect(0, 0, can.canvas.width, can.canvas.height);
}

function comparePixels()
{
    if(localStorage.getItem("controlImage") == null)
    {
        console.log("null");
    }
    else
    {
        console.log("not null");
    }
    let score = 0;
    let controlImage = JSON.parse(localStorage.getItem("controlImage"));
    let newImage = can.getImageData(0, 0, can.canvas.width, can.canvas.height);
    console.log(controlImage.data.length);
    for(let i = 0; i < controlImage.data.length; i++)
    {
        console.log("test");
        if(controlImage.data[i] == newImage.data[i])
        {
            score++;       
        }
    }
    console.log("score is " + score);
    if(score > controlImage.data.length * 0.98)
    {
        resultText.innerHTML = "Success!";
    }
    else
    {
        resultText.innerHTML = "Failure!";
        can.clearRect(0, 0, can.canvas.width, can.canvas.height);
    }
}