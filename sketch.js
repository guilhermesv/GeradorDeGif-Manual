// Baseado no código de Daniel Shiffman
// http://youtube.com/thecodingtrain
// https://thecodingtrain.com/CodingChallenges/111-animated-sprite.html

let spritesheetInicial;
let spritesheetUsuario;
let animacaoGerada;

// Interface
let inputSpritesheet;
let inputNColunas;
let inputNLinhas;
let inputFrameLargura;
let inputFrameAltura;
let inputFrameTotal;
let sliderFrameRate;
let buttonCriarAnimacao;


function preload() {
  spritesheetInicial = loadImage("spritesheets/AnimacaoA-1400x1400-3x4.jpg");
}

function setup() {
  let canvas = createCanvas(700, 700);
  canvas.parent("p5js-container");
  frameRate(6);

  // spritesheet, nColunas, nLinhas, frameLargura, frameAltura, frameTotal
  animacaoGerada = new Animacao(spritesheetInicial, 3, 4, 1400, 1400, 12);

  // interface
  inputSpritesheet = createFileInput(handleFile);
  inputSpritesheet.parent('interface');

  inputNColunas = createInput(3, 'number');
  inputNColunas.parent('interface');

  inputNLinhas = createInput(6, 'number');
  inputNLinhas.parent('interface');

  inputFrameLargura = createInput(1400, 'number');
  inputFrameLargura.parent('interface');

  inputFrameAltura = createInput(1400, 'number');
  inputFrameAltura.parent('interface');

  inputFrameTotal = createInput(12, 'number');
  inputFrameTotal.parent('interface');

  buttonCriarAnimacao = createButton('Gerar nova animação');
  buttonCriarAnimacao.mousePressed(criarAnimacao);
  buttonCriarAnimacao.parent('interface');

  sliderFrameRate = createSlider(1, 30, 12, 1);
  sliderFrameRate.parent('interface');

  
  
}

function draw() {
  frameRate(sliderFrameRate.value());
  
  // scale(0.5);
  animacaoGerada.exibir();
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    spritesheetUsuario = loadImage(file.data);
    console.log("Imagem carregada");
  } else {
    spritesheetUsuario = null;
  }
}

function criarAnimacao() {

  if (spritesheetUsuario != null) {
    

    let nColunas = inputNColunas.value();
    let nLinhas = inputNLinhas.value();
    let frameLargura = inputFrameLargura.value();
    let frameAltura = inputFrameAltura.value();
    let frameTotal = inputFrameTotal.value();
    resizeCanvas(frameLargura, frameAltura);
    
    animacaoGerada = new Animacao(spritesheetUsuario, nColunas, nLinhas, frameLargura, frameAltura, frameTotal);
  } else {
    console.log("ImagemCagada");
  }
}

// let spritesheet;
// let colunas = 3;
// let linhas = 4;
// let frameLargura = 1400;
// let frameAltura = 1400;
// let animacao = [];

// function preload() {
//   spritesheet = loadImage("spritesheets/2020-09-05-0001-600dpi.jpg");
// }

// function setup() {
//   createCanvas(1400, 1400);
//   frameRate(6);

//   let frameTemp;

//   for (let i = 0; i < linhas; i++) {
//     for (let j = 0; j < colunas; j++) {
//       let x = j * frameLargura;
//       let y = i * frameAltura;
//       frameTemp = spritesheet.get(x, y, frameLargura, frameAltura);
//       animacao.push(frameTemp);
//     }
//   }
// }

// function draw() {
//   background(0);
//   let frame = frameCount % animacao.length;
//   image(animacao[frame], 0, 0);
// }
