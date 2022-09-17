import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import create from "zustand";

interface UserState {
  user: string;
  setUser: (user: string) => void;
}

interface EvolveState {
  titan: Map<string, number>;
  ownedLayers: IERC721MetadataModel[];
  actions: number;
  nftName: string;
  nftDescription: string;
  nftExternalURL: string;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setExternalURL: (externalURL: string) => void;
  deleteLayer: () => void;
  setOwnedLayers: (layers: IERC721MetadataModel[]) => void;
  resetTitan: () => void;
}
interface FilterState {
  owned: boolean;
  filters: string[];
  toggleOwned: () => void;
  addFilter: (filter: string) => void;
  removeFilter: (filter: string) => void;
}

interface ModalState {
  openFilter: boolean;
  openDesc: boolean;
  item: IERC721MetadataModel | null;
  open: boolean;
  openEvolve: boolean;
  toggleFilterModal: () => void;
  toggleDescModal: () => void;
  closeEvolveModal: () => void;
  openEvolveModal: () => void;
  closeModal: () => void;
  openModal: (item: IERC721MetadataModel) => void;
}

interface NFTState {
  nfts: any[];
  coupons: number | null;
  setCoupons: (coupons: number) => void;
  addAndRemove: (nfts: any) => void;
  addNFT: (nft: any) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: "",
  setUser: (user: string) => set((state) => ({ ...state, user })),
}));

export const useEvolveStore = create<EvolveState>((set, get) => ({
  titan: new Map([
    ["Skin", 0],
    ["Clothing", 0],
    ["Hair", 0],
    ["Head", 0],
    ["Item", 0],
  ]),
  ownedLayers: [],
  actions: 0,
  nftName: "",
  nftDescription: "",
  nftExternalURL: "",
  deleteLayer: () =>
    set((state) => ({
      actions: state.actions + 1,
    })),
  setOwnedLayers: (layers: IERC721MetadataModel[]) =>
    set((state) => ({ ownedLayers: layers })),
  setName: (name: string) => set((state) => ({ nftName: name })),
  setDescription: (description: string) =>
    set((state) => ({ nftDescription: description })),
  setExternalURL: (externalURL: string) =>
    set((state) => ({ nftExternalURL: externalURL })),
  resetTitan: () =>
    set((state) => ({
      titan: new Map([
        ["Skin", 0],
        ["Clothing", 0],
        ["Hair", 0],
        ["Head", 0],
        ["Item", 0],
      ]),
    })),
}));

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
  coupons: null,
  setCoupons: (coupons: number) => set((state) => ({ coupons })),
  addAndRemove: (items: any) => set((state) => ({ nfts: [...items] })),
  addNFT: (nft: any) => set((state) => ({ nfts: [...state.nfts, nft] })),
}));

export const useModalStore = create<ModalState>((set) => ({
  openFilter: false,
  openDesc: false,
  item: null,
  open: false,
  openEvolve: false,
  toggleFilterModal: () => set((state) => ({ openFilter: !state.openFilter })),
  toggleDescModal: () => set((state) => ({ openDesc: !state.openDesc })),
  closeEvolveModal: () => set((state) => ({ openEvolve: false })),
  openEvolveModal: () => set((state) => ({ openEvolve: true })),
  closeModal: () => set((state) => ({ item: null, open: false })),
  openModal: (layer: IERC721MetadataModel) =>
    set((state) => ({ item: layer, open: true })),
}));
