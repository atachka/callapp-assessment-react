import { memo } from "react";
import DataTable from "react-data-table-component";
import useStore from "../../store/listStore";
import ListItem from "../../types/listItem";
import ListState from "../../types/listState";
import DataTableContainer from "./dataTable.styled";

const Table = function ({
  openModal,
}: {
  openModal: (id?: number, mode?: string) => void;
}) {
  const items: ListItem[] = useStore((state: ListState) => state.list);
  const deleteItem = useStore((state: ListState) => state.deleteItem);
  let clicked: number = -Infinity;
  const columns = [
    {
      name: "id",
      selector: (row: ListItem) => row.id,
    },
    {
      name: "name",
      selector: (row: ListItem) => row.name || "",
    },
    {
      name: "email",
      selector: (row: ListItem) => row.email || "",
    },
    {
      name: "gender",
      selector: (row: ListItem) => row.gender || "",
    },
    {
      name: "address",
      selector: (row: ListItem) =>
        `${row.address?.street + "," + row.address?.city}`,
    },
    {
      name: "phone",
      selector: (row: ListItem) => row.phone || "",
    },
    {
      name: "actions",
      cell: (row: ListItem) => (
        <div className="action-btns-container">
          <div
            onClick={() => {
              deleteItem(row.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              color="red"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <div
            onClick={() => {
              openModal(row.id, "edit");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              color="skyblue"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
              <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
            </svg>
          </div>
        </div>
      ),
    },
  ];
  return (
    <DataTableContainer>
      <DataTable
        columns={columns}
        data={items}
        onRowClicked={(data) => {
          if (clicked === data.id) {
            openModal(data.id, "edit");
          } else {
            clicked = data.id;
          }
        }}
        pointerOnHover
        highlightOnHover
      />
    </DataTableContainer>
  );
};

export default memo(Table);
