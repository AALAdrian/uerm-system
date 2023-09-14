import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  role: null,
  setRole: (newRole) => set((state) => ({role: newRole})),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

export default useStore;