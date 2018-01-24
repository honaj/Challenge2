let can = document.querySelector("canvas").getContext("2d");
let storeImage = document.getElementById("storeImage");
let compareImage = document.getElementById("compareImage");
let resultText = document.getElementById("resultText");
let mouseDown = false;
let x;
let y;
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

//Get image data and turn red channel into an array of bools
function redChannelToArray()
{
    let getImage = can.getImageData(0, 0, can.canvas.width, can.canvas.height);
    let pixelArray = [];
    for(let i = 0; i < getImage.data.length; i += 4)
    {
        if(getImage.data[i] == 0)
        {
            pixelArray.push(true);
        }
        else
        {
            pixelArray.push(false);
        }
    }
    return pixelArray;
}

function storePixels()
{
    localStorage.setItem("controlArray", JSON.stringify(redChannelToArray()));
    can.clearRect(0, 0, can.canvas.width, can.canvas.height);
}

function comparePixels()
{
    let score = 0;
    let newArray = redChannelToArray();
    let controlArray = JSON.parse(localStorage.getItem("controlArray"));
    let scoreArray = [];
    for(let i = 0; i < newArray.length; i++)
    {
        if(controlArray[i])
        {
            scoreArray.push(controlArray[i]);
            if(controlArray[i] == newArray[i])
            {
                score ++;
            }
        }

    }
    // console.log("controlArrayLength: " +  controlArray.length);
    // console.log("newArrayLength: " + newArray.length);
    console.log(scoreArray.length);
    console.log("score is " + score);
    if(score > scoreArray.length * 0.95)
    {
        resultText.innerHTML = "Success!";
    }
    else
    {
        resultText.innerHTML = "Failure!";
        can.clearRect(0, 0, can.canvas.width, can.canvas.height);
    }
}