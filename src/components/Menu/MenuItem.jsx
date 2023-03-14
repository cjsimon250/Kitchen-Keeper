import { tokens } from "../../theme";
//MUI
import { Box, useTheme, IconButton } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import EditIcon from "@mui/icons-material/Edit";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";

function MenuItem({ menuItem }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log("menuItem:", menuItem);
  return (
    //
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
              "linear-gradient(to bottom, rgba(0,0,0,5), rgba(0,0,0,0))",
          }}
          title={menuItem.dish}
          position="top"
          actionIcon={
            <>
              <IconButton
                sx={{ color: "white" }}
                aria-label={`View ${menuItem.dish}`}
              >
                <ViewHeadlineIcon />
              </IconButton>
              <IconButton
                sx={{ color: "white" }}
                aria-label={`Edit ${menuItem.dish}`}
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
