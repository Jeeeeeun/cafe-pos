// combineReducers: 여러 개의 리듀서를 하나로 합치는 역할. 이렇게 하나로 합쳐진 리듀서를 root reducer라고 함.
import { combineReducers } from "@reduxjs/toolkit";

// currentCategoryReducer: 선택된 카테고리의 상태 업데이트 로직을 담고 있는 리듀서
// { currentCategory }: 특정 카테고리가 선택되었음을 나타내는 액션을 dispatch하는 함수.
import currentCategoryReducer from "./currentCategorySlice";
import menuEditorReducer  from "./menuEditorSlice";

// 모든 리듀서를 합쳐 하나의 root reducer를 만듦.
const rootReducer = combineReducers({

	// 이 객체 내부의 key로서 동작하는 currentCategory가 상태 트리(state tree) 내부에서 바로 그 state slice에 접근하기 위한 key 값으로 쓰임.
	// 접근 시 state.currentCategory의 형태로 쓸 수 있음.
	currentCategory: currentCategoryReducer,
	menuEditor: menuEditorReducer,
});

// rootReducer를 기본적으로 내보냄.
export default rootReducer;

// 이렇게 rootReducer로 합쳐서 store로 보내는 이유
// store는 단 하나의 reducer밖에 못 가짐.
// 여러 개의 slice로 각각의 reducer가 있는 경우는 그래서 이렇게 하나로 합쳐줘야 함.