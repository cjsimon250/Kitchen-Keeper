import { tokens } from "../../../theme";
import { useDispatch } from "react-redux";
import EditMenuItemForm from "./EditMenuItemForm";
//MUI
import { Box, useTheme, IconButton } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import EditIcon from "@mui/icons-material/Edit";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";

function MenuItem({ menuItem }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  //Function to show edit menu item form
  function handleShowEditMenuItemForm() {
    dispatch({
      type: "SHOW_MENU_FORM",
      payload: true,
    });

    dispatch({
      type: "SET_SELECTED_DISH",
      payload: menuItem,
    });
  }

  return (
    <Box>
      <ImageListItem>
        <img
          src={menuItem.image}
          srcSet={menuItem.image}
          alt={menuItem.item}
          loading="lazy"
        />
        <ImageListItemBar
          sx={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,15), rgba(0,0,0,0))",
            color: "#090808",
          }}
          title={menuItem.dish}
          position="top"
          actionIcon={
            <>
              <IconButton
                sx={{ color: "#d5d4d4" }}
                aria-label={`View ${menuItem.dish}`}
              >
                <ViewHeadlineIcon />
              </IconButton>
              <IconButton
                sx={{ color: "#d5d4d4" }}
                aria-label={`Edit ${menuItem.dish}`}
                onClick={() => {
                  handleShowEditMenuItemForm();
                }}
              >
                <EditIcon />
              </IconButton>
            </>
          }
          actionPosition="left"
        />
      </ImageListItem>
    </Box>
  );
}

export default MenuItem;
