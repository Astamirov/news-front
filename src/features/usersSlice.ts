import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store';

type User = {
    _id: string;
    login: string;
    password: string
}

type StateUsers = {
    users: User[];
}

const initialState: StateUsers = {
    users: [],
}

export const fetchUsers = createAsyncThunk<User[], void, {rejectValue: unknown; state: RootState}>(
    'users/fetch',
    async (_, thunkAPI) => {
        try {
            const res = await fetch('http://localhost:4000/users', {
                headers: {
                    Authorization: `Bearer ${thunkAPI.getState().application.token}`
                },
            })

            const users = await res.json()

            if (users.error) {
                return thunkAPI.rejectWithValue(users.error)
            }
            return users;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        })
    }
})

export default usersSlice.reducer