import { useReducer } from "react";

const LOADING_STATE = 1;
const ERROR_STATE = -1;

const initialState = { isLoading: false, result: [], errorMsg: null };

const currStateReducer = (_, action) => {
  switch (action?.type || "") {
    case LOADING_STATE:
      return {
        errorMsg: null,
        isLoading: action.payload[0],
        result: action.payload[1],
      };
    case ERROR_STATE:
      return { isLoading: false, result: [], errorMsg: action.payload };
    default:
      return initialState;
  }
};

const useHttp = () => {
  const [currState, dispatchCurrState] = useReducer(
    currStateReducer,
    initialState
  );

  const sendRequest = async (requestConfig) => {
    try {
      dispatchCurrState({ type: LOADING_STATE, payload: [true, []] });

      const resultJSON = await fetch(requestConfig.url, {
        method: requestConfig.method || "GET",
        headers: requestConfig.headers || {},
        body: JSON.stringify(requestConfig.body) || null,
      });

      if (!resultJSON.ok) throw new Error("Error fetching data");

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
      dispatchCurrState({ type: ERROR_STATE, payload: e.message });
    }
  };

  return [
    currState.isLoading,
    currState.errorMsg,
    currState.result,
    sendRequest,
  ];
};

export default useHttp;
