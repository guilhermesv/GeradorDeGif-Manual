// Daniel Shiffman
// http://youtube.com/thecodingtrain
// https://thecodingtrain.com/CodingChallenges/111-animated-sprite.html

// Horse Spritesheet from
// https://opengameart.org/content/2d-platformer-art-assets-from-horse-of-spring

// Animated Sprite
// https://youtu.be/3noMeuufLZY

class Animacao {
  constructor(spritesheet, nColunas, nLinhas, frameLargura, frameAltura, frameTotal) {
    this.spritesheet = spritesheet;
    this.nColunas = nColunas;
    this.nLinhas = nLinhas;
    this.frameLargura = frameLargura;
    this.frameAltura = frameAltura;
    this.framteTotal = frameTotal;
    this.animacao = [];

    let frameTemp;

    for (let i = 0; i < this.nLinhas; i++) {
      for (let j = 0; j < this.nColunas; j++) {
        let x = j * this.frameLargura;
        let y = i * this.frameAltura;
        frameTemp = this.spritesheet.get(x, y, this.frameLargura, this.frameAltura);
        this.animacao.push(frameTemp);
      }
    }
  }

  exibir() {
    let frame = frameCount % this.animacao.length;
    image(this.animacao[frame], 0, 0);
  }
  
}
