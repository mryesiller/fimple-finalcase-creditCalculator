import create from "zustand"

const initialState = {
  darkMode: false,
  isLoading: false,
  error: null,
}

const eventMethods = (set, get) => ({
  toggleTheme: () => {
    const { darkMode } = get()

    document.body.classList[darkMode ? "remove" : "add"]("dark-theme")

    set({ darkMode: !darkMode })
  },
})

export const eventStore = create((set, get) => ({
  ...initialState,
  ...eventMethods(set, get),
}))
