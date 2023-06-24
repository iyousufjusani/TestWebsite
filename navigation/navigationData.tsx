import {
  FaCar,
  FaIdCard,
  FaMapPin,
  FaQuestionCircle,
  FaShoppingBasket,
  FaUserTag,
} from "react-icons/fa";

type NavigationData = {
  id: number;
  url: string;
  icon: React.FC;
  text: string;
  children?: NavigationData[];
};

const UserLinks: NavigationData[] = [
  {
    id: 1,
    url: "/dashboard/profile",
    text: "Profile",
    icon: FaIdCard,
  },
  {
    id: 2,
    url: "/dashboard/my-trips",
    children: [
      {
        id: 21,
        url: "/dashboard/completedtrips",
        text: "Completed",
        icon: FaIdCard,
      },
      {
        id: 22,
        url: "/dashboard/cancelledtrips",

        text: "Cancelled",
        icon: FaIdCard,
      },
    ],
    text: "My Trips",
    icon: FaShoppingBasket,
  },
  {
    id: 3,
    url: "/dashboard/payment",
    text: "Payment",
    icon: FaMapPin,
  },
  {
    id: 3,
    url: "/dashboard/vehicles",
    text: "Vehicles",
    icon: FaCar,
  },
  {
    id: 4,
    url: "/dashboard/support",
    text: "Support",
    icon: FaUserTag,
  },
];
export default UserLinks;
