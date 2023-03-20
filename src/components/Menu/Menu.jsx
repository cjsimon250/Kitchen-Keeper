import Header from "../Header/Header";
import { Box, useTheme } from "@mui/system";
import MenuList from "./MenuItem";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../../theme";
import { ImageList } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AddToMenuForm from "../Forms/AddToMenuForm";

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
    <Box m="20px" sx={{ w: "80%", h: "100%" }}>
      <Header title="MENU" subtitle="What's on the menu?" />
      <IconButton
        sx={{ alignItems: "right", color: `${colors.orangeAccent[500]}` }}
        // Open the form to add new menu item
        onClick={() => {
          dispatch({
            type: "SET_SHOW_ADD_TO_MENU_FORM",
            payload: true,
          });

          dispatch({
            type: "FETCH_INVENTORY",
          });
        }}
      >
        <AddIcon style={{ fontSize: "1.5em" }} />
      </IconButton>
      <ImageList margin="auto" variant="masonry" cols={4} gap={8}>
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
      <AddToMenuForm />
    </Box>
  );
};

export default Menu;
