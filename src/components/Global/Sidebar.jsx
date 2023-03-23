import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { HashRouter as Router, Link } from "react-router-dom";
import { tokens } from "../../theme";
import Tooltip from "@mui/material/Tooltip";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

//Function to be given props when called that determine the
//title, link, icon, and whether it is selected or not
const Item = ({ title, to, icon, selected, setSelected, collapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    //If title is empty mui doesn't render tooltip (no tooltip if side bar is open)
    <Tooltip title={!collapsed ? "" : title} placement="right-end">
      <MenuItem
        active={selected === title}
        style={{ color: colors.grey[100] }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Router>
          <Link to={to} />
        </Router>
      </MenuItem>
    </Tooltip>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //collapse sidebar
  const [isCollapsed, setIsCollapsed] = useState(true);
  //show current page being viewed
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      position="fixed"
      height="100vh"
      zIndex="100"
      // styling the pro-sidebar
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[900]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.orangeAccent[500]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.orangeAccent[500]} !important`,
        },
        "& .pro-icon": {
          fontSize: "3rem !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Logo and Menu Icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Kitchen Keeper
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* User image, name, title*/}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile"
                  width="100px"
                  height="100px"
                  src={`data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgQFAQMH/8QALxABAAIBAgQDBgYDAAAAAAAAAAECAwQREiExQQVRcRMiMjSBoVJhcpGxwSMzYv/EABYBAQEBAAAAAAAAAAAAAAAAAAACAf/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A+qAKQAAAAA6DgE8uoYAAAAAAAAAAJ4sdstuGkc/4RiJno1tNhjDjivWe8stbIhh0eOkRxRx2/OFiKxEbRERDoxSF8VLxtelZ9YU9RodvexTM/wDM/wBL4DDcXdfh4Z9rWNonlKmqIcAAAAAAAB76OvFqKb9ubWZWhnbU1/OJhqpVAAaAA89RXjw3r5wxmzmnhxXmfwyxmxNAGsAAAAAASraaWi0dY5tjHkjJSLV6SxXvptROCdp51nrDK2NYeeLLTJG9LRL0YoHN1fUaqmKJivvW8o7A8/EM3DSMcdbdfRQdvab2m1p3mUVRAAAAAAAAAPbDpsmXnWNq+crePQY453tNvtDNbjPi0xO8WmJjvEvWNVniNvaT9WlGDFXpjr+ycVrHSI/Y0xkWz5b8rZLbeW6DZmlJ61ifohbS4bdaRHpyNMZAu5NBt/rv9LKuSlsduG8TEtZiAAAAAOgRznaOq/pdHFdrZY3t2jyR0GCJ/wAto3/Cvs1UgAxoAAAAhkpXJWa3jeEwGVqtNOGeKOdJ+yu271i1Zi0bxPZk58Xsck157dvRsTjyAawdcSp8dfWAbGKsUpFY7Rsm5DqVgAAAAAAACl4lT3K37xOy6q+IfL/WCDMAUiiVPjr6wilT46+sBG1DrkOpWAAAAAAAAKviHy8/qhaVfEPl5/VAMwBSa//Z`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  CJ Simon
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[300]}>
                  Head Honcho
                </Typography>
              </Box>
            </Box>
          )}
          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon fontSize="large" />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="Menu & Inventory"
              to="/menuinventory"
              icon={<FoodBankIcon fontSize="large" />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="Orders"
              to="/orders"
              icon={<AddShoppingCartIcon fontSize="large" />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon fontSize="large" />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<PermContactCalendarIcon fontSize="large" />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayIcon fontSize="large" />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isCollapsed}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
