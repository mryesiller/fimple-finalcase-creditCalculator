import create from "zustand"

const initialState = {
  darkMode: false,
  tableOverflowMode: false,
  calculateMode: true,
  selectedTab: "general",
  isLoading: false,
  errors: false,
}

const eventMethods = (set, get) => ({
  toggleTheme: () => {
    const { darkMode } = get()

    document.body.classList[darkMode ? "remove" : "add"]("dark-theme")

    set({ darkMode: !darkMode })
  },
  setErrors: (error) => {
    set({ errors: error })
  },
  toggleTableOverflow: () => {
    const { tableOverflowMode } = get()

    document
      .getElementById("table")
      .classList[tableOverflowMode ? "remove" : "add"]("table-overflow")

    set({ tableOverflowMode: !tableOverflowMode })
  },
})

export const eventStore = create((set, get) => ({
  ...initialState,
  ...eventMethods(set, get),
}))
