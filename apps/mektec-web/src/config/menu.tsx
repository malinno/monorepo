// MEKTEC WEB - MENU CONFIGURATION
// ===========================================

import React from "react";
import {
  Dashboard,
  ViewModule,
  Warning,
  List,
  LocationOn,
  Link,
  Category,
  LocalShipping,
  Place,
  Lightbulb,
  BarChart,
  Description,
  Assignment,
  Person,
  Security,
} from "@mui/icons-material";

// Menu item interface
export interface MenuItem {
  id: string;
  text: string;
  icon: React.ReactElement;
  path: string;
  children?: MenuItem[];
  badge?: string | number;
  disabled?: boolean;
  roles?: string[];
}

// Main menu configuration
export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    id: "layout",
    text: "Layout",
    icon: <ViewModule />,
    path: "/layout",
  },
  {
    id: "canh-bao",
    text: "Cảnh báo",
    icon: <Warning />,
    path: "/canh-bao",
    children: [
      {
        id: "dieu-kien-canh-bao",
        text: "Điều kiện cảnh báo",
        icon: <Lightbulb />,
        path: "/canh-bao/dieu-kien",
      },
      {
        id: "cai-dat-canh-bao-chung",
        text: "Cài đặt cảnh báo chung",
        icon: <Security />,
        path: "/canh-bao/cai-dat",
      },
    ],
  },
  {
    id: "danh-muc",
    text: "Danh mục",
    icon: <List />,
    path: "/danh-muc",
    children: [
      {
        id: "quan-ly-khu-vuc",
        text: "Quản lý khu vực",
        icon: <LocationOn />,
        path: "/danh-muc/khu-vuc",
      },
      {
        id: "quan-ly-line",
        text: "Quản lý Line",
        icon: <Link />,
        path: "/danh-muc/line",
      },
      {
        id: "quan-ly-loai-may",
        text: "Quản lý loại máy",
        icon: <Category />,
        path: "/danh-muc/loai-may",
      },
      {
        id: "quan-ly-may",
        text: "Quản lý máy",
        icon: <LocalShipping />,
        path: "/danh-muc/may",
      },
      {
        id: "quan-ly-diem-du-lieu",
        text: "Quản lý điểm dữ liệu",
        icon: <Place />,
        path: "/danh-muc/diem-du-lieu",
      },
      {
        id: "quan-ly-den",
        text: "Quản lý đèn",
        icon: <Lightbulb />,
        path: "/danh-muc/den",
      },
    ],
  },
  {
    id: "bao-cao",
    text: "Báo cáo",
    icon: <BarChart />,
    path: "/bao-cao",
    children: [
      {
        id: "bao-cao-thong-so-hoat-dong",
        text: "Báo cáo thông số hoạt động",
        icon: <Description />,
        path: "/bao-cao/thong-so-hoat-dong",
      },
      {
        id: "nhat-ky-canh-bao",
        text: "Nhật ký cảnh báo",
        icon: <Assignment />,
        path: "/bao-cao/nhat-ky-canh-bao",
      },
      {
        id: "nhat-ky-hoat-dong-he-thong",
        text: "Nhật ký hoạt động hệ thống",
        icon: <Assignment />,
        path: "/bao-cao/nhat-ky-he-thong",
      },
    ],
  },
  {
    id: "tai-khoan-phan-quyen",
    text: "Tài khoản & phân quyền",
    icon: <Person />,
    path: "/tai-khoan-phan-quyen",
  },
];

// Utility functions
export const getMenuByPath = (path: string): MenuItem | null => {
  const findInMenu = (items: MenuItem[]): MenuItem | null => {
    for (const item of items) {
      if (item.path === path) return item;
      if (item.children) {
        const found = findInMenu(item.children);
        if (found) return found;
      }
    }
    return null;
  };
  return findInMenu(menuItems);
};

export const getMenuById = (id: string): MenuItem | null => {
  const findInMenu = (items: MenuItem[]): MenuItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findInMenu(item.children);
        if (found) return found;
      }
    }
    return null;
  };
  return findInMenu(menuItems);
};

export const getMenuItemsByRole = (userRole: string): MenuItem[] => {
  return menuItems.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes(userRole);
  });
};

export const hasChildren = (item: MenuItem): boolean => {
  return !!(item.children && item.children.length > 0);
};

export const isActiveMenu = (item: MenuItem, currentPath: string): boolean => {
  if (item.path === currentPath) return true;
  if (item.children) {
    return item.children.some((child) => child.path === currentPath);
  }
  return false;
};
