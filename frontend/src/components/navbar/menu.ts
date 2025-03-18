import path from "path";

export const MenuItems = [
  {
    name: "Daily Tarot",
    path: "/daily-tarot",
    icon: path.resolve("/images/navbar/tarot.svg"),
    icon_click: path.resolve("images/navbar/tarot_click.svg"),
  },
  {
    name: "Community",
    path: "/community",
    icon: path.resolve("/images/navbar/flower.svg"),
    icon_click: path.resolve("images/navbar/flower_click.svg"),
  },
  {
    name: "History",
    path: "/history",
    icon: path.resolve("/images/navbar/bee.svg"),
    icon_click: path.resolve("images/navbar/bee_click.svg"),
  },
]