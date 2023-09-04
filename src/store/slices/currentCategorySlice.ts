// Redux toolkit 라이브러리에서 PayloadAction 타입과 createSlice 함수를 가져옴.
// PayloadAction: 액션 객체의 구조를 정의.
	// action 객체는 {type: string, payload: any} 형태로 되어 있음.
		// type은 액션의 종류를, payload는 액션과 관련된 데이터를 의미.
// createSlice: 상태, 리듀서, 액션 생성자를 한 번에 만드는 유틸리티. 상태의 조각을 만드는 역할을 함.
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


// 실제로 slice를 생성하는 부분.
const currentCategorySlice = createSlice({

	// name: slice의 이름으로 사용됨. 생성된 액션 타입에도 포함됨.
	name: 'currentCategory',

	// slice의 초기 상태 값. 여기서는 1로 설정했음.
	initialState: 1 as number,

	// 이 객체 내부에는 리듀서 함수들이 들어감. key 값인 currentCategory가 리듀서 함수임.
	reducers: {

		// state는 현재 상태, action은 디스패치 된 액션 객체
		currentCategory(state, action: PayloadAction<number>) {

			// 상태 변경 이전의 값
			// action.type 문자열은 대개 'sliceName/reducerName'으로 작성되어 있음.
			// 상태 변경 이후의 값: action.payload

			// 전달받은 payload 값을 그대로 반환하여 상태를 변경함
			return action.payload;
		}
	}
})

// slice가 자동으로 생성한 액션 생성자들 중에서 필요한 것(currentCategory)만 추출해서 내보냄
	// 액션 생성자: 특정 액션이 발생하도록 하는 함수. 주로 컴포넌트에서 dispatch와 함께 쓰임.
export const { currentCategory } = currentCategorySlice.actions;

// createSlice가 생성한 리듀서를 내보냄. 리듀서는 store를 만들 때 사용함.
export default currentCategorySlice.reducer;