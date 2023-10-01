// Baseado no código de Daniel Shiffman
// http://youtube.com/thecodingtrain
// https://thecodingtrain.com/CodingChallenges/111-animated-sprite.html

let spritesheetInicial;
let spritesheetUsuario;
let animacaoGerada;
let taxaQuadros;

// Interface
let inputSpritesheet;
let inputNColunas;
let inputNLinhas;
let inputFrameLargura;
let inputFrameAltura;
let inputDuracao;
let sliderFrameRate;
let sliderFrameRateLabel;
let selectFormato;

// Estados
let capture;
let estadoTocando;
let estadoGravando;
let contadorFrames;

P5Capture.setDefaultOptions({
  disableUi: true,
});

function preload() {
  spritesheetInicial = loadImage("spritesheets/AnimacaoA-1400x1400-3x4.jpg");
}

function setup() {
  let canvas = createCanvas(1400, 1400);
  canvas.parent("p5js-container");
  frameRate(6);

  // spritesheet, nColunas, nLinhas, frameLargura, frameAltura, frameTotal
  animacaoGerada = new Animacao(spritesheetInicial, 3, 4, 1400, 1400, 12);

  // interface
  inputSpritesheet = createFileInput(handleFile);
  inputSpritesheet.parent('arquivo');
  inputNColunas = document.getElementById('colunasQtd');
  inputNLinhas = document.getElementById('linhasQtd');
  inputFrameLargura = document.getElementById('quadroLargura');
  inputFrameAltura = document.getElementById('quadroAltura');
  inputDuracao = document.getElementById('duracao');
  sliderFrameRate = document.getElementById('taxaDeQuadros');
  sliderFrameRateLabel = document.getElementById('rotuloTaxaDeQuadros');
  sliderFrameRateLabel.innerHTML = sliderFrameRate.value;
  selectFormato = document.getElementById('formato');
  gravacaoRetorno = document.getElementById('gravacaoRetorno')

  capture = P5Capture.getInstance();
  estadoTocando = true;
  estadoGravando = false;
  contadorFrames = 0;
  
}

function draw() {
  
  taxaQuadros = parseInt(sliderFrameRate.value);
  sliderFrameRateLabel.innerHTML = taxaQuadros;
  frameRate(taxaQuadros);
  
  animacaoGerada.exibir();

  if ( estadoTocando ) {
    contadorFrames++;
  }

  if ( capture.state === "idle" & gravacaoRetorno.classList.contains('gravando')) {
    gravacaoRetorno.classList.remove('gravando');
    estadoGravando = false;
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    spritesheetUsuario = loadImage(file.data);
    console.log("Imagem carregada");
  } else {
    spritesheetUsuario = null;
  }
}

function criarAnimacao() {

  if (spritesheetUsuario != null) {
    

    let nColunas = inputNColunas.value;
    let nLinhas = inputNLinhas.value;
    let frameLargura = inputFrameLargura.value;
    let frameAltura = inputFrameAltura.value;
    // let frameTotal = inputFrameTotal.value;
    let frameTotal = nColunas * nLinhas;
    resizeCanvas(frameLargura, frameAltura);
    
    animacaoGerada = new Animacao(spritesheetUsuario, nColunas, nLinhas, frameLargura, frameAltura, frameTotal);
  } else {
    console.log("ImagemCagada");
  }
}

function pausarTocar() {
  let botao = document.getElementById('playPause');
  estadoTocando =! estadoTocando;
  botao.innerText = estadoTocando ? 'PAUSE' : 'PLAY'
}

function gravar() {
  if (capture.state === "idle") {
    estadoGravando = true;
    contadorFrames = 0;
    gravacaoRetorno.classList.add('gravando');
    capture.start({
      format: selectFormato.value,
      framerate: taxaQuadros,
      duration: parseInt(duracao.value),
      verbose: true
    });
  } else {
    capture.stop();
    gravacaoRetorno.classList.remove('gravando');
  }
}