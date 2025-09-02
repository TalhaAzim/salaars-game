import "./style.css"

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

const createReducer = (T, { validate, prefixPossible }) => {

    const LEXEMES = ["APPLE", "BABA", "BANANA", "BATH", "CAR", "CANDY", "MAMA", "PARK", "WALK", "WATER", "ZOO"];

    const GRAPHEMES = new Set(LEXEMES.flatMap(lexeme => Array.from(lexeme)));
    
    const computeAllowedNext = (s) => {
	if (s.mode === 'SANDBOX') return new Set (GRAPHEMES);
    }
}
