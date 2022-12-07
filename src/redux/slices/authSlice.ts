import { useAppDispatch } from './../../hooks/reduxHooks';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Define a type for the slice state
interface AuthState {
  email: string,
  token: string,
  refreshToken: string
}

// Define the initial state using that type
const initialState: AuthState = {
  email: "",
  token: "",
  refreshToken: ""
}

type Login = {
  email: string,
  password: string
}

const user = {
  email: "test@test.com",
  password: "Admin@123"
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const {email,refreshToken,token} = action.payload;
      state.email = email;
      state.refreshToken= refreshToken;
      state.token = token;
    },  
    logout: (state) => {
      state.email = "";
      state.token = "";
      state.refreshToken = "";
    },
  },
})

export const {setToken, logout, setCredentials } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth

export default authSlice.reducer