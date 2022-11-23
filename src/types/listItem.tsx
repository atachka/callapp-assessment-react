type ListItem = {
  id: number;
  name?: string;
  email?: string;
  gender?: string;
  address?: {
    street?: string;
    city?: string;
  };
  phone?: string;
};

export default ListItem;
