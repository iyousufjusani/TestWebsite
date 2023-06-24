import { NextPage } from "next";
import LoginProtection from "../../Guards/LoginProtection";
import DashboardLayout from "../../layouts/dashboardlayout";

type Props = {};
const Dashboard: NextPage<Props> = () => {
  return <p>Dashboard</p>;
};

export default Dashboard;

Object.assign(Dashboard, {
  pageTitle: "Dashboard",
  layout: DashboardLayout,
  protection: LoginProtection,
});
