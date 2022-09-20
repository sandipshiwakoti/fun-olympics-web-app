import { BsBroadcastPin, BsNewspaper } from "react-icons/bs";
import { FaHome, FaUser, FaVideo } from "react-icons/fa";
import { MdOutlineSportsBasketball } from "react-icons/md";

export const links = [
  { title: "Home", path: "/" },
  { title: "Games", path: "/games" },
  { title: "Events", path: "/events" },
  { title: "Highlights", path: "/highlights" },
  { title: "News", path: "/news" },
  { title: "Watchlist", path: "/watchlist" },
];

export const adminLinks = [
  { title: "Home", path: "/admin", icon: FaHome },
  { title: "User", path: "/admin/users", icon: FaUser },
  { title: "Game", path: "/admin/games", icon: MdOutlineSportsBasketball },
  { title: "Event", path: "/admin/events", icon: BsBroadcastPin },
  { title: "Highlight", path: "/admin/highlights", icon: FaVideo },
  { title: "News", path: "/admin/news", icon: BsNewspaper },
];
