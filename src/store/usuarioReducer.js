const INITIAL_STATE = {
  usuarioEmail: "",
  usuarioLogado: false,
};

const usuarioReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        usuarioLogado: 1,
        usuarioEmail: action.usuarioEmail,
      };
    case "LOG_OUT":
      return {
        ...state,
        usuarioLogado: 0,
        usuarioEmail: null,
      };
    default:
      return state;
  }
};

export default usuarioReducer;
