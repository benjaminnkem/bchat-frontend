import { User } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    department: "",
    level: "",
    school: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;
