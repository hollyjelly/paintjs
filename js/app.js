const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //여러가지의 context 중 2d를 사용
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const initial_color = "#000";
const canvas_size = 700;

let painting = false;
let filling = false;

canvas.width = canvas_size;
canvas.height = canvas_size; // css 뿐만 아니라 픽셀이 움직일 수있는 공간을 지정해줘야함.
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas_size, canvas_size)
ctx.strokeStyle = initial_color; //선 색상
ctx.fillStyle =  initial_color; // 네모에 채워지는 색상
ctx.lineWidth = 2.5; // 선 크기?를 중간 사이즈로 줌 (최소 0.1에서 최대 5);

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ // 마우스를 움직이는 내내 만들어짐
        ctx.beginPath(); //클릭하지 않고 마우스를 움직였을 때는 path(선)를 시작
        ctx.moveTo(x,y); // 마우스를 x,y좌표로 선이 만들어질 수 있게 한다고 보면 됨.
    }else{
        ctx.lineTo(x,y); // 마지막 지점을 특정 좌표로 연결
        ctx.stroke(); // path로 만들어지는 선을 stroke로 눈에 보여질 수 있게 만들어줌.
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling == true){
        filling = false;
        mode.innerText = "Fill"
    }else{
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas_size, canvas_size); // 네모를 만들어줘서 채워지는 효과를 만들어 줄것임.
    }
}

function handleCM(event){
    event.preventDefault(); // 우클릭 방지
    
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJs[🎨]";
    link.click();
}


if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
    
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));


if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}