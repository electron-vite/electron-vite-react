import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StarBorder from "@mui/icons-material/StarBorder";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PaymentIcon from "@mui/icons-material/Payment";
import ReportIcon from "@mui/icons-material/Report";

interface SidebarItem {
  id: number;
  label: string;
  icon: React.ReactNode;
  items?: SidebarItem[];
}

export const sidebarData: SidebarItem[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: <DashboardIcon />,
    items: [
      { id: 11, label: "Overview", icon: <StarBorder /> },
      { id: 12, label: "Stats", icon: <StarBorder /> },
      { id: 13, label: "Reports", icon: <StarBorder /> },
    ],
  },
  {
    id: 2,
    label: "Employees",
    icon: <EmojiPeopleIcon />,
    items: [
      { id: 21, label: "All Employees", icon: <StarBorder /> },
      { id: 22, label: "Add Employee", icon: <StarBorder /> },
      { id: 23, label: "Manage Employees", icon: <StarBorder /> },
    ],
  },
  {
    id: 3,
    label: "Payroll",
    icon: <PaymentIcon />,
    items: [
      { id: 31, label: "Monthly Payroll", icon: <StarBorder /> },
      { id: 32, label: "Annual Payroll", icon: <StarBorder /> },
      { id: 33, label: "Payroll Settings", icon: <StarBorder /> },
    ],
  },
  {
    id: 4,
    label: "Reports",
    icon: <ReportIcon />,
    items: [
      { id: 41, label: "Payroll Reports", icon: <StarBorder /> },
      { id: 42, label: "Employee Reports", icon: <StarBorder /> },
      { id: 43, label: "Tax Reports", icon: <StarBorder /> },
    ],
  },
];
