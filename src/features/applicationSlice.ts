import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type Comment = {
  _id: string;
  text: string;
  author: {
    _id: string;
    login: string;
  };
};

export type Article = {
  _id: string;
  imageUrl: string;
  category: string;
  date: string;
  title: string;
  text: string;
  comments: Comment[];
};

type StateApp = {
    token: string | null;
    error: string | null | unknown;
    articles: Article[]; // Добавляем поле articles
};

const initialState: StateApp = {
  error: null,
  token: localStorage.getItem('token'),
  articles: [], // Инициализируем поле articles пустым массивом
};

export const fetchArticles = createAsyncThunk<Article[], void, {rejectValue: unknown; state: RootState}>(
  'article/fetchArticle',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/articles`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchArticleById = createAsyncThunk<Article, string, { rejectValue: unknown; state: RootState }>(
    'article/fetchArticleById',
    async (articleId, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:4000/articles/${articleId}`);
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

export const postComment = createAsyncThunk<
  Comment,
  { articleId: string | undefined; commentText: string },
  { rejectValue: unknown; state: RootState }
>(
  'article/postComment',
  async ({ articleId, commentText }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().application.token; 

      const response = await fetch(`http://localhost:4000/articles/${articleId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: commentText }),
      });

      const data = await response.json();

      if (data.success) {
        return data.comment;
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Остальные thunk-функции (authSignUp, authSignIn) оставляем без изменений

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        const articleIndex = state.articles.findIndex(article => article._id === action.payload._id);
        state.articles[articleIndex] = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        const articleIndex = state.articles.findIndex(article => article._id === action.payload._id);
        state.articles[articleIndex].comments.push(action.payload);
      })
      .addCase(postComment.rejected, (state, action) => {
        state.error = action.payload;
      })

  },
});

export default applicationSlice.reducer;
