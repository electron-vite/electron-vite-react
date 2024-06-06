import React, { useState } from "react";
import { styled } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { sidebarData } from "@/assets/SidebarData";
import { Box } from "@mui/material";

const Nested = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
}));

const NestedSecondLevel = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(8),
}));

export function ItemList() {
  const [open, setOpen] = useState<string | null>(null);
  const [openSecondLevel, setOpenSecondLevel] = useState<string | null>(null);

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

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      onMouseLeave={handleMouseLeave}
      style={{ overflow: "hidden" }}
    >
      {sidebarData.map((side) => (
        <Box key={side.id}>
          <ListItem onClick={() => handleClick(side.label)}>
            <ListItemIcon>{side.icon}</ListItemIcon>
            <ListItemText primary={side.label} />
            {open === side.label ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={open === side.label} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {side.items?.map((subItem) => (
                <Nested
                  key={subItem.id}
                  onClick={() => handleClickSecondLevel(subItem.label)}
                >
                  <ListItemIcon>{subItem.icon}</ListItemIcon>
                  <ListItemText primary={subItem.label} />
                  {subItem.items ? (
                    openSecondLevel === subItem.label ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null}
                </Nested>
              ))}

              {side.items?.map((subItem) =>
                subItem.items ? (
                  <Collapse
                    key={subItem.id}
                    in={openSecondLevel === subItem.label}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {subItem.items.map((nestedItem) => (
                        <NestedSecondLevel key={nestedItem.id}>
                          <ListItemIcon>{nestedItem.icon}</ListItemIcon>
                          <ListItemText primary={nestedItem.label} />
                        </NestedSecondLevel>
                      ))}
                    </List>
                  </Collapse>
                ) : null
              )}
            </List>
          </Collapse>
        </Box>
      ))}
    </List>
  );
}
