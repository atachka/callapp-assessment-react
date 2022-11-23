import create from "zustand";
import ListItem from "../types/listItem";
import ListState from "../types/listState";

const useStore = create<ListState>((set) => ({
  list: [],
  fillList: (items: ListItem[]) => set(() => ({ list: items })),
  deleteItem: (id: number) =>
    set((state) => {
      const newList = state.list.filter((item: ListItem) => item.id !== id);
      return { list: newList };
    }),
  addItem: (data: ListItem) =>
    set((state) => {
      data.id =
        state.list.length > 0 ? state.list[state.list.length - 1].id + 1 : 1;
      return { list: [...state.list, data] };
    }),
  editItem: (id: number, data: ListItem) =>
    set((state) => {
      const index = state.list.findIndex((obj: ListItem) => obj.id === id);
      state.list[index] = data;
      state.list[index].id = id;
      return { list: [...state.list] };
    }),
}));

export default useStore;
