import { useState, useEffect, FormEvent, ChangeEvent, memo } from "react";
import { Modal, ModalHeader } from "reactstrap";
import useStore from "../../store/listStore";
import ListItem from "../../types/listItem";
import ListState from "../../types/listState";
import CustomButton from "../customButton/customButton";
import ModalContainer from "./modal.styled";

type Address = {
  street?: string | undefined;
  city?: string | undefined;
};
function ItemModal({
  isOpen,
  setIsOpen,
  item,
}: {
  isOpen: string;
  setIsOpen: (item: string) => void;
  item: ListItem | null;
}) {
  const editItem = useStore((state: ListState) => state.editItem);
  const addItem = useStore((state: ListState) => state.addItem);
  const [input, setInput] = useState<ListItem>({
    id: -Infinity,
    name: "",
    email: "",
    gender: "male",
    address: {
      street: "",
      city: "",
    },
    phone: "",
  });
  const handleInput = (
    e: FormEvent<HTMLLabelElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    if (target.name === "city" || target.name === "street") {
      setInput({
        ...input,
        address: { ...input.address, [target.name]: target.value },
      });
    } else {
      setInput({ ...input, [target.name]: target.value });
    }
  };
  const validateInputs = (
    values: (
      | string
      | number
      | {
          street?: string | undefined;
          city?: string | undefined;
        }
    )[]
  ): boolean => {
    for (let i = 1; i < values.length; i++) {
      if (
        values[i] === "" ||
        (values[i] as Address).city === "" ||
        (values[i] as Address).street === ""
      ) {
        return false;
      }
    }
    return true;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = Object.values(input);

    if (!validateInputs(values)) {
      alert("All fields must be filled");
      return;
    }
    if (isOpen === "edit" && item) {
      editItem(item.id, { gender: "male", ...input });
    } else {
      addItem({ ...input });
    }
    setIsOpen("none");
  };

  useEffect(() => {
    const fillInputs = () => {
      if (isOpen === "edit" && item?.id) {
        const inputValues = { ...item };
        setInput(inputValues);
      } else {
        setInput({
          id: -Infinity,
          name: "",
          email: "",
          gender: "male",
          address: {
            street: "",
            city: "",
          },
          phone: "",
        });
      }
    };
    fillInputs();
  }, [item, isOpen]);
  console.log("MODAL RENDER");
  return (
    <Modal
      isOpen={isOpen !== "none" ? true : false}
      toggle={() => {
        setIsOpen("none");
      }}
    >
      <ModalHeader>{isOpen}</ModalHeader>
      <ModalContainer>
        <div className="modal-body">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label
              onChange={(e) => {
                handleInput(e);
              }}
            >
              <p>name:</p>
              <input type="text" name="name" defaultValue={item?.name || ""} />
            </label>
            <label
              onChange={(e) => {
                handleInput(e);
              }}
            >
              <p>email:</p>
              <input
                type="email"
                name="email"
                defaultValue={item?.email || ""}
              />
            </label>
            <label>
              <p>gender:</p>
              <select
                defaultValue={item?.gender || "male"}
                name="gender"
                onChange={(e) => {
                  handleInput(e);
                }}
              >
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </label>
            <label
              onChange={(e) => {
                handleInput(e);
              }}
            >
              <p>street:</p>
              <input
                type="text"
                name="street"
                defaultValue={item?.address?.street || ""}
              />
            </label>
            <label
              onChange={(e) => {
                handleInput(e);
              }}
            >
              <p>city:</p>
              <input
                type="text"
                name="city"
                defaultValue={item?.address?.city || ""}
              />
            </label>
            <label
              onChange={(e) => {
                handleInput(e);
              }}
            >
              <p>phone:</p>
              <input
                type="phone"
                name="phone"
                defaultValue={item?.phone || ""}
              />
            </label>
            <CustomButton
              color={isOpen === "edit" ? "skyblue" : "green"}
              text={isOpen === "edit" ? "edit" : "add"}
            />
          </form>
          <CustomButton
            color={"red"}
            text={"cancel"}
            handleClick={() => setIsOpen("none")}
          />
        </div>
      </ModalContainer>
    </Modal>
  );
}

export default memo(ItemModal);
