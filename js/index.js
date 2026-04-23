const w_eye_c = document.getElementById('w-eye-c'); // white eye closed
const w_eye_o = document.getElementById('w-eye-o'); // white eye open
const b_eye_c = document.getElementById('b-eye-c'); // black eye closed
const b_eye_o = document.getElementById('b-eye-o'); // black eye open

const s = document.getElementById('sun')
const m = document.getElementById('moon')

const afterReady = document.getElementById('afterReady');

const ChangeColor = document.getElementById('changeColor');
const ChangeView = document.getElementById('changeView'); 
const textarea = document.getElementById('textarea');
const ready = document.getElementById('ready');
const download = document.getElementById('download');

let whiteMode = false;
let eyeClosed = false;
let switchRdy = false;

/* COLORS */

function applyTheme() {
    const root = document.documentElement;

    if(whiteMode){
        root.style.setProperty('--mainBgColor', '#dedede');
        root.style.setProperty('--titleColor', '#000000');
        root.style.setProperty('--textAreaBgColor', '#e4e4e4');
        root.style.setProperty('--buttonBgColor', '#e4e4e4');

        s.style.display = 'flex'
        m.style.display = 'none'

    }else{
        root.style.setProperty('--mainBgColor', '#1d1d1d');
        root.style.setProperty('--titleColor', '#ffffff');
        root.style.setProperty('--textAreaBgColor', '#242424');
        root.style.setProperty('--buttonBgColor', '#242424');

        s.style.display = 'none'
        m.style.display = 'flex'
    }
}

function applyView(){
    w_eye_c.style.display = 'none'; w_eye_o.style.display = 'none';
    b_eye_c.style.display = 'none'; b_eye_o.style.display = 'none';
    
    !whiteMode && eyeClosed ? w_eye_c.style.display= 'flex' :!whiteMode && !eyeClosed ? w_eye_o.style.display= 'flex' : null
    whiteMode && eyeClosed ? b_eye_c.style.display = 'flex' : whiteMode && !eyeClosed ? b_eye_o.style.display= 'flex' : null

    eyeClosed ? textarea.style.fontSize = '0px' : textarea.style.fontSize = '17px'
}

function changeColor(load = true){
    load ? whiteMode = !whiteMode : null
    applyTheme()
    applyView()
}

function changeView(){
    eyeClosed = !eyeClosed
    applyView()
}

function changeReady(load = true){
    load ? switchRdy = !switchRdy : null
    switchRdy ? afterReady.style.display = 'flex' : afterReady.style.display = 'none'
}

function saveTxt(){
    let text = textarea.value
    let archiveName = "NOCSMT.txt"

    if(text==''){
        alert('Eu não irei salvar um arquivo de texto vazio...')
        return;
    }

    const blob = new Blob([text], {type: 'text/plain'})

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = archiveName

    link.click();
    URL.revokeObjectURL(link.href);
}

ChangeColor.onclick = () => changeColor()
ChangeView.onclick = () => changeView()
ready.onclick = () => changeReady()
download.onclick = () => saveTxt()

function load(){
    let text = localStorage.getItem("text");
    if(text !== null){
        textarea.value = text;
    }
}

function save(){
    localStorage.setItem("text", textarea.value);
}

// carrega quando o site abrir
window.onload = load;

// salva a cada 100ms
setInterval(() => {
    save();
}, 100);

textarea.addEventListener("input", () => {
    localStorage.setItem("text", textarea.value);
});

changeColor(false)
changeReady(false)