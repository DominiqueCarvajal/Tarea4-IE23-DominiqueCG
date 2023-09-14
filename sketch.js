let gotas = [];
let spreadSlider;
let fondo; // Variable para la imagen de fondo

function preload() {
  // Carga la imagen de fondo
  fondo = loadImage('montaña2.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Crear un control deslizante para ajustar la forma de las gotas
  spreadSlider = createSlider(0, 10, 0, 0.1); // Rango de 0 a 10, valor inicial 0, paso de 0.1
  spreadSlider.position(20, 20); // Posición del control deslizante en el lienzo
  spreadSlider.input(cambiarForma); // Llamar a la función cambiarForma cuando se cambie el valor del control deslizante
}

function draw() {
  // Dibuja la imagen de fondo en el lienzo
  image(fondo, 0, 0, width, height);

  // Obtener el valor actual del control deslizante y almacenarlo en la variable `spread`
  let spread = spreadSlider.value();

  // Crea nuevas gotas aleatoriamente
  if (random(1) < 0.1) {
    let x = random(width); // Posición horizontal aleatoria
    let y = -20; // Empieza desde la parte superior del lienzo
    let tamaño = random(10, 20); // Tamaño aleatorio para la gota
    let velocidad = random(2, 5); // Velocidad de caída aleatoria
    let g = new Gota(x, y, tamaño, velocidad, spread);
    gotas.push(g);
  }

  // Actualiza y muestra las gotas
  for (let i = gotas.length - 1; i >= 0; i--) {
    gotas[i].caer();
    gotas[i].mostrar();
  }

  // Elimina las gotas que salen del lienzo
  for (let i = gotas.length - 1; i >= 0; i--) {
    if (gotas[i].fueraDelLienzo()) {
      gotas.splice(i, 1);
    }
  }
}

function cambiarForma() {
  let spread = spreadSlider.value();
  for (let i = 0; i < gotas.length; i++) {
    gotas[i].cambiarForma(spread);
  }
}

class Gota {
  constructor(x, y, tamaño, velocidad, spread) {
    this.x = x;
    this.y = y;
    this.tamaño = tamaño;
    this.velocidad = velocidad;
    this.spread = spread;
    this.formaOriginal = true;
  }

  caer() {
    this.y += this.velocidad;
  }

  mostrar() {
    fill(173, 216, 230); // Color celeste para las gotas

    // Forma de gota o copo de nieve en función del valor de `spread`
    if (this.spread < 5) {
      if (this.formaOriginal) {
        // Forma de gota personalizada
        beginShape();
        vertex(this.x, this.y);
        bezierVertex(this.x - this.tamaño / 2, this.y + this.tamaño / 2, this.x + this.tamaño / 2, this.y + this.tamaño / 2, this.x, this.y);
        endShape(CLOSE);
      }
    } else {
      this.formaOriginal = false;
      // Forma de copo de nieve
      // Personaliza la forma del copo de nieve aquí
      // Por ejemplo, puedes dibujar una forma de copo de nieve utilizando líneas
      let tamañoCopo = this.tamaño * 0.6;
      fill(173, 216, 230); // Color celeste para el copo de nieve
      stroke(173, 216, 230); // Color celeste para el contorno del copo de nieve
      strokeWeight(2);
      line(this.x, this.y - tamañoCopo, this.x, this.y + tamañoCopo);
      line(this.x - tamañoCopo, this.y, this.x + tamañoCopo, this.y);
      line(this.x - tamañoCopo / 1.5, this.y - tamañoCopo / 1.5, this.x + tamañoCopo / 1.5, this.y + tamañoCopo / 1.5);
      line(this.x - tamañoCopo / 1.5, this.y + tamañoCopo / 1.5, this.x + tamañoCopo / 1.5, this.y - tamañoCopo / 1.5);
    }
  }

  fueraDelLienzo() {
    return this.y > height;
  }

  cambiarForma(spread) {
    this.spread = spread;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


