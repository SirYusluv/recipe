import { useContext, useEffect, useReducer } from "react";
import AlertContext from "../store/alert-context";
import { MSG_ERR_FETCH_DATA } from "../util/config";

const LOADING_STATE = 1;
const ERROR_STATE = -1;

const initialState = {
  isLoading: false,
  result: [],
  errorMsg: null,
};

const currStateReducer = (_, action) => {
  switch (action?.type || "") {
    case LOADING_STATE:
      return {
        errorMsg: null,
        isLoading: action.payload[0],
        result: action.payload[1],
      };
    case ERROR_STATE:
      return {
        isLoading: false,
        result: [],
        errorMsg: action.payload[0],
      };
    default:
      return initialState;
  }
};

const useHttp = () => {
  const alertCtx = useContext(AlertContext);
  const [currState, dispatchCurrState] = useReducer(
    currStateReducer,
    initialState
  );

  useEffect(() => {
    if (!currState.errorMsg) return;
    alertCtx.setIsShown(true);
  }, [currState.errorMsg]);

  const errHandledHandler = () => {
    alertCtx.setIsShown(false);
  };

  const sendRequest = async (requestConfig) => {
    try {
      dispatchCurrState({ type: LOADING_STATE, payload: [true, []] });

      const resultJSON = await fetch(requestConfig.url, {
        method: requestConfig.method || "GET",
        headers: requestConfig.headers || {},
        body: JSON.stringify(requestConfig.body) || null,
      });

      if (!resultJSON.ok) throw new Error(MSG_ERR_FETCH_DATA);

      const resultFetched = await resultJSON.json();
      // React API context is actually headach, i had to change so much lines of codes
      // cause it sometimes has error while trying to update state, i see why redux is better
      // dispatchCurrState({ type: LOADING_STATE, payload: false });
      // applyData(resultFetched);
      dispatchCurrState({
        type: LOADING_STATE,
        payload: [false, resultFetched],
      });
    } catch (e) {
      dispatchCurrState({ type: ERROR_STATE, payload: [e.message] });
    }
  };

  return [
    currState.isLoading,
    currState.errorMsg,
    currState.result,
    sendRequest,
    errHandledHandler,
  ];
};

export default useHttp;
