import { Box, useTheme } from "@mui/system";
import MenuList from "./MenuItem";
import { tokens } from "../../../theme";
import { ImageList } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AddToMenuForm from "../../Forms/AddToMenuForm";
import EditMenuItemForm from "./EditMenuItemForm";

const Menu = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const menuData = useSelector((store) => store.menu.menu);

  //Fetch inventory on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_MENU",
    });
  }, [dispatch]);

  return (
    <>
      <Box m="20px" sx={{ w: "100%", h: "70vh" }}>
        <ImageList sx={{ width: "100%", height: "70vh" }} cols={1} gap={8}>
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
