import Header from "../Header/Header";
import { Box } from "@mui/system";
import MenuList from "./MenuItem";
import { ImageList } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EditMenuItemForm from "./EditMenuItemForm/EditMenuItemForm";

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
    <Box m="20px" sx={{ w: "80%", h: "100%" }}>
      <Header title="MENU" subtitle="What's on the menu?" />
      <ImageList margin="auto" variant="masonry" cols={3} gap={8}>
        {menuData.map((menuItem) => {
          return (
            <MenuList
              key={menuItem.menuId}
              menuItem={menuItem}
              menuData={menuData}
            />
          );
        })}
      </ImageList>
      <EditMenuItemForm />
    </Box>
  );
};

export default Menu;
