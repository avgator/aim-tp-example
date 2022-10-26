import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
    selectedRoom: string | null;
    selectedCategory: string | null;
}

const initialState: UIState = {
    selectedRoom:  null,
    selectedCategory: null,
}

const uiSlice = createSlice ({
    name: 'ui',
    initialState,
    reducers: {
        setRoom(state, action: PayloadAction<UIState>) {
            state = action.payload;
        },
    }
})

export const { setRoom } = uiSlice.actions;
export default uiSlice.reducer;