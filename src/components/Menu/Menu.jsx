import Header from "../Header/Header";
import { Box } from "@mui/system";
import MenuCard from "./MenuCard";
import Grid from "@mui/material/Grid";

//MOCK DATA

import { mockDataMenu } from "../../data/mockData.js";

let i = 0;
i++;

const Menu = () => {
  return (
    <Box m="20px">
      <Header title="MENU" subtitle="What's on the menu?" />
      <Grid key={i} container spacing={5} margin="auto">
        {mockDataMenu.map((menuItem) => {
          return (
            <Grid item xs="auto">
              <MenuCard menuItem={menuItem} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Menu;
