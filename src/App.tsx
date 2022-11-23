import { useEffect, useState, useCallback } from "react";
import Table from "./components/dataTable/dataTable";
import ItemModal from "./components/modal/modal";
import useStore from "./store/listStore";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomButton from "./components/customButton/customButton";
import PieChart from "./components/pieChart/pieChart";
import AppContainer from "./App.styled";
import ListItem from "./types/listItem";
import ListState from "./types/listState";
function App() {
  const [isOpen, setIsOpen] = useState<string>("none");
  const [item, setItem] = useState<ListItem | null>(null);
  const list = useStore((state: ListState) => state.list);
  const fillList = useStore((state: ListState) => state.fillList);

  const handleOpen = useCallback((isOpen: string) => setIsOpen(isOpen), []);

  const openModal = useCallback(
    (id?: number, mode?: string): void => {
      if (mode === "edit") {
        setIsOpen(mode);
        const foundItem: ListItem | undefined = list.find(
          (item) => item?.id === id
        );
        if (foundItem) {
          setItem(foundItem);
        }
      } else {
        setIsOpen("add");
        setItem(null);
      }
    },
    [list]
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:4000/data", {
        method: "GET",
      });

      fillList(await data.json());
    };

    fetchData();
  }, [fillList]);
  return (
    <AppContainer>
      <CustomButton
        customStyles={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          "z-index": "1",
        }}
        color="green"
        text={"Add Item"}
        handleClick={openModal}
      />
      <Table openModal={openModal} />
      <ItemModal isOpen={isOpen} setIsOpen={handleOpen} item={item} />
      <PieChart list={list} />
    </AppContainer>
  );
}

export default App;
