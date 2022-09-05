import create from "zustand"

const initialState = {
  darkMode: false,
  isLoading: false,
  error: null,
}

export const eventStore = create(() => ({
  ...initialState,
}))
