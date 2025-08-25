import React, { useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useSidebar } from "./SidebarContext";
import { HandCoins } from "lucide-react";

const Sidebar = ({ permissionData }) => {
  const role = localStorage.getItem("Role");
  const { activeItem, setActiveItem } = useSidebar();
  const sidebarRef = useRef(null);

  const permission = localStorage.getItem("SubAdminPermission") || "";
  const userPermission = localStorage.getItem("Permission") || "";

  // ✅ Set favicon & title once
  useEffect(() => {
    const panelName = localStorage.getItem("pannel_name");
    const faviconUrl = localStorage.getItem("fevicon");

    if (panelName) {
      document.title = panelName;
    }

    if (faviconUrl) {
      let favicon =
        document.querySelector("link[rel='icon']") ||
        document.createElement("link");
      favicon.rel = "icon";
      favicon.type = "image/x-icon";
      favicon.href = faviconUrl;
      document.head.appendChild(favicon);
    }
  }, []);

  // ✅ Sidebar expand/collapse
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

  // ✅ Define menu items based on role & permissions
  const sidebarItems = useMemo(() => {
    const baseItems = {
      Admin: [
        {
          path: "/admin/tradehistory",
          icon: <i className="la la-history"></i>,
          label: (
            <>
              Trade <br /> history
            </>
          ),
        },
        {
          path: "/admin/strategygroup",
          icon: <i className="la la-sellsy" />,
          label: (
            <>
              Strategy <br /> Bot
            </>
          ),
        },
      ],
      Superadmin: [
        {
          path: "/superadmin/client-trade-response",
          icon: <i className="la la-reply"></i>,
          label: (
            <>
              Client Trade <br /> Response
            </>
          ),
        },
        {
          path: "/superadmin/update-client-details",
          icon: <i className="la la-user"></i>,
          label: (
            <>
              Update Client <br /> Details
            </>
          ),
        },
        {
          path: "/superadmin/api-create-info",
          icon: <i className="la la-code"></i>,
          label: "ApiCreateInfo",
        },
        {
          path: "/superadmin/New-Update",
          icon: <i className="la la-bell"></i>,
          label: "New-Update",
        },
        {
          path: "/superadmin/admin-offer",
          icon: <HandCoins />,
          label: (
            <>
              Admin <br /> Coupon Details
            </>
          ),
        },
      ],
      Subadmin: [
        {
          path: "/subadmin/all-script",
          icon: <i className="ri-file-edit-fill"></i>,
          label: "Add Script",
        },
        {
          path: "/subadmin/trade-history",
          icon: <i className="ri-bar-chart-fill"></i>,
          label: "Trade History",
          permission: ["TradeHistory"],
        },
        {
          path: "/subadmin/change-password",
          icon: <i className="ri-lock-password-fill"></i>,
          label: "Change Password",
        },
      ],
      User: [
        {
          path: "technical/pattern",
          icon: <i className="las la-cogs"></i>,
          label: "Tech Patterns",
        },
        {
          path: "lastpattern",
          icon: <i className="las la-cog"></i>,
          label: "Last Patterns",
        },
        {
          path: "all/plan",
          icon: <i className="ri-folder-chart-line" />,
          label: "All Plans",
        },
        {
          path: "pannel",
          icon: <i className="lab la-ello"></i>,
          label: "Panel Track",
        },
        {
          path: "discription",
          icon: <i className="lab la-get-pocket"></i>,
          label: "Description",
        },
      ],
    };

    // Extra permission-based items
    if (permissionData?.includes("ChartingPlatform")) {
      baseItems.Admin.push({
        path: "/admin/Strategy-tag",
        icon: <i className="la la-chess-knight"></i>,
        label: (
          <>
            Strategy
            <br />
            Tag
          </>
        ),
      });
    }

    if (permissionData?.includes("Option Chain")) {
      baseItems.Admin.push({
        path: "/admin/OptionChain",
        icon: <i className="ri-stock-line" />,
        label: (
          <>
            Option <br /> Chain
          </>
        ),
      });


      
  if (userPermission?.includes("Option Chain")) {
    
    baseItems.User.push({
      path: "/user/OptionChain",
      icon: <i className="ri-stock-line" />, // Option Chain icon
      label: (<>Option <br />Chain</>),
    });
  }
    }

    return baseItems;
  }, [permissionData]);

  const getSidebarMenu = () => {
    return (
      sidebarItems[role]?.filter(
        (item) =>
          !item.permission || item.permission.some((p) => permission.includes(p))
      ) || []
    );
  };

  return (
    <div
      className="iq-sidebar sidebar-right"
      ref={sidebarRef}
      onClick={() => sessionStorage.clear()}
    >
      <div
        id="sidebar-scrollbar"
        data-scrollbar="true"
        tabIndex={-1}
        style={{ overflow: "hidden", outline: "none" }}
      >
        <div className="scroll-content">
          <nav className="iq-sidebar-menu">
            <ul className="iq-menu">
              {getSidebarMenu().map((item) => (
                <li
                  key={item.path}
                  className={`iq-menu-item-rightsidebar ${
                    activeItem === item.path ? "active" : ""
                  }`}
                >
                  <Link to={item.path} onClick={() => setActiveItem(item.path)}>
                    <OverlayTrigger
                      placement="left"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id={`tooltip-${item.path}`}>
                          {item.label}
                        </Tooltip>
                      }
                    >
                      <div className="d-inline-block link-icon">
                        {item.icon}
                      </div>
                    </OverlayTrigger>
                    <span className="ms-0">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-3" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
