import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/response/IUser';
import AuthService from '../services/AuthService';
import { AuthResponse } from '../models/response/Auth-response';
import axios from 'axios';
import { API_URL } from '../http';

interface AuthState {
  user: IUser;
  isAuth: boolean;
}

export const initialState: AuthState = {
  user: {} as IUser,
  isAuth: false,
};

// login
export const login = createAsyncThunk<IUser, { email: string; password: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      return response.data.user;
    } catch (error: any) {
      console.error(error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// registration
export const registration = createAsyncThunk<IUser, { email: string; password: string }>(
  'auth/registration',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
      return response.data.user;
    } catch (error: any) {
      console.error(error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// logout
export const logout = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
    } catch (error: any) {
      console.error(error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// checkAuth
export const checkAuth = createAsyncThunk<IUser, void>(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
      return response.data.user;
    } catch (error: any) {
      console.error(error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.user = {} as IUser;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuth = false;
        state.user = {} as IUser;
      });
  },
});

export const { setAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
