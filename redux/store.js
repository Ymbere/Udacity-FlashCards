import reducers from "./reducers"
import middlaware from "./middleware"
import { createStore } from "redux";

const store = createStore(reducers, middlaware)

export default store
