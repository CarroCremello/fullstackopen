import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useNotificationStore = create(devtools((set) => ({
  message: null,
  actions: {
    setNotification: (message, seconds) => {
      set({ message })
      setTimeout(() => set({ message: null }), seconds * 1000)
    }
  }
})))

export const useNotification = () => useNotificationStore((state) => state.message)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
