import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import ILayerOrderModel from "@/models/ILayerOrderModel";
import create from "zustand";

interface EvolveState {
  titan: ILayerOrderModel;
  ownedLayers: IERC721MetadataModel[];
  addSkin: (skin: number) => void;
  addClothing: (clothing: number) => void;
  addHair: (hair: number) => void;
  addHead: (head: number) => void;
  addItem: (item: number) => void;
  setOwnedLayers: (layers: IERC721MetadataModel[]) => void;
}
interface FilterState {
  owned: boolean;
  unowned: boolean;
  filters: string[];
  toggleOwned: () => void;
  toggleUnOwned: () => void;
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

export const useEvolveStore = create<EvolveState>((set, get) => ({
  titan: {} as ILayerOrderModel,
  ownedLayers: [],
  addSkin: (skin: number) =>
    set((state) => ({ titan: { ...state.titan, skin } })),
  addClothing: (clothing: number) =>
    set((state) => ({ titan: { ...state.titan, clothing } })),
  addHair: (hair: number) =>
    set((state) => ({ titan: { ...state.titan, hair } })),
  addHead: (head: number) =>
    set((state) => ({ titan: { ...state.titan, head } })),
  addItem: (item: number) =>
    set((state) => ({ titan: { ...state.titan, item } })),
  setOwnedLayers: (layers: IERC721MetadataModel[]) =>
    set((state) => ({ ownedLayers: layers })),
}));

export const useFilterStore = create<FilterState>()((set) => ({
  owned: false,
  unowned: false,
  filters: [],
  toggleOwned: () => set((state) => ({ owned: !state.owned })),
  toggleUnOwned: () => set((state) => ({ unowned: !state.unowned })),
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
