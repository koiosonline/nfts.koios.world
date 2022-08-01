import create from "zustand";

interface FilterState {
  filters: string[];
  addFilter: (filter: string) => void;
  removeFilter: (filter: string) => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
  filters: [],
  addFilter: (filter: string) =>
    set((state) => ({ filters: [...state.filters, filter] })),
  removeFilter: (filter: string) =>
    set((state) => ({ filters: state.filters.filter((f) => f !== filter) })),
}));
