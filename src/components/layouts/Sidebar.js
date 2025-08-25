import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import {
  ListCollapse,
  Users,
  BadgeDollarSign,
  Pyramid,
  HandCoins,
} from "lucide-react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useSidebar } from "./SidebarContext";
import { getAdminPermission, SubAdminPermission } from "../CommonAPI/Admin";

const Sidebar = ({ permissionData }) => {
  const role = localStorage.getItem("Role");
  const name = localStorage.getItem("name");

  const [isActive, setIsActive] = useState(true);
  //   const [activeItem, setActiveItem] = useState("");
  const sidebarRef = useRef(null);
  const fevicon = localStorage.getItem("fevicon");
  const header_img1 = localStorage.getItem("header_img1");
  const header_img2 = localStorage.getItem("header_img2");
  const logo = localStorage.getItem("logo");
  const pannel_name = localStorage.getItem("pannel_name");
  const [permission, setPermission] = useState(
    JSON.parse(localStorage.getItem("SubAdminPermission")) || null
  );

  const expire = localStorage.getItem("expire");

  const { activeItem, setActiveItem } = useSidebar();

  const setImages = async () => {
    $(".header_img1").attr("src", header_img1);
    $(".header_img2").attr("src", header_img2);
    $(".title_name").text(pannel_name);
    $(".set_Favicon");
    let favicon = $("link[rel='icon']").length
      ? $("link[rel='icon']")
      : $("<link rel='icon' type='image/x-icon' />");
    favicon.attr("href", fevicon && fevicon);
    $("head").append(favicon);
  };
  useEffect(() => {
    setImages();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("sidebar-main", isActive);
  }, [isActive]);

  const getSubAdminPermission = async () => {
    const req = { username: name };
    await SubAdminPermission(req)
      .then((response) => {
        if (response.Status) {
          localStorage.setItem(
            "SubAdminPermission",
            JSON.stringify(response.Data)
          );
          setPermission(response.Data);
        }
      })
      .catch((err) => {
        console.log("Error in fetching the permission", err);
      });
  };
  useEffect(() => {
    getSubAdminPermission();
  }, []);

  const handleSidebarClick = (event, item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const handleSidebarItemClick = (event) => {
      const li = event.currentTarget;
      const submenu = li.querySelector(".iq-submenu");

      if (submenu) {
        submenu.style.display = li.classList.toggle("menu-open")
          ? "block"
          : "none";
      }
    };

    const sidebarItems = sidebar?.querySelectorAll(".iq-sidebar-menu li") || [];
    sidebarItems.forEach((item) =>
      item.addEventListener("click", handleSidebarItemClick)
    );

    return () => {
      sidebarItems.forEach((item) =>
        item.removeEventListener("click", handleSidebarItemClick)
      );
    };
  }, []);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const handleSidebarItemClick = (event) => {
      const li = event.currentTarget;
      const submenu = li.querySelector(".iq-submenu");

      if (li.classList.contains("menu-open")) {
        if (submenu) {
          submenu.style.display = "none";
        }
        li.classList.remove("menu-open");
        const openItems = li.querySelectorAll(".menu-open");
        openItems.forEach((item) => {
          item.classList.remove("menu-open");
        });
      } else if (submenu) {
        submenu.style.display = "block";
        li.classList.add("menu-open");
        submenu.classList.add("menu-open");
      }
    };

    const activeItems = sidebar.querySelectorAll(".iq-sidebar-menu .active");
    activeItems.forEach((item) => {
      const submenu = item.querySelector(".iq-submenu");
      if (submenu) {
        item.classList.add("menu-open");
        submenu.classList.add("menu-open");
      }
    });

    const sidebarItems = sidebar.querySelectorAll(".iq-sidebar-menu li");
    sidebarItems.forEach((item) => {
      item.addEventListener("click", handleSidebarItemClick);
    });

    return () => {
      sidebarItems.forEach((item) => {
        item.removeEventListener("click", handleSidebarItemClick);
      });
    };
  }, []);

  const subadminSideBaar = [
    {
      path: "/subadmin/dashboard",
      icon: <i className="ri-dashboard-fill" />, // Dashboard icon
      label: "Dashboard",
      permission: [], // No restriction
    },
    {
      path: "/subadmin/allclient",
      icon: <i className="fa fa-users" />,
      label: "All Clients",
      permission: ["AddClient", "ViewClient", "EditClient"],
    },
    {
      path: "/subadmin/groups",
      icon: <i className="ri-group-fill" />, // Teams icon for Sub Admin Groups
      label: "Sub Admin Groups",
      permission: [],
    },
    {
      path: "/subadmin/trade-history",
      icon: <i className="la la-history"></i>,
      label: "Trade History",
      permission: ["TradeHistory"],
    },
  ];

  let adminSideBaar = [
    {
      path: "/admin/dashboard",
      icon: <i className="ri-home-8-line" />, // Dashboard icon
      label: "Dashboard",
      permission: [],
    },
    {
      path: "/admin/clientservice",
      icon: <i className="ri-group-line" />, // Client Service icon
      label: "Add Client",
      permission: [],
    },

    {
      path: "/admin/allSubadmin",
      icon: <i className="las la-user-check"></i>, // SubAdmin icon
      label: "SubAdmin",
      permission: [],
    },

    {
      path: "/admin/allplan",
      icon: <i className="fa fa-list-alt" />,
      label: "Plan",
      permission: [],
    },
  ];

  const superAdmin = [
    {
      path: "/superadmin/dashboard",
      icon: <i className="ri-home-fill" />, // Dashboard icon
      label: "Dashboard",
      permission: [],
    },
    {
      path: "/superadmin/create-admin",
      icon: <Users />, // Create Admin icon
      label: "Create Admin",
      permission: [],
    },
    {
      path: "/superadmin/admin-details",
      icon: <ListCollapse />, // Admin Details icon
      label: "Admin Details",
      permission: [],
    },
    {
      path: "/superadmin/amount-details",
      icon: <BadgeDollarSign />, // Amount Details icon
      label: "Amount Details",
      permission: [],
    },
    {
      path: "/superadmin/client-thread-report",
      icon: <Pyramid />, // Client Trade Report icon
      label: (
        <>
          Client Thread <br /> Report
        </>
      ),
      permission: [],
    },
  ];

  const userSidebarItems = [
    {
      path: "/user/dashboard",
      icon: <i className="ri-home-8-line" />, // Dashboard icon
      label: "Dashboard",
      permission: [],
    },

    {
      path: "tradereport",
      icon: <i className="la la-sellsy" />, // Trade Report icon
      label: "Trade Report",
      permission: [],
    },

    {
      path: "tradehistory",
      icon: <i className="la la-history"></i>,
      label: "Trade History",
      permission: [],
    },

    {
      path: "traderesponse",
      icon: <i className="la la-sellsy"></i>,
      label: (
        <>
          Trade <br /> Response
        </>
      ),
      permission: [],
    },
    {
      path: "profitandloss",
      icon: <i className="las la-universal-access"></i>,
      label: "Net P&L",
      permission: [],
    },

    {
      path: "StrategyTag",
      icon: <i className="ri-lightbulb-flash-fill" />, // Lightbulb icon for Strategy Tag
      label: "Strategy Tag",
      permission: [], // No restriction
    },
  ];

  const renderSidebarItems = (items) =>
    items
      .filter(
        (item) =>
          item.permission.length === 0 ||
          item.permission.some((p) => permission?.includes(p))
      )
      .map((item) => (
        <li
          key={item.path}
          className={activeItem === item.path ? "active" : ""}
          onClick={(e) => handleSidebarClick(e, item.path)}
        >
          <Link
            to={expire?.includes(1) ? "/user/all/plan" : item.path}
            className="iq-waves-effect sidebar-left"
          >
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id={`tooltip-${item.label}`}>{item.label}</Tooltip>
              }
            >
              <div className="d-inline-block link-icon">{item.icon}</div>
            </OverlayTrigger>
            <span>{item.label}</span>
          </Link>
        </li>
      ));

  const getSidebarItems = () => {
    switch (role) {
      case "Admin":
        return renderSidebarItems(adminSideBaar);
      case "Superadmin":
        return renderSidebarItems(superAdmin);
      case "Subadmin":
        return renderSidebarItems(subadminSideBaar);
      default:
        return renderSidebarItems(userSidebarItems);
    }
  };

  return (
    <div className="iq-sidebar" onClick={() => sessionStorage.clear()}>
      <div className="iq-sidebar-logo d-flex justify-content-between"></div>
      <div
        id="sidebar-scrollbar"
        data-scrollbar="true"
        tabIndex={-1}
        style={{ overflow: "hidden", outline: "none" }}
      >
        <div className="scroll-content">
          <nav ref={sidebarRef} className="iq-sidebar-menu">
            <ul className="iq-menu">{getSidebarItems()}</ul>
          </nav>
          <div className="p-3" />
        </div>
        <div
          className="scrollbar-track scrollbar-track-y"
          style={{ display: "block" }}
        >
          <div
            className="scrollbar-thumb scrollbar-thumb-y"
            style={{ height: "84.57px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
