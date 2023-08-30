import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type User = {
  _id: string;
  login: string;
  password: string;
}

type stateApp = {
  user: User[];
  error: null | string | unknown;
  signUp: boolean;
  signIn: boolean;
  token: string | null;
}

const initialState: stateApp = {
  user: [],
  error: null,
  signIn: false,
  signUp: false,
  token: localStorage.getItem("token"),
};

export const authSignUp = createAsyncThunk<
  string,
  User,
  { rejectValue: unknown; state: RootState }
>("auth/signup", async ({ login, password }, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });
    const json = await res.json();
    if (json.error) {
      return thunkAPI.rejectWithValue(json.error);
    }
    return json;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});
export const authSignIn = createAsyncThunk<string, User, {rejectValue: unknown, state: RootState}>(
  "auth/signIin",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const token = await res.json();
      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      localStorage.setItem("token", token.token);
      return token.token;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.pending, (state) => {
        (state.signUp = true), (state.error = null);
      })
      .addCase(authSignUp.rejected, (state, action) => {
        (state.signUp = false), (state.error = action.payload);
      })
      .addCase(authSignUp.fulfilled, (state) => {
        (state.signUp = false), (state.error = null);
      })
      .addCase(authSignIn.pending, (state) => {
        (state.signIn = true), (state.error = null);
      })
      .addCase(authSignIn.rejected, (state, action) => {
        (state.error = action.payload), (state.signIn = false);
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        (state.signIn = false),
          (state.error = null),
          (state.token = action.payload);
      });
  },
});
export default applicationSlice.reducer;
