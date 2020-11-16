import { createStore } from "redux";
import usuarioReducer from "./usuarioReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "site-eventos",
  storage,
};

const reducer = persistReducer(persistConfig, usuarioReducer);

const store = createStore(reducer);
const persistor = persistStore(store);

export { store, persistor };
