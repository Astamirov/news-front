import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type Comment = {
  _id: string;
  text: string;
  error: string | null | unknown;
  author: {
    _id: string;
    login: string;
  };
  username: string | null;
};

export type Article = {
  _id: string;
  imageUrl: string;
  category: string;
  date: string;
  title: string;
  text: string;
  comments: Comment[];
  loading: boolean;
};

type StateApp = {
    token: string | null;
    error: string | null | unknown;
    articles: Article[];
    username: string | null;
    userId: string | null;
};

const initialState: StateApp = {
  error: null,
  token: localStorage.getItem('token'),
  articles: JSON.parse(localStorage.getItem('articles') || '[]'),
  username: null, // Инициализируем поле articles пустым массивом
  userId: null,
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
    async (articleId, { rejectWithValue, getState }) => {
      try {
        const token = getState().application.token;
        const response = await fetch(`http://localhost:4000/articles/${articleId}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
              },
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  

export const postComment = createAsyncThunk<
  Comment,
  { articleId: string | undefined; commentText: string; author: { login: string } },
  { rejectValue: unknown; state: RootState }
>(
  'article/postComment',
  async ({ articleId, commentText, author}, thunkAPI) => {
    const token = thunkAPI.getState().application.token;

    try {
      const response = await fetch(`http://localhost:4000/articles/${articleId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: commentText, author }),
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

export const removeComment = createAsyncThunk<
    string, 
    { articleId: string, commentId: string }, 
    {rejectValue: string;  state: RootState}
    >('comment/removeComment', async ({ articleId, commentId }, thunkAPI) => {
        const token = thunkAPI.getState().application.token;
        try{
            const res = await fetch(`http://localhost:4000/articles/${articleId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
            });
            if(res.ok) {
                return commentId;
            }
            const comment = await res.json()
            return thunkAPI.rejectWithValue(comment)
        } catch (error) {
            return thunkAPI.rejectWithValue((error as Error).message)
        }
});


const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
        localStorage.setItem('articles', JSON.stringify(action.payload));
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        const articleIndex = state.articles.findIndex(article => article._id === action.payload._id);

        if (articleIndex !== -1) {
            state.articles[articleIndex] = action.payload;
        }
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.username = action.payload.author.login
        const articleIndex = state.articles.findIndex(article => article._id === action.payload._id);
        if (articleIndex !== -1) {
            state.articles[articleIndex].comments.push(action.payload);
          }
      })
      .addCase(postComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.error = null;
        state.userId = action.meta.arg.commentId
        
    })
    .addCase(removeComment.rejected, (state, action: PayloadAction<string | unknown>) => {
        state.error = action.payload;
    })
    .addCase(removeComment.pending, (state, action: PayloadAction<void, string, {arg: string | unknown}>) => {
        state.articles = state.articles.map((article) => {
            if(article._id === action.meta.arg) {
                article.loading = true;
            }
            return article;
        })
    })
  },
});

export default applicationSlice.reducer;
