// Redux store를 설정하는 파일
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/rootReducer";

const store = configureStore({
	reducer: rootReducer, // rootReducer를 사용해 store를 설정함
});

// RootState라는 type을 생성함. RootState를 return하는 rootReducer를 반환하는 ReturnType을 사용함.
export type RootState = ReturnType<typeof rootReducer>;

// app의 dispatch type을 가져옴
export type AppDispatch = typeof store.dispatch;

// store를 기본값으로 내보냄. 이 store를 전체 app에서 사용할 수 있음
export default store;