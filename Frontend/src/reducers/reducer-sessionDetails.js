const INITIAL_STATE = {
  sessionDetails: { values: [], error: null, loading: false },
};

export default function (state = INITIAL_STATE, action) {
  return {
    ...state,
    sessionDetails: { values: action.payload, error: null, loading: true },
  };
}
