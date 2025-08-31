const createStore = (reducer, initState) => {
  let state = structuredClone(initState);
  const listeners = new Set();

  return {
    getState: () => state,
    subscribe: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    dispatch: (action) => {
      state = reducer(state, action);
      listeners.forEach(fn => fn(state));
    }
  };
};

const createTypes = (ns="") => Object.freeze({
  INIT: Symbol(`${ns}/INIT`),
  PUSH_G: Symbol(`${ns}/PUSH_G`),
  POP_G: Symbol(`${ns}/POP_G`),
  CLEAR: Symbol(`${ns}/CLEAR`),
  TOGGLE_MODE: Symbol(`${ns}/TOGGLE_MODE`)
});

const createActionSet = (T) => {
  const symbolKeys = new Map(Object.entries(T).map(([k, v]) => [v, k]));
  return {
    actions: Object.freeze({
      init: () => ({ type: T.INIT}),
      pushGrapheme: (grapheme) => ({ type: T.PUSH_G, payload: { grapheme } }),
      popGrapheme: () => ({ type: T.POP_G }),
      clear: () => ({ type: T.CLEAR }),
      toggleMode: () => ({ type: T.TOGGLE_MODE })
    }),
    symbolFor: (k) => symbolKeys.get(k),
    keyFor: (s) => T[s],
  };
};

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
