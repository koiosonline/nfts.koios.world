import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import create from "zustand";

interface FilterState {
  owned: boolean;
  filters: string[];
  toggleOwned: () => void;
  addFilter: (filter: string) => void;
  removeFilter: (filter: string) => void;
}

interface ModalState {
  item: IERC721MetadataModel | null;
  open: boolean;
  closeModal: () => void;
  openModal: (item: IERC721MetadataModel) => void;
}

interface NFTState {
  nfts: any[] | null;
  addAndRemove: (nfts: any) => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
  owned: false,
  filters: [],
  toggleOwned: () => set((state) => ({ owned: !state.owned })),
  addFilter: (filter: string) =>
    set((state) => ({ filters: [...state.filters, filter] })),
  removeFilter: (filter: string) =>
    set((state) => ({ filters: state.filters.filter((f) => f !== filter) })),
}));

export const useNFTState = create<NFTState>((set) => ({
  nfts: [],
  addAndRemove: (items: any) => set((state) => ({ nfts: [...items] })),
}));

export const useModalStore = create<ModalState>((set) => ({
  item: null,
  open: false,
  closeModal: () => set((state) => ({ item: null, open: false })),
  openModal: (layer: IERC721MetadataModel) =>
    set((state) => ({ item: layer, open: true })),
}));
