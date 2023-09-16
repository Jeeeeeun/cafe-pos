import axios from 'axios';

export const menuLists = async () => {
	try {

		let response = await axios.get("http://localhost:8080/api/showAllMenus");
		return response.data;

	} catch (e) {
		console.error("메뉴 목록을 가져오는 데 실패했습니다. - ", e);
	}
}

export const allMenusWithOptions = async () => {
	try {

		let response = await axios.get("http://localhost:8080/api/getAllMenusWithOptions");
		return response.data;

	} catch (e) {
		console.error("메뉴와 옵션 데이터를 가져오는 데 실패했습니다. - ", e);
	}
}