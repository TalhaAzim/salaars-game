class App {
  constructor(attrs) {
    this.init = attrs.init;
    this.state = structuredClone(this.init);
    this.root = attrs.root;
    this.root.appendChild(document.createElement('game-shell'));
  }
}

class GameShell extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.appendChild(document.createElement('image-visor'));
    this.appendChild(document.createElement('word-assembly'));
    this.appendChild(document.createElement('tile-box'));
  }
}
customElements.define('game-shell', GameShell);

class ImageVisor extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.elem = document.createElement('div');
    this.elem.textContent = "Image Visor";
    this.appendChild(this.elem);
  }
}
customElements.define('image-visor', ImageVisor);

class WordAssembly extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.elem = document.createElement('div');
    this.elem.textContent = "Assembly area";
    this.appendChild(this.elem);
  }
}

customElements.define('word-assembly', WordAssembly);

class TileBox extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.elem = document.createElement('div');
    this.elem.textContent = "Tile box";
    this.appendChild(this.elem);
  }
}
customElements.define('tile-box', TileBox);

const app = new App({
  init: {
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  },
  root: document.getElementById('root')
});
