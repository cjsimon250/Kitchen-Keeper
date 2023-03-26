import { Box } from "@mui/system";
import MenuList from "./MenuItem";
import { ImageList } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AddToMenuForm from "../../Forms/AddToMenuForm";
import EditMenuItemForm from "./EditMenuItemForm";

const Menu = () => {
  const dispatch = useDispatch();
  const menuData = useSelector((store) => store.menu.menu);

  //Fetch inventory on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_MENU",
    });
  }, [dispatch]);

  return (
    <>
      <Box ml="20px">
        <ImageList cols={1} gap={8} style={{ maxHeight: "70vh" }}>
          {menuData.map((menuItem) => {
            return (
              <MenuList
                key={menuItem.id}
                menuItem={menuItem}
                menuData={menuData}
              />
            );
          })}
        </ImageList>
      </Box>
      <AddToMenuForm />
      <EditMenuItemForm />
    </>
  );
};

export default Menu;
