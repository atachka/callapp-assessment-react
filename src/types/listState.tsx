import ListItem from "./listItem";

type ListState = {
  list: ListItem[];
  fillList: (items: ListItem[]) => void;
  deleteItem: (id: number) => void;
  addItem: (data: ListItem) => void;
  editItem: (id: number, data: ListItem) => void;
};

export default ListState;
