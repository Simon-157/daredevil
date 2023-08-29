import { HomeIcon, TasksIcon, BoltIcon, ProfileIcon, MoreIcon, GearIcon, LogoutIcon } from "../../assets/icons/Icons";


export const PAGES = [
  {
    name: "home",
    path: "home",
    icon: <HomeIcon />,
  },
  {
    name: "journeys",
    path: "journeys",
    icon: <TasksIcon />,
  },
  {
    name: "darepool",
    path: "darepool",
    icon: <BoltIcon />,
  },
  {
    name: "profile",
    path: "profile",
    icon: <ProfileIcon />,
  },
  {
    name: "more",
    path: "more",
    icon: <MoreIcon />,
  },
];

export const EXTRA_MENU = [
  {
    name: "settings",
    path: "settings",
    icon: <GearIcon />,
  },
  {
    name: "logout",
    path: "logout",
    icon: <LogoutIcon />,
  },
];
