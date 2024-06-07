import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import useAuthStore from "../store/useStore"; // Adjust the import path

const Nested = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(6),
}));

const NestedSecondLevel = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(8),
}));

export function ItemList() {
  const [open, setOpen] = useState<string | null>(null);
  const [openSecondLevel, setOpenSecondLevel] = useState<string | null>(null);
  const fetchMenus = useAuthStore((state) => state.fetchMenus);
  const menus = useAuthStore((state) => state.menus);
  const isLoading = !menus.length;

  // Fetch menus
  useEffect(() => {
    fetchMenus().catch((error) =>
      console.error("Failed to fetch menus:", error)
    );
  }, [fetchMenus]);

  const handleClick = (item: string) => {
    setOpen(open === item ? null : item);
  };

  const handleClickSecondLevel = (item: string) => {
    setOpenSecondLevel(openSecondLevel === item ? null : item);
  };

  const handleMouseLeave = () => {
    setOpen(null);
    setOpenSecondLevel(null);
  };

  if (isLoading) return <div>Loading...</div>;

  // Filter primary menus
  const primaryMenus = menus.filter(
    (menu: any) => menu.mengrp == "01" && menu.is_active == 1
  );

  console.log("Menus", primaryMenus);

  // Create a map to hold submenus
  const subMenuMap = menus.reduce((acc: any, menu: any) => {
    if (menu.menlvl === "2.00000") {
      if (!acc[menu.mengrp]) {
        acc[menu.mengrp] = [];
      }
      acc[menu.mengrp].push(menu);
    }
    return acc;
  }, {});

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      onMouseLeave={handleMouseLeave}
      style={{ overflow: "hidden" }}
    >
      {primaryMenus.map((menu: any) => (
        <Box key={menu.recid}>
          <ListItem onClick={() => handleClick(menu.mencap)}>
            <ListItemIcon>{/* Add appropriate icon here */}</ListItemIcon>
            <ListItemText primary={menu.mencap} />
            {open === menu.mencap ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={open === menu.mencap} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {subMenuMap[menu.mengrp]?.map((subItem: any) => (
                <Nested
                  key={subItem.recid}
                  onClick={() => handleClickSecondLevel(subItem.mencap)}
                >
                  <ListItemIcon>{/* Add appropriate icon here */}</ListItemIcon>
                  <ListItemText primary={subItem.mencap} />
                  {openSecondLevel === subItem.mencap ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </Nested>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}
    </List>
  );
}
