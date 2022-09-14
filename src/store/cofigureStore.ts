import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from '../reducers';
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from "../sagas";


const configureStore = () => {

    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];

    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))

    const store = createStore(rootReducer, enhancer);

	//saga #2
    sagaMiddleware.run(rootSaga);
    return store;
}


export default configureStore