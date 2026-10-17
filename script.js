console.log("starting the app!");

const closePopup = () => {
    var popup = document.querySelector("#onstart-popup");
    var outer = document.querySelector("#outer-popup");
    if (popup) popup.style.display = "none";
    if (outer) outer.style.display = "none";
}

const openPopup = () => {
    var popup = document.querySelector("#onstart-popup");
    var outer = document.querySelector("#outer-popup");
    if (popup) popup.style.display = "block";
    if (outer) outer.style.display = "block";
}

//creating a canvas
const createCanvas = () =>{
        const canvasDiv = document.querySelector("#canvasDiv");
        const canvas = document.createElement('canvas');
        const clearBtn=document.getElementById('clear');
        const saveBtn = document.getElementById('save');
        const paletteBtn = document.getElementById('palette');
        const blackBtn = document.querySelector('div[data-color="black"]');
        const greenBtn = document.querySelector('div[data-color="green"]');
        const blueBtn = document.querySelector('div[data-color="blue"]');
        const purpleBtn = document.querySelector('div[data-color="purple"]');
        const redBtn = document.querySelector('div[data-color="red"]');
        const OrangeBtn = document.querySelector('div[data-color="Orange"]');
        const DarkGreenBtn = document.querySelector('div[data-color="Dark-Green"]');
        const whiteBtn = document.querySelector('div[data-color="white"]');

        let canvasHeight = window.innerHeight-100;
        let canvasWidth  = window.innerWidth-100;
        var clickX = new Array();
        var clickY = new Array();
        var clickDrag = new Array();
        var clickColor = new Array(); 
        var clickSize = new Array();
        var paint;
        var color = '#000000';
        var curSize = 5;
        const sizeSlider = document.getElementById('brushSize');
        const sizeDisplay = document.getElementById('brushSizeDisplay');

        if (sizeSlider) {
        sizeSlider.addEventListener('input', (e) => {
        curSize = Number(e.target.value);
        if (sizeDisplay) sizeDisplay.innerText = `${curSize}px`;
  });
}
let currentTool = 'brush'; // 'brush' or 'stamp'
let stamps = []; // Stores placed stamps

const toolModeBtn = document.getElementById('toolSelect');
const stampPicker = document.getElementById('stampSelect');

if (toolModeBtn && stampPicker) {
  toolModeBtn.addEventListener('click', () => {
    if (currentTool === 'brush') {
      currentTool = 'stamp';
      toolModeBtn.innerText = `Mode: ${stampPicker.value} Stamp`;
      toolModeBtn.style.background = '#9900ff';
    } else {
      currentTool = 'brush';
      toolModeBtn.innerText = 'Mode: 🖌️ Brush';
      toolModeBtn.style.background = '#ff006f';
    }
  });

  stampPicker.addEventListener('change', () => {
    if (currentTool === 'stamp') {
      toolModeBtn.innerText = `Mode: ${stampPicker.value} Stamp`;
    }
  });
}

        paletteBtn.addEventListener('click', openPopup);
        clearBtn.addEventListener('click', function(e){      
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                clickX=[];
                clickY=[];
                clickColor=[];
                clickDrag=[];
                clickSize=[];
                stamps = []; // Clear stamps as well
                paint=false;
        });

        canvas.setAttribute('id','canvas');
        canvas.setAttribute('width',canvasWidth);
        canvas.setAttribute('height',canvasHeight);
        canvas.setAttribute('class','border');
        canvas.setAttribute('background-color','#cb3594');
        canvasDiv.appendChild(canvas);

        if(typeof G_vmlCanvasManager != 'undefined') {
                canvas = G_vmlCanvasManager.initElement(canvas);
        }
        context = canvas.getContext("2d");
        context.fillStyle="#fff";
        context.fillRect(0,0,context.canvas.width, context.canvas.height);

        // changes the color state of the canvas based on box clicked in welcome modal
        function selectColor(newColor) {
          switch(newColor) {
            case 'green':
              color = "#baff33";
              closePopup();
              break;
            case 'red':
              color = "#ff2b2b";
              closePopup();
              break;
            case 'purple':
              color = "#b700ff";
              closePopup();
              break;
            case 'blue':
              color = "#006eff";
              closePopup();
              break;
            case 'black':
            default:
              color = "#000000";
              closePopup();
              break;
            case 'Orange':
              color = "#fca901";
              closePopup();
              break;
            case 'Dark-Green':
              color = "#006400";
              closePopup();
              break;
            case 'white':
              color = "#ffffff";
              closePopup();
              break;
          }
        }

        blackBtn.addEventListener('click', (event) => selectColor(event.target.dataset.color));
        blueBtn.addEventListener('click', (event) => selectColor(event.target.dataset.color));
        greenBtn.addEventListener('click', (event) => selectColor(event.target.dataset.color));
        purpleBtn.addEventListener('click', (event) => selectColor(event.target.dataset.color));
        redBtn.addEventListener('click', (event) => selectColor(event.target.dataset.color));
        OrangeBtn.addEventListener('click', (event) => selectColor(event.target.dataset.color));
        DarkGreenBtn.addEventListener('click', (event) => selectColor(event.target.dataset.color));
        whiteBtn.addEventListener('click', (event) => selectColor(event.target.dataset.color));

        function addClick(x, y, dragging) {
          clickX.push(x);
          clickY.push(y);
          clickDrag.push(dragging);
          clickColor.push(color);
          clickSize.push(curSize);
        }

        // idk why this is here but it works so im not touching it
          function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = "#fff";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.lineJoin = "round";
  context.lineCap = "round";
                
  // 1. Draw brush strokes
  for(var i = 0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
    } else {
      context.moveTo(clickX[i]-1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.lineWidth = clickSize[i];
    context.stroke();
  }

  // 2. Draw all stamps
  for(var s = 0; s < stamps.length; s++) {
    context.font = `${stamps[s].size}px sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(stamps[s].emoji, stamps[s].x, stamps[s].y);
  }
}
           
        saveBtn.addEventListener('click',()=>{
          var dataURL = canvas.toDataURL('image/jpeg', 1.0);
          let savedImg = document.getElementById('savedImg');
          savedImg.setAttribute('src',dataURL);                   
        });

        canvas.addEventListener('mousedown',function(e){
          if (window.isOsuMode) return;
          var mouseX = e.pageX - this.offsetLeft;
          var mouseY = e.pageY - this.offsetTop;

          if (currentTool === 'stamp') {
            stamps.push({
              x: mouseX,
              y: mouseY,
              emoji: stampPicker.value || '🎃', // Default to pumpkin if no value
              size: Math.max(curSize * 3, 24)
            });
            redraw();
            return; // Exit early since we don't want to draw a brush stroke
          }
          paint = true;
          addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
          redraw();
        });

        canvas.addEventListener('mousemove',function(e){
          if (window.isOsuMode) return;
          if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
          }
        });
    
        canvas.addEventListener('mouseup',function(e){
          paint = false;
        });
}

createCanvas();

/* ========================================================
   BASE OSU ENGINE (ONLY CIRCLES & CLICKS)
======================================================== */
window.isOsuMode = false;
let startTime = 0;
let hitObjects = [];
let osuMouse = { x: 0, y: 0 };

const CIRCLE_RADIUS = 48;
const PREEMPT = 550;
const HIT_WINDOW = 180;
const COUNTDOWN_TOTAL = 3500;
const GAME_SPEED = 1;

const baseBeatmap = [
  { time: 7631, x: 181, y: 290, n: 1 },
  { time: 8099, x: 178, y: 92, n: 2 },
  { time: 8568, x: 314, y: 201, n: 3 },
  { time: 8802, x: 364, y: 119, n: 4 },
  { time: 9271, x: 363, y: 293, n: 5 },
  { time: 9506, x: 267, y: 281, n: 6 },
  { time: 10209, x: 129, y: 227, n: 7 },
  { time: 10443, x: 49, y: 196, n: 8 },
  { time: 10912, x: 193, y: 186, n: 9 },
  { time: 11381, x: 187, y: 97, n: 1 },
  { time: 11615, x: 92, y: 114, n: 2 },
  { time: 11849, x: 186, y: 127, n: 3 },
  { time: 12084, x: 91, y: 145, n: 4 },
  { time: 12787, x: 186, y: 158, n: 5 },
  { time: 13021, x: 124, y: 231, n: 6 },
  { time: 13256, x: 185, y: 305, n: 1 },
  { time: 13490, x: 280, y: 307, n: 2 },
  { time: 13724, x: 375, y: 307, n: 3 },
  { time: 13959, x: 376, y: 210, n: 4 },
  { time: 14193, x: 376, y: 114, n: 5 },
  { time: 15131, x: 189, y: 65, n: 1 },
  { time: 15599, x: 199, y: 157, n: 2 },
  { time: 16068, x: 65, y: 234, n: 3 },
  { time: 16420, x: 139, y: 310, n: 4 },
  { time: 17006, x: 378, y: 316, n: 1 },
  { time: 17240, x: 317, y: 242, n: 2 },
  { time: 17474, x: 412, y: 240, n: 3 },
  { time: 17709, x: 347, y: 168, n: 4 },
  { time: 17943, x: 442, y: 163, n: 5 },
  { time: 18412, x: 266, y: 87, n: 6 },
  { time: 18881, x: 85, y: 172, n: 1 },
  { time: 19115, x: 175, y: 204, n: 2 },
  { time: 19349, x: 100, y: 264, n: 3 },
  { time: 19466, x: 100, y: 264, n: 4 },
  { time: 19584, x: 100, y: 264, n: 5 },
  { time: 19818, x: 193, y: 283, n: 6 },
  { time: 20052, x: 288, y: 289, n: 7 },
  { time: 20521, x: 415, y: 133, n: 1 },
  { time: 20638, x: 415, y: 133, n: 2 },
  { time: 20756, x: 415, y: 133, n: 3 },
  { time: 20990, x: 363, y: 52, n: 4 },
  { time: 21224, x: 301, y: 125, n: 5 },
  { time: 21459, x: 254, y: 40, n: 6 },
  { time: 21693, x: 181, y: 102, n: 7 },
  { time: 21927, x: 105, y: 43, n: 8 },
  { time: 22631, x: 241, y: 300, n: 1 },
  { time: 23802, x: 145, y: 301, n: 2 },
  { time: 24037, x: 79, y: 230, n: 3 },
  { time: 24271, x: 145, y: 161, n: 4 },
  { time: 24506, x: 82, y: 88, n: 1 },
  { time: 24974, x: 272, y: 64, n: 2 },
  { time: 25443, x: 462, y: 89, n: 3 },
  { time: 25677, x: 407, y: 168, n: 4 },
  { time: 25912, x: 465, y: 244, n: 5 },
  { time: 26146, x: 411, y: 323, n: 6 },
  { time: 26381, x: 314, y: 329, n: 1 },
  { time: 27318, x: 105, y: 69, n: 2 },
  { time: 27552, x: 50, y: 148, n: 3 },
  { time: 27787, x: 111, y: 222, n: 4 },
  { time: 28021, x: 48, y: 294, n: 5 },
  { time: 28256, x: 142, y: 310, n: 1 },
  { time: 28490, x: 201, y: 235, n: 2 },
  { time: 28959, x: 372, y: 316, n: 3 },
  { time: 29427, x: 244, y: 148, n: 4 },
  { time: 29896, x: 415, y: 65, n: 5 },
  { time: 30365, x: 318, y: 244, n: 1 },
  { time: 30599, x: 239, y: 299, n: 2 },
  { time: 30834, x: 142, y: 301, n: 3 },
  { time: 31068, x: 61, y: 249, n: 4 },
  { time: 31302, x: 45, y: 154, n: 5 },
  { time: 31420, x: 71, y: 113, n: 6 },
  { time: 31537, x: 102, y: 76, n: 7 },
  { time: 31771, x: 196, y: 63, n: 8 },
  { time: 32123, x: 274, y: 141, n: 1 },
  { time: 32240, x: 247, y: 181, n: 2 },
  { time: 32591, x: 168, y: 129, n: 3 },
  { time: 32709, x: 168, y: 129, n: 4 },
  { time: 32943, x: 245, y: 72, n: 5 },
  { time: 33177, x: 315, y: 136, n: 6 },
  { time: 33412, x: 390, y: 76, n: 7 },
  { time: 33646, x: 435, y: 160, n: 1 },
  { time: 33881, x: 354, y: 213, n: 2 },
  { time: 34115, x: 272, y: 262, n: 3 },
  { time: 34349, x: 360, y: 298, n: 4 },
  { time: 34584, x: 338, y: 204, n: 5 },
  { time: 35052, x: 178, y: 217, n: 6 },
  { time: 35287, x: 112, y: 287, n: 7 },
  { time: 35521, x: 43, y: 220, n: 8 },
  { time: 35756, x: 110, y: 151, n: 1 },
  { time: 35990, x: 205, y: 152, n: 2 },
  { time: 36224, x: 298, y: 157, n: 3 },
  { time: 36693, x: 183, y: 301, n: 4 },
  { time: 37162, x: 224, y: 106, n: 5 },
  { time: 37631, x: 256, y: 192, n: 1 },
  { time: 45131, x: 101, y: 150, n: 1 },
  { time: 45599, x: 286, y: 102, n: 2 },
  { time: 46068, x: 435, y: 222, n: 3 },
  { time: 46537, x: 247, y: 181, n: 4 },
  { time: 46849, x: 120, y: 199, n: 5 },
  { time: 47474, x: 254, y: 319, n: 6 },
  { time: 47943, x: 423, y: 228, n: 7 },
  { time: 48412, x: 290, y: 92, n: 1 },
  { time: 48646, x: 290, y: 187, n: 2 },
  { time: 48881, x: 361, y: 297, n: 1 },
  { time: 49349, x: 169, y: 294, n: 2 },
  { time: 49818, x: 81, y: 123, n: 3 },
  { time: 50287, x: 265, y: 69, n: 4 },
  { time: 50599, x: 173, y: 158, n: 5 },
  { time: 51224, x: 360, y: 118, n: 6 },
  { time: 51693, x: 459, y: 282, n: 7 },
  { time: 52396, x: 392, y: 144, n: 8 },
  { time: 52631, x: 339, y: 224, n: 1 },
  { time: 53099, x: 155, y: 279, n: 2 },
  { time: 53568, x: 78, y: 102, n: 3 },
  { time: 54037, x: 237, y: 208, n: 4 },
  { time: 54349, x: 110, y: 228, n: 5 },
  { time: 54506, x: 45, y: 201, n: 1 },
  { time: 54974, x: 172, y: 57, n: 2 },
  { time: 55443, x: 363, y: 70, n: 3 },
  { time: 55912, x: 201, y: 174, n: 4 },
  { time: 56146, x: 283, y: 125, n: 5 },
  { time: 56381, x: 282, y: 36, n: 1 },
  { time: 56849, x: 426, y: 162, n: 2 },
  { time: 57318, x: 233, y: 158, n: 3 },
  { time: 57787, x: 399, y: 254, n: 4 },
  { time: 58256, x: 209, y: 284, n: 1 },
  { time: 58724, x: 121, y: 163, n: 2 },
  { time: 59193, x: 279, y: 115, n: 3 },
  { time: 59427, x: 357, y: 170, n: 4 },
  { time: 59545, x: 357, y: 170, n: 5 },
  { time: 60131, x: 128, y: 288, n: 1 },
  { time: 60365, x: 128, y: 192, n: 2 },
  { time: 60599, x: 224, y: 192, n: 3 },
  { time: 60834, x: 320, y: 192, n: 4 },
  { time: 61302, x: 448, y: 64, n: 1 },
  { time: 61537, x: 448, y: 160, n: 2 },
  { time: 61771, x: 448, y: 256, n: 3 },
  { time: 62006, x: 352, y: 256, n: 4 },
  { time: 62474, x: 128, y: 256, n: 5 },
  { time: 62943, x: 224, y: 96, n: 6 },
  { time: 63177, x: 320, y: 96, n: 7 },
  { time: 63412, x: 224, y: 96, n: 8 },
  { time: 63646, x: 224, y: 192, n: 1 },
  { time: 63881, x: 320, y: 192, n: 2 },
  { time: 64115, x: 416, y: 192, n: 3 },
  { time: 64349, x: 416, y: 288, n: 4 },
  { time: 64584, x: 320, y: 288, n: 5 },
  { time: 64818, x: 224, y: 288, n: 6 },
  { time: 65287, x: 96, y: 192, n: 7 },
  { time: 65521, x: 96, y: 96, n: 8 },
  { time: 65756, x: 192, y: 160, n: 1 },
  { time: 65990, x: 192, y: 64, n: 2 },
  { time: 66224, x: 288, y: 128, n: 3 },
  { time: 66459, x: 288, y: 32, n: 4 },
  { time: 66693, x: 384, y: 32, n: 5 },
  { time: 66849, x: 384, y: 96, n: 6 },
  { time: 67006, x: 384, y: 160, n: 7 },
  { time: 67162, x: 384, y: 224, n: 8 },
  { time: 67396, x: 307, y: 281, n: 9 },
  { time: 67631, x: 224, y: 224, n: 1 },
  { time: 68099, x: 96, y: 128, n: 2 },
  { time: 68568, x: 64, y: 320, n: 3 },
  { time: 69037, x: 224, y: 224, n: 4 },
  { time: 69506, x: 320, y: 96, n: 5 },
  { time: 69974, x: 224, y: 96, n: 1 },
  { time: 70209, x: 128, y: 96, n: 2 },
  { time: 70443, x: 128, y: 192, n: 3 },
  { time: 70677, x: 128, y: 288, n: 4 },
  { time: 70912, x: 224, y: 288, n: 5 },
  { time: 71381, x: 416, y: 288, n: 1 },
  { time: 71615, x: 416, y: 192, n: 2 },
  { time: 71849, x: 416, y: 96, n: 3 },
  { time: 72318, x: 192, y: 96, n: 4 },
  { time: 72552, x: 96, y: 96, n: 5 },
  { time: 72787, x: 96, y: 192, n: 6 },
  { time: 73256, x: 192, y: 320, n: 1 },
  { time: 73724, x: 301, y: 212, n: 2 },
  { time: 74193, x: 109, y: 270, n: 3 },
  { time: 74427, x: 85, y: 177, n: 4 },
  { time: 74545, x: 85, y: 177, n: 5 },
  { time: 75131, x: 256, y: 192, n: 1 },
  { time: 82162, x: 130, y: 149, n: 1 },
  { time: 82943, x: 199, y: 148, n: 2 },
  { time: 83099, x: 269, y: 147, n: 3 },
  { time: 83412, x: 367, y: 79, n: 4 },
  { time: 83724, x: 425, y: 164, n: 5 },
  { time: 83881, x: 425, y: 164, n: 6 },
  { time: 84037, x: 425, y: 164, n: 1 },
  { time: 84818, x: 290, y: 305, n: 2 },
  { time: 84974, x: 229, y: 330, n: 3 },
  { time: 85443, x: 229, y: 330, n: 4 },
  { time: 85912, x: 391, y: 227, n: 1 },
  { time: 86381, x: 336, y: 261, n: 2 },
  { time: 86693, x: 210, y: 236, n: 3 },
  { time: 86849, x: 149, y: 215, n: 4 },
  { time: 87318, x: 212, y: 207, n: 5 },
  { time: 87474, x: 263, y: 169, n: 6 },
  { time: 87631, x: 271, y: 105, n: 7 },
  { time: 87787, x: 312, y: 56, n: 1 },
  { time: 87943, x: 374, y: 42, n: 2 },
  { time: 88099, x: 436, y: 54, n: 3 },
  { time: 88256, x: 478, y: 102, n: 4 },
  { time: 88412, x: 478, y: 165, n: 5 },
  { time: 88568, x: 451, y: 222, n: 6 },
  { time: 88724, x: 423, y: 279, n: 7 },
  { time: 88881, x: 391, y: 335, n: 8 },
  { time: 89037, x: 328, y: 349, n: 9 },
  { time: 89193, x: 264, y: 344, n: 10 },
  { time: 89662, x: 101, y: 241, n: 1 },
  { time: 89818, x: 87, y: 178, n: 2 },
  { time: 90131, x: 144, y: 98, n: 3 },
  { time: 90756, x: 390, y: 92, n: 4 },
  { time: 90912, x: 429, y: 142, n: 5 },
  { time: 91068, x: 422, y: 205, n: 6 },
  { time: 91693, x: 327, y: 307, n: 1 },
  { time: 91849, x: 327, y: 307, n: 2 },
  { time: 92006, x: 327, y: 307, n: 3 },
  { time: 92318, x: 200, y: 290, n: 4 },
  { time: 92474, x: 151, y: 248, n: 5 },
  { time: 92787, x: 145, y: 138, n: 6 },
  { time: 93412, x: 314, y: 54, n: 1 },
  { time: 93724, x: 390, y: 116, n: 2 },
  { time: 94193, x: 207, y: 68, n: 1 },
  { time: 94349, x: 145, y: 86, n: 2 },
  { time: 94506, x: 100, y: 132, n: 3 },
  { time: 94662, x: 69, y: 188, n: 4 },
  { time: 94818, x: 65, y: 251, n: 5 },
  { time: 94974, x: 98, y: 305, n: 6 },
  { time: 95287, x: 158, y: 281, n: 1 },
  { time: 95756, x: 337, y: 256, n: 2 },
  { time: 96224, x: 338, y: 160, n: 3 },
  { time: 96693, x: 421, y: 208, n: 4 },
  { time: 97162, x: 300, y: 58, n: 1 },
  { time: 97318, x: 236, y: 65, n: 2 },
  { time: 97474, x: 173, y: 78, n: 3 },
  { time: 97631, x: 119, y: 113, n: 4 },
  { time: 97943, x: 88, y: 237, n: 1 },
  { time: 98099, x: 144, y: 207, n: 2 },
  { time: 98568, x: 175, y: 263, n: 3 },
  { time: 99037, x: 227, y: 302, n: 1 },
  { time: 99193, x: 289, y: 317, n: 2 },
  { time: 99349, x: 352, y: 310, n: 3 },
  { time: 99506, x: 411, y: 285, n: 4 },
  { time: 99818, x: 412, y: 157, n: 1 },
  { time: 99974, x: 366, y: 112, n: 2 },
  { time: 100131, x: 304, y: 94, n: 3 },
  { time: 100287, x: 240, y: 101, n: 4 },
  { time: 100443, x: 177, y: 112, n: 5 },
  { time: 100912, x: 89, y: 266, n: 1 },
  { time: 101068, x: 143, y: 299, n: 2 },
  { time: 101224, x: 206, y: 308, n: 3 },
  { time: 101381, x: 263, y: 280, n: 4 },
  { time: 101693, x: 157, y: 207, n: 1 },
  { time: 101849, x: 216, y: 183, n: 2 },
  { time: 102006, x: 279, y: 175, n: 3 },
  { time: 102162, x: 338, y: 197, n: 4 },
  { time: 102318, x: 383, y: 242, n: 5 },
  { time: 102474, x: 445, y: 253, n: 6 },
  { time: 102631, x: 468, y: 193, n: 7 },
  { time: 102787, x: 460, y: 129, n: 1 },
  { time: 103099, x: 342, y: 82, n: 2 },
  { time: 103412, x: 253, y: 153, n: 3 },
  { time: 103724, x: 163, y: 88, n: 4 },
  { time: 104037, x: 92, y: 198, n: 5 },
  { time: 104193, x: 125, y: 252, n: 6 },
  { time: 104662, x: 311, y: 267, n: 1 },
  { time: 104818, x: 364, y: 231, n: 2 },
  { time: 104974, x: 311, y: 267, n: 3 },
  { time: 105131, x: 364, y: 231, n: 4 },
  { time: 105443, x: 447, y: 134, n: 5 },
  { time: 105599, x: 447, y: 134, n: 1 },
  { time: 105912, x: 383, y: 49, n: 2 },
  { time: 106068, x: 334, y: 91, n: 3 },
  { time: 106224, x: 275, y: 64, n: 4 },
  { time: 106381, x: 216, y: 90, n: 5 },
  { time: 106537, x: 176, y: 39, n: 1 },
  { time: 106693, x: 117, y: 64, n: 2 },
  { time: 106849, x: 81, y: 117, n: 3 },
  { time: 107006, x: 89, y: 180, n: 4 },
  { time: 107474, x: 182, y: 175, n: 5 },
  { time: 107631, x: 227, y: 220, n: 6 },
  { time: 107787, x: 226, y: 283, n: 7 },
  { time: 107943, x: 282, y: 312, n: 1 },
  { time: 108177, x: 369, y: 272, n: 2 },
  { time: 108412, x: 400, y: 180, n: 1 },
  { time: 108568, x: 384, y: 117, n: 2 },
  { time: 108724, x: 322, y: 134, n: 3 },
  { time: 108881, x: 292, y: 76, n: 4 },
  { time: 109193, x: 165, y: 60, n: 5 },
  { time: 109349, x: 108, y: 89, n: 6 },
  { time: 109506, x: 89, y: 150, n: 7 },
  { time: 109662, x: 152, y: 155, n: 8 },
  { time: 109818, x: 133, y: 216, n: 9 },
  { time: 109974, x: 181, y: 257, n: 10 },
  { time: 110131, x: 237, y: 226, n: 11 },
  { time: 110287, x: 197, y: 175, n: 1 },
  { time: 110521, x: 117, y: 244, n: 2 },
  { time: 110756, x: 200, y: 292, n: 3 },
  { time: 111224, x: 378, y: 259, n: 4 },
  { time: 111576, x: 273, y: 157, n: 5 },
  { time: 119662, x: 125, y: 146, n: 1 },
  { time: 120599, x: 432, y: 278, n: 2 },
  { time: 120834, x: 397, y: 188, n: 3 },
  { time: 121068, x: 376, y: 281, n: 4 },
  { time: 121302, x: 339, y: 192, n: 5 },
  { time: 121537, x: 262, y: 249, n: 1 },
  { time: 122474, x: 264, y: 67, n: 2 },
  { time: 122709, x: 189, y: 127, n: 3 },
  { time: 122943, x: 155, y: 216, n: 4 },
  { time: 123177, x: 194, y: 303, n: 5 },
  { time: 123412, x: 289, y: 312, n: 1 },
  { time: 124349, x: 201, y: 72, n: 2 },
  { time: 124584, x: 297, y: 67, n: 3 },
  { time: 124818, x: 392, y: 72, n: 4 },
  { time: 125052, x: 467, y: 131, n: 5 },
  { time: 125287, x: 439, y: 223, n: 1 },
  { time: 125873, x: 204, y: 281, n: 2 },
  { time: 126459, x: 155, y: 99, n: 3 },
  { time: 126693, x: 250, y: 98, n: 4 },
  { time: 127162, x: 393, y: 226, n: 1 },
  { time: 127631, x: 203, y: 285, n: 2 },
  { time: 128099, x: 86, y: 143, n: 3 },
  { time: 128451, x: 193, y: 106, n: 4 },
  { time: 128568, x: 240, y: 110, n: 5 },
  { time: 128802, x: 205, y: 199, n: 6 },
  { time: 129037, x: 272, y: 267, n: 1 },
  { time: 129271, x: 309, y: 178, n: 2 },
  { time: 129506, x: 389, y: 132, n: 3 },
  { time: 129623, x: 389, y: 132, n: 4 },
  { time: 129740, x: 389, y: 132, n: 5 },
  { time: 129974, x: 391, y: 227, n: 6 },
  { time: 130209, x: 313, y: 283, n: 7 },
  { time: 130912, x: 268, y: 197, n: 1 },
  { time: 131146, x: 179, y: 233, n: 2 },
  { time: 131381, x: 84, y: 215, n: 3 },
  { time: 131615, x: 165, y: 165, n: 4 },
  { time: 131849, x: 253, y: 128, n: 5 },
  { time: 132084, x: 179, y: 65, n: 6 },
  { time: 132318, x: 267, y: 28, n: 7 },
  { time: 132552, x: 352, y: 70, n: 8 },
  { time: 132787, x: 443, y: 98, n: 1 },
  { time: 133021, x: 368, y: 158, n: 2 },
  { time: 133256, x: 277, y: 125, n: 3 },
  { time: 133490, x: 198, y: 179, n: 4 },
  { time: 133724, x: 178, y: 272, n: 5 },
  { time: 134662, x: 371, y: 129, n: 1 },
  { time: 135131, x: 181, y: 99, n: 2 },
  { time: 135834, x: 233, y: 303, n: 3 },
  { time: 136068, x: 297, y: 232, n: 4 },
  { time: 136185, x: 297, y: 232, n: 5 },
  { time: 136302, x: 297, y: 232, n: 6 },
  { time: 136420, x: 297, y: 232, n: 7 },
  { time: 136537, x: 297, y: 232, n: 1 },
  { time: 136771, x: 387, y: 201, n: 2 },
  { time: 137006, x: 315, y: 136, n: 3 },
  { time: 137240, x: 220, y: 120, n: 4 },
  { time: 137474, x: 127, y: 95, n: 5 },
  { time: 137709, x: 183, y: 173, n: 6 },
  { time: 138177, x: 163, y: 267, n: 7 },
  { time: 138646, x: 362, y: 269, n: 1 },
  { time: 138881, x: 418, y: 191, n: 2 },
  { time: 139115, x: 322, y: 178, n: 3 },
  { time: 139349, x: 380, y: 101, n: 4 },
  { time: 139584, x: 284, y: 91, n: 5 },
  { time: 139701, x: 284, y: 91, n: 6 },
  { time: 140052, x: 140, y: 96, n: 7 },
  { time: 140756, x: 148, y: 192, n: 8 },
  { time: 141459, x: 87, y: 266, n: 9 },
  { time: 141693, x: 171, y: 311, n: 10 },
  { time: 142162, x: 256, y: 192, n: 1 },
  { time: 149662, x: 102, y: 140, n: 1 },
  { time: 149896, x: 185, y: 92, n: 2 },
  { time: 150365, x: 371, y: 138, n: 3 },
  { time: 150599, x: 280, y: 169, n: 4 },
  { time: 151068, x: 152, y: 304, n: 5 },
  { time: 151302, x: 95, y: 226, n: 6 },
  { time: 151420, x: 73, y: 182, n: 7 },
  { time: 151537, x: 104, y: 146, n: 1 },
  { time: 151771, x: 178, y: 85, n: 2 },
  { time: 152006, x: 272, y: 100, n: 3 },
  { time: 152474, x: 225, y: 183, n: 4 },
  { time: 152943, x: 319, y: 164, n: 5 },
  { time: 153177, x: 327, y: 259, n: 6 },
  { time: 153295, x: 327, y: 259, n: 7 },
  { time: 153412, x: 327, y: 259, n: 1 },
  { time: 154115, x: 95, y: 165, n: 2 },
  { time: 154584, x: 277, y: 105, n: 3 },
  { time: 154818, x: 370, y: 124, n: 4 },
  { time: 155052, x: 406, y: 212, n: 5 },
  { time: 155287, x: 405, y: 293, n: 1 },
  { time: 155756, x: 199, y: 257, n: 2 },
  { time: 155990, x: 104, y: 239, n: 3 },
  { time: 156224, x: 184, y: 59, n: 4 },
  { time: 156537, x: 129, y: 146, n: 5 },
  { time: 157162, x: 297, y: 90, n: 1 },
  { time: 157396, x: 376, y: 143, n: 2 },
  { time: 157865, x: 189, y: 190, n: 3 },
  { time: 158334, x: 355, y: 285, n: 4 },
  { time: 158802, x: 155, y: 277, n: 5 },
  { time: 158920, x: 155, y: 277, n: 6 },
  { time: 159037, x: 155, y: 277, n: 1 },
  { time: 159740, x: 223, y: 181, n: 2 },
  { time: 160209, x: 403, y: 114, n: 3 },
  { time: 160443, x: 366, y: 177, n: 4 },
  { time: 160677, x: 342, y: 123, n: 5 },
  { time: 160795, x: 342, y: 123, n: 6 },
  { time: 160912, x: 342, y: 123, n: 1 },
  { time: 161849, x: 83, y: 331, n: 2 },
  { time: 162787, x: 385, y: 104, n: 1 },
  { time: 163256, x: 304, y: 264, n: 2 },
  { time: 163724, x: 160, y: 125, n: 3 },
  { time: 164076, x: 100, y: 223, n: 4 },
  { time: 164662, x: 318, y: 322, n: 1 },
  { time: 165365, x: 298, y: 159, n: 2 },
  { time: 165599, x: 252, y: 243, n: 3 },
  { time: 166068, x: 120, y: 195, n: 4 },
  { time: 166302, x: 139, y: 101, n: 5 },
  { time: 166420, x: 179, y: 74, n: 6 },
  { time: 166537, x: 226, y: 70, n: 1 },
  { time: 167006, x: 372, y: 131, n: 2 },
  { time: 167240, x: 281, y: 161, n: 3 },
  { time: 167474, x: 357, y: 218, n: 4 },
  { time: 167591, x: 357, y: 218, n: 5 },
  { time: 167709, x: 357, y: 218, n: 6 },
  { time: 167943, x: 297, y: 293, n: 7 },
  { time: 168177, x: 201, y: 303, n: 8 },
  { time: 168412, x: 159, y: 253, n: 1 },
  { time: 169349, x: 353, y: 131, n: 2 },
  { time: 170052, x: 283, y: 292, n: 3 },
  { time: 170170, x: 257, y: 251, n: 4 },
  { time: 170287, x: 209, y: 258, n: 1 },
  { time: 170990, x: 181, y: 85, n: 2 },
  { time: 171224, x: 276, y: 73, n: 3 },
  { time: 171381, x: 298, y: 133, n: 4 },
  { time: 171537, x: 359, y: 115, n: 5 },
  { time: 171693, x: 414, y: 145, n: 6 },
  { time: 171927, x: 371, y: 230, n: 7 },
  { time: 172162, x: 301, y: 296, n: 1 },
  { time: 172865, x: 94, y: 114, n: 2 },
  { time: 173334, x: 281, y: 72, n: 3 },
  { time: 173568, x: 216, y: 143, n: 4 },
  { time: 173802, x: 311, y: 146, n: 5 },
  { time: 173920, x: 346, y: 179, n: 6 },
  { time: 174037, x: 314, y: 215, n: 1 },
  { time: 174740, x: 435, y: 238, n: 2 },
  { time: 174974, x: 417, y: 143, n: 3 },
  { time: 175209, x: 360, y: 125, n: 4 },
  { time: 175443, x: 297, y: 151, n: 5 },
  { time: 175677, x: 205, y: 145, n: 6 },
  { time: 175912, x: 123, y: 183, n: 1 },
  { time: 176146, x: 175, y: 263, n: 2 },
  { time: 176615, x: 367, y: 268, n: 3 },
  { time: 177084, x: 304, y: 86, n: 4 },
  { time: 177552, x: 311, y: 181, n: 5 },
  { time: 177670, x: 342, y: 217, n: 6 },
  { time: 177787, x: 341, y: 264, n: 1 },
  { time: 178256, x: 161, y: 203, n: 2 },
  { time: 178724, x: 257, y: 83, n: 3 },
  { time: 179427, x: 409, y: 269, n: 4 },
  { time: 179662, x: 256, y: 192, n: 1 },
  { time: 187162, x: 139, y: 208, n: 1 },
  { time: 187396, x: 170, y: 201, n: 2 },
  { time: 187631, x: 201, y: 208, n: 3 },
  { time: 187787, x: 249, y: 250, n: 4 },
  { time: 188256, x: 313, y: 254, n: 5 },
  { time: 188724, x: 313, y: 254, n: 6 },
  { time: 188881, x: 313, y: 254, n: 7 },
  { time: 189037, x: 352, y: 203, n: 1 },
  { time: 189662, x: 303, y: 160, n: 2 },
  { time: 189818, x: 326, y: 100, n: 3 },
  { time: 189974, x: 262, y: 92, n: 4 },
  { time: 190131, x: 205, y: 123, n: 5 },
  { time: 190287, x: 142, y: 110, n: 6 },
  { time: 190443, x: 108, y: 164, n: 7 },
  { time: 190912, x: 179, y: 241, n: 1 },
  { time: 191068, x: 236, y: 223, n: 2 },
  { time: 191224, x: 271, y: 253, n: 3 },
  { time: 191381, x: 278, y: 304, n: 4 },
  { time: 191537, x: 341, y: 306, n: 5 },
  { time: 191693, x: 398, y: 278, n: 6 },
  { time: 192006, x: 382, y: 206, n: 7 },
  { time: 192318, x: 310, y: 158, n: 8 },
  { time: 192631, x: 296, y: 90, n: 9 },
  { time: 192865, x: 187, y: 105, n: 1 },
  { time: 193412, x: 121, y: 183, n: 2 },
  { time: 193568, x: 162, y: 231, n: 3 },
  { time: 193724, x: 124, y: 282, n: 4 },
  { time: 193802, x: 146, y: 304, n: 5 },
  { time: 193959, x: 197, y: 303, n: 6 },
  { time: 194115, x: 247, y: 291, n: 7 },
  { time: 194427, x: 333, y: 263, n: 8 },
  { time: 194662, x: 289, y: 176, n: 1 },
  { time: 194740, x: 289, y: 176, n: 2 },
  { time: 194818, x: 289, y: 176, n: 3 },
  { time: 194896, x: 289, y: 176, n: 4 },
  { time: 194974, x: 289, y: 176, n: 5 },
  { time: 195052, x: 289, y: 176, n: 6 },
  { time: 195131, x: 289, y: 176, n: 7 },
  { time: 195287, x: 241, y: 218, n: 8 },
  { time: 195599, x: 183, y: 311, n: 9 },
  { time: 195912, x: 326, y: 317, n: 10 },
  { time: 196224, x: 357, y: 204, n: 11 },
  { time: 196537, x: 224, y: 224, n: 12 },
  { time: 197162, x: 258, y: 168, n: 13 },
  { time: 197318, x: 228, y: 111, n: 14 },
  { time: 197474, x: 266, y: 59, n: 15 },
  { time: 197631, x: 327, y: 78, n: 16 },
  { time: 197943, x: 411, y: 136, n: 17 },
  { time: 198412, x: 323, y: 281, n: 1 },
  { time: 199037, x: 288, y: 226, n: 2 },
  { time: 199193, x: 288, y: 226, n: 3 },
  { time: 199349, x: 225, y: 212, n: 4 },
  { time: 199506, x: 225, y: 212, n: 5 },
  { time: 199662, x: 269, y: 166, n: 6 },
  { time: 199818, x: 269, y: 166, n: 7 },
  { time: 199974, x: 332, y: 172, n: 8 },
  { time: 200287, x: 409, y: 256, n: 1 },
  { time: 200756, x: 224, y: 308, n: 2 },
  { time: 201224, x: 154, y: 129, n: 3 },
  { time: 201693, x: 336, y: 69, n: 4 }
];
// ==========================================
// AUDIO SYSTEM (Preloaded Once Globally)
// ==========================================
const hitAudio = new Audio('hit-sound.wav');
hitAudio.volume = 0.8;

function playHitSound() {
  hitAudio.currentTime = 0;
  hitAudio.play().catch(() => {});
}

const songAudio = new Audio('song.mp3');
songAudio.volume = 0.3;
let songTimer = null;

function playSong() {
  songAudio.playbackRate = GAME_SPEED;
  songAudio.currentTime = 0;
  songAudio.play().catch(() => {});
}

const endAudio = new Audio('yay.mp3');
endAudio.volume = 0.3;
let endSoundPlayed = false;

function playEndSound() {
  if (!endSoundPlayed) {
    endSoundPlayed = true;
    endAudio.currentTime = 0;
    endAudio.play().catch(() => {});
  }
}

function stopSong() {
  clearTimeout(songTimer);
  songAudio.pause();
  songAudio.currentTime = 0;
  endAudio.pause();
  endAudio.currentTime = 0;
}

// Start game button
const osuBtn = document.getElementById('osu-btn');
if (osuBtn) {
  osuBtn.addEventListener('click', () => {
    endSoundPlayed = false;
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    window.isOsuMode = true;
    closePopup();

    const scaleX = canvas.width / 512;
    const scaleY = canvas.height / 384;
    hitObjects = baseBeatmap.map(o => ({
      ...o,
      x: o.x * scaleX,
      y: o.y * scaleY,
      time: (o.time / GAME_SPEED) + COUNTDOWN_TOTAL,
      hit: false
    }));

    startTime = performance.now();
    songTimer = setTimeout(playSong, COUNTDOWN_TOTAL);
    requestAnimationFrame(osuLoop);
  });
}

// Track mouse position on canvas
window.addEventListener('mousemove', (e) => {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  osuMouse.x = e.clientX - rect.left;
  osuMouse.y = e.clientY - rect.top;
});

// Hit detection
function handleOsuHit() {
  if (!window.isOsuMode) return;
  const now = performance.now() - startTime;

  for (let obj of hitObjects) {
    if (obj.hit) continue;
    const diff = Math.abs(now - obj.time);
    const dist = Math.hypot(osuMouse.x - obj.x, osuMouse.y - obj.y);

    if (dist <= CIRCLE_RADIUS && diff <= HIT_WINDOW) {
      obj.hit = true;
      playHitSound();
      return;
    }
  }
}

window.addEventListener('mousedown', handleOsuHit);
window.addEventListener('keydown', (e) => {
  if (['z', 'x', 'Z', 'X'].includes(e.key)) handleOsuHit();
});

// Render loop: ONLY draws visuals
function osuLoop() {
  if (!window.isOsuMode) return;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const now = performance.now() - startTime;

  // Clear canvas background
  ctx.fillStyle = "#0c0414";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Countdown message
  if (now < COUNTDOWN_TOTAL) {
    const remaining = Math.ceil((COUNTDOWN_TOTAL - now) / 1000);
    ctx.fillStyle = "#ff6a00";
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Starting in ${remaining}...`, canvas.width / 2, canvas.height / 2);
  }

  // Draw active circles
  hitObjects.forEach(obj => {
    const remaining = obj.time - now;

    if (!obj.hit && remaining < -HIT_WINDOW) {
      obj.hit = true;
    }

    if (!obj.hit && remaining <= PREEMPT && remaining >= -HIT_WINDOW) {
      // Circle Body
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, CIRCLE_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = "#ff6a00";
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();

      // Number
      ctx.fillStyle = "#1a0026";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(obj.n, obj.x, obj.y);

      // Shrinking Approach Ring
      if (remaining > 0) {
        const scale = 1 + (remaining / PREEMPT) * 2;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, CIRCLE_RADIUS * scale, 0, Math.PI * 2);
        ctx.strokeStyle = "#8aff33";
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }
  });

  // End of map message & victory audio
  const lastObj = hitObjects[hitObjects.length - 1];
  if (now > lastObj.time + 1000) {
    playEndSound();

    ctx.fillStyle = "#ff6a00";
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "center";
    ctx.fillText("NICE JOBBBBBBB!!!!!", canvas.width / 2, canvas.height / 2);
    ctx.font = "20px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Click CLEAR to start drawing again!", canvas.width / 2, canvas.height / 2 + 50);
    return;
  }

  requestAnimationFrame(osuLoop);
}

// Return to drawing mode when clicking CLEAR
const clearBtnRef = document.getElementById('clear');
if (clearBtnRef) {
  clearBtnRef.addEventListener('click', () => {
    window.isOsuMode = false;
    stopSong();
  });
}