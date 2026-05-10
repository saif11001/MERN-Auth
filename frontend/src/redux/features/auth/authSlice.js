import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk('auth/signup',
    async (formData, thunkAPI) => {
        try {
            const res = await fetch("/api/v1/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(!res.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const verifyEmail = createAsyncThunk('auth/verifyEmail',
    async (code, thunkAPI) => {
        try {
            const res = await fetch("/api/v1/auth/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ code }),
            });
            
            const data = await res.json();
            
            if(!res.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
)

export const login = createAsyncThunk('auth/login', 
    async ({email, password}, thunkAPI) => {
        try {            
            const res = await fetch("/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password })
            });
            
            const data = await res.json();
            
            if(!res.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }
            
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const checkAuth = createAsyncThunk('auth/checkAuth', 
    async (_, thunkAPI) => {
        try {
            const res = await fetch("/api/v1/auth/check-auth", {
                method: "GET",
                credentials: "include",
            })
            const data = await res.json();

            if(!res.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const logout = createAsyncThunk('auth/logout',
    async (_, thunkAPI) => {
        try {
            const res = await fetch("/api/v1/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            const data = await res.json();

            if(!res.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const forgetPassword = createAsyncThunk('auth/forgetPassword', 
    async (email, thunkAPI) => {
        try {
            const res = await fetch("/api/v1/auth/forget-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email }),
            })

            const data = await res.json();

            if(!res.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }
            
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const resetPassword = createAsyncThunk('auth/resetPassword', 
    async ({ token, password }, thunkAPI ) => {
        try {
            const res = await fetch(`/api/v1/auth/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if(!res.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getAllUsers = createAsyncThunk('admin/getAllUsers', 
    async (_, thunkAPI) => {
        try {            
            const res = await fetch("/api/v1/admin/users", {
                method: "GET",
                credentials: "include",
            });
            
            const data = await res.json();
            
            if(!res.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteUserByAdmin = createAsyncThunk('admin/deleteUser',
    async (userId, thunkAPI) => {
        try {
            const res = await fetch(`/api/v1/admin/user/${userId}`, {
                method: "DELETE",
                credentials: "include"
            });

            const data = await res.json();

            if(!res.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteAllUsers = createAsyncThunk('admin/deleteAllUsers',
    async (_, thunkAPI) => {
        try {
            const res = await fetch("/api/v1/admin/users", {
                method: "DELETE",
                credentials: "include"
            })

            const data = await res.json();

            if(!res.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const editUser = createAsyncThunk('user/edit', 
    async (updates, thunkAPI) => {
        try {
            const res = await fetch("/api/v1/user/", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(updates),
            })

            const data = await res.json();
            
            if(!res.ok) {
                return thunkAPI.rejectWithValue(data.error);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteUser = createAsyncThunk('user/delete',
    async (_, thunkAPI) => {
        try {
            const res = await fetch("/api/v1/user/", {
                method: "DELETE",
                credentials: "include",
            })

            const data = await res.json();

            if(!res.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


const initialState = {
  user: null,
  users: [],
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers:(builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.isLoading = true,
                state.error = null
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        
        builder
            .addCase(verifyEmail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.isLoading = false,
                state.error = action.payload 
            })
        
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isCheckingAuth = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isCheckingAuth = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isCheckingAuth = false;
                state.isAuthenticated = false;
                state.user = null;
            })
        
        builder
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })

        builder
            .addCase(forgetPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(forgetPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

        builder
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.users;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

        builder
            .addCase(deleteUserByAdmin.fulfilled, (state, action) => {
                state.users = state.users.filter(
                    user => user._id !== action.payload.user._id
                );
            })

        builder
            .addCase(deleteAllUsers.fulfilled, (state) => {
                state.users = [];
            })

        builder
            .addCase(editUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

        builder
            .addCase(deleteUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
    }
})

export const { clearError } = authSlice.actions;

export default authSlice.reducer;