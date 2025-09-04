import { create } from 'zustand';

interface NotificationState {
  count: number;
  setCount: (count: number) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  count: 0,
  setCount: (count) => set({ count })
}));
