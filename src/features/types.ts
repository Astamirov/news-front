import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

type User = {
    _id: string;
    login: string;
    password: string
}

type StateTodos = {
    user: User[];
    signingUp: boolean;
    signingIn: boolean;
    token: string | null;
    error: string | null | unknown;
}

const initialState: StateTodos = {
    user: [],
    error: null,
    signingUp: false,
    signingIn: false,
    token: localStorage.getItem('token'),
}

export const authSignUp = createAsyncThunk<
    User,
    User,
    {rejectValue: unknown; state: RootState}
>(
    'auth/signup',
    async ({login, password}, thunkAPI) => {
        try {
            const res = await fetch('http://localhost:4000/users', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({login, password}),
            })

            const json = await res.json()

            if(json.error) {
                return thunkAPI.rejectWithValue(json.error)
            }

            return json

        } catch(e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)

export const authSignIn = createAsyncThunk<
    string,
    User,
    { rejectValue: unknown; state: RootState }
    >(
    'auth/signin', 
    async ({login, password}, thunkAPI) => {
        try {
            const res = await fetch('http://localhost:4000/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({login, password}),
            })
            const token = await res.json()

            if(token.error) {
                return thunkAPI.rejectWithValue(token.error)
            }   

            localStorage.setItem('token', token.token)
            return token.token
        } catch(e) {
            thunkAPI.rejectWithValue(e)
        }
        
    }
)

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(authSignUp.pending, (state) => {
            state.signingUp = true
            state.error = null
        })
        .addCase(authSignUp.rejected, (state, action) => {
            state.signingUp = false
            state.error = action.payload
        })
        .addCase(authSignUp.fulfilled, (state) => {
            state.signingUp = false
            state.error = null
        })
        .addCase(authSignIn.pending, (state) => {
            state.signingIn = true
            state.error = null
        })
        .addCase(authSignIn.rejected, (state, action) => {
            state.signingIn = false
            state.error = action.payload
        })
        .addCase(authSignIn.fulfilled, (state, action) => {
            state.signingIn = false
            state.error = null
            state.token = action.payload
        })
    },
})

export default applicationSlice.reducer
