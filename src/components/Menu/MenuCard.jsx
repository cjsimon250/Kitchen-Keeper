import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { tokens } from "../../theme";
//MUI
import { Box, Button, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

function MenuCard({ menuItem }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Card
        cursor="pointer"
        sx={{
          boxShadow: `5px 5px 5px ${colors.primary[800]}`,
          borderRadius: "10px",
          textAlign: "center",
          maxWidth: 250,
          m: "40px auto",
          backgroundColor: `${colors.khakiAccent[800]}`,
          "& .MuiButtonBase-root": {
            backgroundColor: colors.orangeAccent[500],
            margin: "auto",
          },
          "& .MuiButtonBase-root:hover": {
            backgroundColor: colors.orangeAccent[700],
          },
          cursor: "pointer",
        }}
      >
        <CardHeader title={menuItem.name} />

        <CardMedia
          component="img"
          height="250"
          image={menuItem.image}
          alt={menuItem.name}
        />
      </Card>
    </>
  );
}

export default MenuCard;
