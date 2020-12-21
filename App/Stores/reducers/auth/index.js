
export const Types = {
  SIGN_IN_REQUEST: 'auth/SIGN_IN_REQUEST',
  SUBSCRIBE_USER_REQUEST: 'auth/SUBSCRIBE_USER_REQUEST',
  SET_AUTH_LOADING: 'auth/SET_AUTH_LOADING',
  SET_SIGNED: 'auth/SET_SIGNED',
  SET_AUTH_ERROR: 'auth/SET_AUTH_ERROR',
  SET_SIGNOUT: 'auth/SET_SIGNOUT',
  SIGN_OUT_REQUEST: 'auth/SIGN_OUT_REQUEST',
}

export const Creators = {
  sigInRequest: (email, password) => ({
      type: Types.SIGN_IN_REQUEST,
      payload: {
        email,
        password
      }
    }),

  subscribeUserRequest: (payload) => ({
      type: Types.SUBSCRIBE_USER_REQUEST,
      payload
    }),

    setAuthLoading: (payload) => ({
      type: Types.SET_AUTH_LOADING,
      payload
    }),

  setSigned: (payload) => ({
    type: Types.SET_SIGNED,
    payload
  }),

  setAuthError: (payload) => ({
    type: Types.SET_AUTH_ERROR,
    payload
  }),

  setSignOut: (payload) => ({
    type: Types.SET_SIGNOUT,
    payload
  }),

  signOutRequest: (payload) => ({
    type: Types.SIGN_OUT_REQUEST,
    payload
  }),
}

const INITIAL_STATE = {
  signed: false,
  authError: null,
  user: {},
  loading: false,
}

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_AUTH_LOADING:
      return {
        ...state,
          loading: action.payload
      }

    case Types.SET_SIGNED:
      return {
        ...state,
          signed: true,
          user: action.payload
      }

    case Types.SET_AUTH_ERROR:
      return {
        ...state,
        authError: action.payload.error
      }

    case Types.SET_SIGNOUT:
      return {
        user: {
          ...state.user,
          token: null,
        },
        signed: false
      }
    default:
      return state
  }
}