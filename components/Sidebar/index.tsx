import { Layout, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, memo } from "react";
import styles from "../../styles/DashboardLayout.module.css";
import PerfectScrollBar from "react-perfect-scrollbar";
import { dashboardNavigation } from "../../navigation";
import { siteLogo } from "../../utils/siteInfo";

const { Sider } = Layout;
const Index = ({ collapsed }) => {
  const router = useRouter();
  const menuLinks = dashboardNavigation.map((value) => {
    const Icon = value?.icon || Fragment;
    const children = value?.children || [];
    if (children.length > 0) {
      return (
        <Menu.SubMenu key={value?.url} icon={<Icon />} title={value.text}>
          {value.children?.map((item) => {
            const Icon = item?.icon || Fragment;
            return (
              <Menu.Item icon={<Icon />} key={item?.url}>
                <Link href={item?.url}>{item?.text}</Link>
              </Menu.Item>
            );
          })}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={value?.url} icon={<Icon />}>
        <Link href={value?.url}>{value?.text}</Link>
      </Menu.Item>
    );
  });

  return (
    <Sider
      className="shadow  sidar-fixed"
      trigger={null}
      collapsible
      theme="dark"
      style={{ backgroundColor: "black" }}
      collapsed={collapsed}
    >
      <div className="py-3 px-2 w-full d-flex align-items-center justify-content-center">
        <Link href="/">
          <a className={styles.siteLogo}>
            <Image priority layout="fill" src={siteLogo()} alt="logo" />
          </a>
        </Link>
      </div>
      <PerfectScrollBar>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={[router.asPath]}
          defaultSelectedKeys={[router.asPath]}
        >
          {menuLinks}
        </Menu>
      </PerfectScrollBar>
    </Sider>
  );
};

export default memo(Index);
