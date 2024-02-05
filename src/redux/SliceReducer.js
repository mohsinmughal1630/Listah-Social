import {
  SET_ALL_USER_FCM,
  SET_CATEGORIES_LIST,
  SET_IS_UN_READED,
  SET_PUSH_NOTI,
  SET_SHOW_SPLASH,
  SET_UPDATE_FB_TOKEN,
  SET_APP_LOADER,
  SET_THREAD_LIST,
  SET_HIDE_TAB,
  SET_SHOW_TOAST,
} from "./action/types";

const initialState = {
  allUserFCMToken: [],
  updateToken: true,
  push_Noti: null,
  isShowSplash: true,
  isUnReaded: false,
  categoriesList: [],
  threadList: [],
  isLoaderStart: false,
  isHideTabBar: false,
  showToast: "",
};
const SliceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_USER_FCM:
      return {
        ...state,
        allUserFCMToken: action.data,
      };

    case SET_UPDATE_FB_TOKEN:
      return {
        ...state,
        updateToken: action.data,
      };
    case SET_PUSH_NOTI:
      return {
        ...state,
        push_Noti: action.data,
      };
    case SET_SHOW_SPLASH:
      return {
        ...state,
        isShowSplash: action.data,
      };
    case SET_IS_UN_READED:
      return {
        ...state,
        isUnReaded: action.data,
      };
    case SET_CATEGORIES_LIST:
      return {
        ...state,
        categoriesList: action.data,
      };
    case SET_THREAD_LIST:
      return {
        ...state,
        threadList: action.data,
      };
    case SET_HIDE_TAB:
      return {
        ...state,
        isHideTabBar: action.data,
      };
    case SET_APP_LOADER:
      return {
        ...state,
        isLoaderStart: action.data,
      };
    case SET_SHOW_TOAST:
      return {
        ...state,
        showToast: action.data,
      };
    default:
      return state;
  }
};
export default SliceReducer;
