import { configureStore, createSelector, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { NUM_SELECTORS } from "./constants";

// create a really large array of selectors that do nothing
export const massiveSelectorsArray = [...Array(NUM_SELECTORS)].map(i => createSelector(
  (state) => undefined,
  // always return the same value
  (counterState) => 1
))

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1
    }
  }
})

export const { increment } = counterSlice.actions
const { reducer } = counterSlice

export const countSelector = createSelector(
  (state) => state.counter,
  (counterState) => (counterState.value)
)
export const useCountSelector = () => useSelector(countSelector)

export const store = configureStore({
  reducer: {
    counter: reducer
  }
})