import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getAuctions } from './api';

const useTokenStore = create(
  devtools(
    persist(
      (set) => ({
        token: '',
        role: '',
        name: '',
        userId: '',

        setToken: (token) => set(() => {
          console.log("Setting token:", token);
          return { token };
        }),
        setRole: (role) => set(() => {
          console.log("Setting role:", role);
          return { role };
        }),
        setName: (name) => set(() => {
          console.log("Setting name:", name);
          return { name };
        }),
        setUserId: (userId) => set(() => {
          console.log("Setting userId:", userId);
          return { userId };
        }),
        reset: () => set(() => ({ token: '', role: '', name: '', userId: '' })), // Ensure all are cleared
      }),
      {
        name: 'user-store',
      }
    )
  )
);

export const useProductStore = create(
  devtools((set, get) => ({
    products: [],

    fetchProducts: async () => {
      if (get().products.length > 0) return; // Prevent refetching

      try {
        const response = await getAuctions(); // Change to your API
        console.log("UseProductStore: ", response);
        set({ products: response });
        console.log("Products: ", get().products);
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },

    clearProducts: () => set({ products: [] }), // Optional: Clear products when needed
  }))
);

export default useTokenStore;

