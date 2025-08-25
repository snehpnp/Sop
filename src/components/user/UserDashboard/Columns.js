import React, { useEffect, useState } from "react";
import { CopyPlus } from "lucide-react";
import Checkbox from "@mui/material/Checkbox";
import { SquarePen, EllipsisVertical } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

import { IconButton, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const DropdownComponent = ({
  tableMeta,
  handleDelete,
  type,
  handleMatchPosition,
  handleEdit,
}) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null); // Ref for the button trigger
  const handleDropdownToggle = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      return;
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 200; // Approximate height of the dropdown

      let top = rect.bottom + window.scrollY;
      let left = rect.left + window.scrollX;

      // If dropdown will overflow below, position it above
      if (top + dropdownHeight > window.innerHeight) {
        top = rect.top + window.scrollY - dropdownHeight;
      }

      setDropdownPosition({ top, left });
    }

    setIsDropdownOpen(true);
  };

  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);



  return (
    <>
      {/* Dropdown Trigger */}
      <button
        ref={buttonRef}
        onClick={handleDropdownToggle}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <EllipsisVertical className="card-text-Color" />
      </button>

      {/* Dropdown Menu using Portal to prevent clipping */}
      {isDropdownOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              background: "#333",
              color: "#fff",
              border: "1px solid #555",
              borderRadius: "4px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              zIndex: 1,
              maxHeight: "200px",
              overflowY: "auto",
              minWidth: "150px",
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: "8px 0" }}>
              {/* New Edit Option */}
              <li
                onClick={() => {
                  handleEdit();
                  setIsDropdownOpen(false);
                }}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "#fff",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#333";
                }}
              >
                Edit
              </li>
              <li
                onClick={() => {
                  handleDelete();
                  setIsDropdownOpen(false);
                }}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  backgroundColor: "#333",
                  color: "#fff",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#333")}
              >
                Delete
              </li>
           
              <li
                onClick={() =>
                  navigate("/user/tradereport", {
                    state: {
                      type,
                      RowIndex: tableMeta?.rowIndex,
                      goto: "dashboard",
                    },
                  })
                }
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "#fff",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#333")}
              >
                Trade Report
              </li>

              <li
                onClick={() =>
                  navigate("/user/tradehistory", {
                    state: {
                      type,
                      RowIndex: tableMeta?.rowIndex,
                      goto: "dashboard",
                    },
                  })
                }
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "#fff",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#333")}
              >
                Trade History
              </li>

              <li
                onClick={() =>
                  navigate("/user/traderesponse", {
                    state: {
                      type,
                      RowIndex: tableMeta?.rowIndex,
                      goto: "dashboard",
                      tableMeta: tableMeta.rowData,
                    },
                  })
                }
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "#fff",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#333")}
              >
                Trade Response
              </li>
              <li
                onClick={() =>
                  navigate("/user/profitandloss", {
                    state: {
                      type,
                      RowIndex: tableMeta?.rowIndex,
                      goto: "dashboard",
                    },
                  })
                }
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "#fff",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#333")}
              >
                Net P&L
              </li>
            </ul>
          </div>,
          document.body // Portal target
        )}
    </>
  );
};

export const getColumns = (handleAddScript1) => [
  {
    name: "S.No",
    label: "S.No",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowIndex = tableMeta.rowIndex;
        return rowIndex + 1;
      },
    },
  },
  {
    name: "coptScript",
    label: "Copy Script",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <CopyPlus onClick={(e) => handleAddScript1(tableMeta, 1)} />;
      },
    },
  },
  {
    name: "ScalpType",
    label: "Scalp Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TStype",
    label: "Measurement Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Booking Point",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Re-entry Point",
    label: "Re-entry",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EntryPrice",
    label: "First Trade Lower Range",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EntryRange",
    label: "First Trade Higher Range",
    options: {
      filter: true,
      sort: true,
    },
  },
  // {
  //     name: "LowerRange",
  //     label: "Lower Range",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  // {
  //     name: "HigherRange",
  //     label: "Higher Range",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  {
    name: "TType",
    label: "Trade Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Quantity",
    label: "Lot",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExpiryDate",
    label: "Expiry Date",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeExecution",
    label: "Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitDay",
    label: "Exit Day",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EntryTime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitTime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SSDate",
    label: "SSDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SEDate",
    label: "SEDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "GroupN",
    label: "Unique Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeCount",
    label: "Trade Count",
    options: {
      filter: true,
      sort: true,
    },
  },
];

export const getColumns7 = (handleAddScript1) => [
  {
    name: "S.No",
    label: "S.No",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowIndex = tableMeta.rowIndex;
        return rowIndex + 1;
      },
    },
  },
  {
    name: "coptScript",
    label: "Copy Script",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <CopyPlus onClick={(e) => handleAddScript1(tableMeta, 2)} />;
      },
    },
  },
  {
    name: "ScalpType",
    label: "Scalp Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TStype",
    label: "Measurement Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Booking Point",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Re-entry Point",
    label: "Re-entry",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EntryPrice",
    label: "First Trade Lower Range",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EntryRange",
    label: "First Trade Higher Range",
    options: {
      filter: true,
      sort: true,
    },
  },
  // {
  //     name: "LowerRange",
  //     label: "Lower Range",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  // {
  //     name: "HigherRange",
  //     label: "Higher Range",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  {
    name: "TType",
    label: "Trade Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Quantity",
    label: "Lot",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExpiryDate",
    label: "Expiry Date",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeExecution",
    label: "Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitDay",
    label: "Exit Day",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EntryTime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitTime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SSDate",
    label: "SSDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SEDate",
    label: "SEDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "GroupN",
    label: "Unique Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeCount",
    label: "Trade Count",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "WorkingDay",
    label: "Working Day",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return "-";
        }
        if (Array.isArray(value)) {
          if (value.length && typeof value[0] === "object" && value[0].label) {
            return value.map((day) => day.label).join(", ");
          }
          // Fallback: if it's an array of strings
          return value.join(", ");
        }
        return value;
      },
    },
  },
];

export const getColumns1 = (handleAddScript2) => [
  {
    name: "S.No",
    label: "S.No",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowIndex = tableMeta.rowIndex;
        return rowIndex + 1;
      },
    },
  },
  {
    name: "coptScript",
    label: "Copy Script",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <CopyPlus onClick={(e) => handleAddScript2(tableMeta)} />;
      },
    },
  },
  {
    name: "STG",
    label: "Strategy",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Targettype",
    label: "Risk Handle",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Instrument Type",
    label: "Instrument Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Expirydate",
    label: "Expiry Date",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Expirytype",
    label: "Expiry Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "strategytype",
    label: "Strategy Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Target value",
    label: "Target value",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SL value",
    label: "Re-entry",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeExecution",
    label: "Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Lot Size",
    label: "Quantity",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Product Type",
    label: "Product Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Entry Time",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Exit Time",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "SEDate",
    label: "SEDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SSDate",
    label: "SSDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "StrikeType",
    label: "Strike Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "DepthofStrike",
    label: "Strike Value",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "DeepStrike",
    label: "Deep Strike",
    options: {
      filter: true,
      sort: true,
    },
  },
  // {
  //     name: "LowerRange",
  //     label: "Lower Range",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  // {
  //     name: "HigherRange",
  //     label: "Higher Range",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  {
    name: "TaskStatus",
    label: "TaskStatus",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TaskTime",
    label: "TaskTime",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeCount",
    label: "Trade Count",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "WorkingDay",
    label: "Working Day",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return "-";
        }
        if (Array.isArray(value)) {
          if (value.length && typeof value[0] === "object" && value[0].label) {
            return value.map((day) => day.label).join(", ");
          }
          // Fallback: if it's an array of strings
          return value.join(", ");
        }
        return value;
      },
    },
  },
];

export const getColumns2 = (handleAddScript3) => [
  {
    name: "S.No",
    label: "S.No",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowIndex = tableMeta.rowIndex;
        return rowIndex + 1;
      },
    },
  },
  {
    name: "coptScript",
    label: "Copy Script",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <CopyPlus onClick={(e) => handleAddScript3(tableMeta)} />;
      },
    },
  },

  {
    name: "TradePattern",
    label: "Trade Pattern",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Pattern",
    label: "Pattern",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Expiry Date",
    label: "Expiry Date",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Instrument Name",
    label: "Instrument Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TType",
    label: "Trade Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Quantity",
    label: "Quantity",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TimeFrame",
    label: "Time Frame",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Target value",
    label: "Target value",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SL value",
    label: "Re-entry",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TStype",
    label: "Measurement Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeExecution",
    label: "Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitDay",
    label: "Exit Day",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EntryTime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitTime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SSDate",
    label: "SSDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SEDate",
    label: "SEDate",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "TradeCount",
    label: "Trade Count",
    options: {
      filter: true,
      sort: true,
    },
  },
];

export const getColumns3 = (
  handleDelete,
  handleEdit,
  handleContinutyDiscontinuty
) => [
  {
    name: "S.No",
    label: "S.No",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowIndex = tableMeta.rowIndex;
        return rowIndex + 1;
      },
    },
  },
  {
    name: "Edit",
    label: "Edit",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <button className="btn" onClick={() => handleEdit(tableMeta)}>
              <SquarePen />
            </button>
          </>
        );
      },
    },
  },

  {
    name: "Trading",
    label: "Trading",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const label = value ? "Continue" : "Discontinue";
        const labelStyle = value
          ? { backgroundColor: "green", color: "white" }
          : { backgroundColor: "red", color: "white" };

        return label === "Continue" ? (
          <button
            style={{ width: "7rem" }}
            onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
            type="button"
            className="btn btn-outline-success"
          >
            {label}
          </button>
        ) : (
          <button
            style={{ width: "7rem" }}
            onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
            type="button"
            className="btn btn-outline-danger"
          >
            {label}
          </button>
        );
      },
    },
  },
  {
    name: "ScalpType",
    label: "Scalp Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Action",
    label: "Action",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div>
            <DropdownComponent
              tableMeta={tableMeta}
              handleDelete={() => handleDelete(tableMeta, 1)}
              type="Scalping"
            />
          </div>
        );
      },
    },
  },
  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TStype",
    label: "Measurement Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Booking Point",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Re-entry Point",
    label: "Re-entry",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EntryPrice",
    label: "First Trade Lower Range",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EntryRange",
    label: "First Trade Higher Range",
    options: {
      filter: true,
      sort: true,
    },
  },
  // {
  //     name: "LowerRange",
  //     label: "Lower Range",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  // {
  //     name: "HigherRange",
  //     label: "Higher Range",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  {
    name: "TType",
    label: "Trade Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Quantity",
    label: "Quantity",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExpiryDate",
    label: "Expiry Date",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeExecution",
    label: "Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitDay",
    label: "Exit Day",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EntryTime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitTime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SSDate",
    label: "SSDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SEDate",
    label: "SEDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "GroupN",
    label: "Unique Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeCount",
    label: "Trade Count",
    options: {
      filter: true,
      sort: true,
    },
  },
];

export const getColumns4 = (
  handleDelete,
  handleEdit,
  handleContinutyDiscontinuty
) => [
  {
    name: "S.No",
    label: "S.No",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowIndex = tableMeta.rowIndex;
        return rowIndex + 1;
      },
    },
  },

  // {
  //     name: "Edit",
  //     label: "Edit",
  //     options: {
  //         filter: true,
  //         sort: true,
  //         customBodyRender: (value, tableMeta, updateValue) => {
  //             return <><button className='btn' onClick={() => handleEdit(tableMeta)}>
  //                 <SquarePen style={{ color: "white" }} />
  //             </button>

  //             </>
  //         }
  //     }
  // },

  // {
  //     name: "Trading",
  //     label: "Trading",
  //     options: {
  //         filter: true,
  //         sort: true,
  //         customBodyRender: (value, tableMeta, updateValue) => {
  //             const isChecked = Boolean(value);
  //             return (
  //                 <Checkbox
  //                     checked={isChecked}
  //                     onClick={() => handleContinutyDiscontinuty(tableMeta, 1)}
  //                 />

  //             );
  //         }
  //     }
  // },
  // {
  //     name: "Trading",
  //     label: "Trading",
  //     options: {
  //         filter: true,
  //         sort: true,
  //         customBodyRender: (value, tableMeta, updateValue) => {

  //             const label = value ? "Continue" : "Discontinue";
  //             const labelStyle = value ? { color: 'green' } : { color: 'red' };

  //             return (
  //                 <button
  //                     onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
  //                     style={labelStyle}
  //                 >
  //                     {label}
  //                 </button>
  //             );
  //         }
  //     }
  // },
  {
    name: "Trading",
    label: "Trading",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const label = value ? "Continue" : "Discontinue";
        const labelStyle = value
          ? { backgroundColor: "green", color: "white" }
          : { backgroundColor: "red", color: "white" };

        return label === "Continue" ? (
          <button
            style={{ width: "7rem" }}
            onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
            type="button"
            className="btn btn-outline-success"
          >
            {label}
          </button>
        ) : (
          <button
            style={{ width: "7rem" }}
            onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
            type="button"
            className="btn btn-outline-danger"
          >
            {label}
          </button>
        );
      },
    },
  },

  {
    name: "Token",
    label: "LivePrice",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div>
            <span className={`LivePrice_${value}`}>-</span>
          </div>
        );
      },
    },
  },
  {
    name: "STG",
    label: "Strategy",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Targettype",
    label: "Risk Handle",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Action",
    label: "Action",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div>
            <DropdownComponent
              tableMeta={tableMeta}
              handleDelete={() => handleDelete(tableMeta, 1)}
              handleEdit={() => handleEdit(tableMeta)}
              type="Option Strategy"
            />
          </div>
        );
      },
    },
  },

  {
    name: "Expirydate",
    label: "Expiry Date",
    options: {
      filter: true,
      sort: true,
    },
  },

  // {
  //     name: "Instrument Type",
  //     label: "Instrument Type",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },

  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Expirytype",
    label: "Expiry Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "strategytype",
    label: "Measurement Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Target value",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SL value",
    label: "Stoploss",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeExecution",
    label: "Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Lot Size",
    label: "Lot",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Entry Time",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Exit Time",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Product Type",
    label: "Exit Day",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "SSDate",
    label: "SSDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SEDate",
    label: "SEDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "StrikeType",
    label: "Strike Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "DepthofStrike",
    label: "Strike Value",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "DeepStrike",
    label: "Deep Strike",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "LowerRange",
    label: "Lower Range",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "HigherRange",
    label: "Higher Range",
    options: {
      filter: true,
      sort: true,
    },
  },
  //
  {
    name: "TaskTime",
    label: "Task Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeCount",
    label: "No. of Cycle",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "CEDepthLower",
    label: "CE Main Lower",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "CEDepthHigher",
    label: "CE Main Higher",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "CEDeepLower",
    label: "CE Hedge Lower",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "CEDeepHigher",
    label: "CE Hedge Higher",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "PEDepthLower",
    label: "PE Main Lower",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "PEDepthHigher",
    label: "PE Main Higher",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "PEDeepLower",
    label: "PE Hedge Lower",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "PEDeepHigher",
    label: "PE Hedge Higher",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "ExitRuleO",
    label: "Exit Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  // {
  //     name: "FixedSM",
  //     label: "Fixed SM",
  //     options: {
  //         filter: true,
  //         sort: true,
  //         customBodyRender: (value) => value ? value : "-"
  //     }
  // },
  // {
  //     name: "GroupN",
  //     label: "Group N",
  //     options: {
  //         filter: true,
  //         sort: true,
  //         customBodyRender: (value) => value ? value : "-"
  //     }
  // },

  // {
  //     name: "MainSymbol",
  //     label: "Main Symbol",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },

  {
    name: "Profit",
    label: "Profit",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Loss",
    label: "Loss",
    options: {
      filter: true,
      sort: true,
    },
  },

  // {
  //     name: "Spread",
  //     label: "Spread",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  // {
  //     name: "Username",
  //     label: "Username",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  {
    name: "WorkingDay",
    label: "Working Day",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return "-";
        }
        if (Array.isArray(value)) {
          return (
            <span>
              {value.map((day, index) =>
                index > 0 && index % 3 === 0 ? (
                  <>
                    <br />
                    {day}
                  </>
                ) : index === 0 ? (
                  day
                ) : (
                  `, ${day}`
                )
              )}
            </span>
          );
        }
        return value;
      },
    },
  },
];

export const getColumns5 = (
  handleDelete,
  handleEdit,
  handleContinutyDiscontinuty
) => [
  {
    name: "S.No",
    label: "S.No",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowIndex = tableMeta.rowIndex;
        return rowIndex + 1;
      },
    },
  },

  // {
  //     name: "Edit",
  //     label: "Edit",
  //     options: {
  //         filter: true,
  //         sort: true,
  //         customBodyRender: (value, tableMeta, updateValue) => {
  //             return <><button className='btn ' onClick={() => handleEdit(tableMeta)}>
  //                 <SquarePen style={{ color: "white" }} />
  //             </button>

  //             </>
  //         }
  //     }
  // },
  // {
  //     name: "Trading",
  //     label: "Trading",
  //     options: {
  //         filter: true,
  //         sort: true,
  //         customBodyRender: (value, tableMeta, updateValue) => {
  //             const isChecked = Boolean(value);
  //             return (
  //                 <Checkbox
  //                     checked={isChecked}
  //                     onClick={() => handleContinutyDiscontinuty(tableMeta, 1)}
  //                 />
  //             );
  //         }
  //     }
  // },
  {
    name: "Trading",
    label: "Trading",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const label = value ? "Continue" : "Discontinue";
        const labelStyle = value
          ? { backgroundColor: "green", color: "white" }
          : { backgroundColor: "red", color: "white" };

        return label === "Continue" ? (
          <button
            style={{ width: "7rem" }}
            onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
            type="button"
            className="btn btn-outline-success"
          >
            {label}
          </button>
        ) : (
          <button
            style={{ width: "7rem" }}
            onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
            type="button"
            className="btn btn-outline-danger"
          >
            {label}
          </button>
        );
      },
    },
  },

  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Token",
    label: "LivePrice",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div>
            <span className={`LivePrice_${value}`}>-</span>
          </div>
        );
      },
    },
  },
  {
    name: "TimeFrame",
    label: "Time Frame",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Pattern",
    label: "Pattern Name",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Action",
    label: "Action",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div>
            <DropdownComponent
              tableMeta={tableMeta}
              handleDelete={() => handleDelete(tableMeta, 2)}
              handleEdit={() => handleEdit(tableMeta)}
              type="Pattern"
            />
          </div>
        );
      },
    },
  },

  {
    name: "TType",
    label: "Transaction Type",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "TradeExecution",
    label: "Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "TradePattern",
    label: "Pattern Type",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Expiry Date",
    label: "Expiry Date",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },

  // {
  //     name: "Symbol",
  //     label: "Symbol",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },

  {
    name: "TType",
    label: "Trade Type",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Quantity",
    label: "Lot",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TStype",
    label: "Measurement Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "WorkingDay",
    label: "Working Day",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return "-";
        }
        if (Array.isArray(value)) {
          return (
            <span>
              {value.map((day, index) =>
                index > 0 && index % 3 === 0 ? (
                  <>
                    <br />
                    {day}
                  </>
                ) : index === 0 ? (
                  day
                ) : (
                  `, ${day}`
                )
              )}
            </span>
          );
        }
        return value;
      },
    },
  },
  {
    name: "Profit",
    label: "Max Profit",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Loss",
    label: "Max Loss",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Target value",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SL value",
    label: "Stoploss",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "EntryTime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitTime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitDay",
    label: "Exit Day",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SSDate",
    label: "SSDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SEDate",
    label: "SEDate",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "TradeCount",
    label: "Trade Count",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Instrument Type",
    label: "Instrument Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  // {
  //     name: "MainSymbol",
  //     label: "Main Symbol",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  // {
  //     name: "TaskStatus",
  //     label: "Task Status",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  {
    name: "TaskTime",
    label: "Task Time",
    options: {
      filter: true,
      sort: true,
    },
  },

  // {
  //     name: "Trend",
  //     label: "Trend",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },

  // {
  //     name: "Username",
  //     label: "Username",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
];

export const getColumns6 = (
  handleDelete,
  handleEdit,
  handleContinutyDiscontinuty,
  handleMatchPosition
) => [
  {
    name: "S.No",
    label: "S.No",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowIndex = tableMeta.rowIndex;
        return rowIndex + 1;
      },
    },
  },

  {
    name: "Trading",
    label: "Trading",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const label = value ? "Continue" : "Discontinue";
        const labelStyle = value
          ? { backgroundColor: "green", color: "white" }
          : { backgroundColor: "red", color: "white" };

        return label === "Continue" ? (
          <button
            style={{ width: "7rem" }}
            onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
            type="button"
            className="btn btn-outline-success"
          >
            {label}
          </button>
        ) : (
          <button
            style={{ width: "7rem" }}
            onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
            type="button"
            className="btn btn-outline-danger"
          >
            {label}
          </button>
        );
      },
    },
  },

  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Token",
    label: "LivePrice",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div>
            <span className={`LivePrice_${value}`}>-</span>
          </div>
        );
      },
    },
  },

  {
    name: "TradeExecution",
    label: "Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Targetselection",
    label: "Target Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Action",
    label: "Action",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div>
            <DropdownComponent
              tableMeta={tableMeta}
              handleDelete={() => handleDelete(tableMeta, 2)}
              handleMatchPosition={() => handleMatchPosition(tableMeta, 2)}
              handleEdit={() => handleEdit(tableMeta, 2)}
              type="MultiCondition"
            />
          </div>
        );
      },
    },
  },
  {
    name: "Quantity",
    label: "Lot",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "TType",
    label: "Transaction Type",
    options: {
      filter: true,
      sort: true,
    },
  },

  // {
  //     name: "ScalpType",
  //     label: "Scalp Type",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },

  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "WorkingDay",
    label: "Working Day",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return "-";
        }
        if (Array.isArray(value)) {
          return (
            <span>
              {value.map((day, index) =>
                index > 0 && index % 3 === 0 ? (
                  <>
                    <br />
                    {day}
                  </>
                ) : index === 0 ? (
                  day
                ) : (
                  `, ${day}`
                )
              )}
            </span>
          );
        }
        return value;
      },
    },
  },

  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "TStype",
    label: "Measurement Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Booking Point",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Re-entry Point",
    label: "Re-entry",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EntryPrice",
    label: "First Trade Lower Range",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EntryRange",
    label: "First Trade Higher Range",
    options: {
      filter: true,
      sort: true,
    },
  },
  // {
  //     name: "LowerRange",
  //     label: "Lower Range",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  // {
  //     name: "HigherRange",
  //     label: "Higher Range",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },

  {
    name: "ExpiryDate",
    label: "Expiry Date",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "EntryTime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitTime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitDay",
    label: "Exit Day",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SSDate",
    label: "SSDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SEDate",
    label: "SEDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "GroupN",
    label: "Unique Name",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "TargetExit",
    label: "Continue after cycle exit",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? "true" : "false"),
    },
  },
  {
    name: "TradeCount",
    label: "No. of Cycle",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "StepUp",
    label: "Step Up",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "IncrementType",
    label: "Increment Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Incrementvalue",
    label: "Increment Value",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Booking Point2",
    label: "Target 2",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Booking Point3",
    label: "Target 3",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Quantity2",
    label: "Lot 2",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Quantity3",
    label: "Lot 3",
    options: {
      filter: true,
      sort: true,
    },
  },

  // {
  //     name: "Expirytype",
  //     label: "Expiry Type",
  //     options: {
  //         filter: true,
  //         sort: true,
  //         customBodyRender: (value) => value ? value : "-"
  //     }
  // },
  {
    name: "FinalTarget",
    label: "Final Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "RepeatationCount",
    label: "Repetition Count",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "HoldExit",
    label: "Hold / Exit",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Instrument Type",
    label: "Instrument Type",
    options: {
      filter: true,
      sort: true,
    },
  },

  // {
  //     name: "MainSymbol",
  //     label: "Main Symbol",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },

  // {
  //     name: "MatchPosition",
  //     label: "Match Position",
  //     options: {
  //         filter: true,
  //         sort: true,
  //         customBodyRender: (value) => value ? "true" : "false"
  //     }
  // },

  {
    name: "OrderType",
    label: "Order Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "PositionType",
    label: "Position Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Profit",
    label: "Profit",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Loss",
    label: "Loss",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "RolloverTF",
    label: "Rollover",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? "true" : "false"),
    },
  },

  {
    name: "RolloverDay",
    label: "Rollover Day",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? value : "-"),
    },
  },

  {
    name: "RolloverTime",
    label: "Rollover Time",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? value : "-"),
    },
  },

  {
    name: "TaskTime",
    label: "Task Time",
    options: {
      filter: true,
      sort: true,
    },
  },
];

export const getColumns8 = (
  HandleContinueDiscontinue,
  chartingSubTab,
  getChartingScript
) => [
  {
    name: "S.No",
    label: "S.No",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowIndex = tableMeta.rowIndex;
        return rowIndex + 1;
      },
    },
  },

  {
    name: "TSymbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },

  // {
  //     name: "Trading",
  //     label: "Trading",
  //     options: {
  //         filter: true,
  //         sort: true,
  //         customBodyRender: (value, tableMeta, updateValue) => {
  //             const isChecked = Boolean(value);

  //             return (
  //                 <Checkbox
  //                     checked={isChecked}
  //                     onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
  //                 />

  //             );
  //         }
  //     }
  // },

  // {
  //     name: "Trading",
  //     label: "Trading",
  //     options: {
  //         filter: true,
  //         sort: true,
  //         customBodyRender: (value, tableMeta, updateValue) => {
  //             const label = value ? "Continue" : "Discontinue";
  //             const labelStyle = value ? { backgroundColor: 'green', color: 'white' } : { backgroundColor: 'red', color: 'white' };

  //             return (

  //                 label === "Continue" ? (
  //                     <button style={{ width: "7rem" }} onClick={() => handleContinutyDiscontinuty(tableMeta, 2)} type="button" className="btn btn-outline-success">{label}</button>) : (
  //                     <button style={{ width: "7rem" }} onClick={() => handleContinutyDiscontinuty(tableMeta, 2)} type="button" className="btn btn-outline-danger">{label}</button>
  //                 )

  //             );
  //         }
  //     }
  // },

  {
    name: "EntryPrice",
    label: "Entry Price",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "EntryTime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },

  // {
  //     name: "ExitPrice",
  //     label: "Exit Price",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },

  {
    name: "StrategyTag",
    label: "Strategy Tag",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Status",
    label: "Status",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "ManuallyExit",
    label: "Manually Exit",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) =>
        tableMeta.rowData[tableMeta.columnIndex - 1] === "Open" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => {
                HandleContinueDiscontinue(tableMeta);
                
              }}
            >
              <ExitToAppIcon color="error" />
            </IconButton>
            <Typography variant="caption" color="textSecondary">
              Exit
            </Typography>
          </div>
        ) : null,
    },
  },

  {
    name: "TType",
    label: "Transaction Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Target",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Sl",
    label: "Stoploss",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Ordertype",
    label: "Order Type",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Planname",
    label: "Plan Name",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "AccType",
    label: "Account Type",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? value : "-"),
    },
  },

  // {
  //     name: "Optiontype",
  //     label: "Option Type",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },

  ...(chartingSubTab === "Option"
    ? [
        {
          name: "Optiontype",
          label: "Option Type",
          options: {
            filter: true,
            sort: true,
          },
        },
      ]
    : []),

  {
    name: "Exittime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },

  //both status and Manully exit must be one after another
];

export const getgoldenStrategyCol = (
  handleDelete,
  handleEdit,
  handleContinutyDiscontinuty
) => [
  {
    name: "S.No",
    label: "S.No",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowIndex = tableMeta.rowIndex;
        return rowIndex + 1;
      },
    },
  },
  {
    name: "Edit",
    label: "Edit",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <button className="btn" onClick={() => handleEdit(tableMeta)}>
              <SquarePen />
            </button>
          </>
        );
      },
    },
  },

  {
    name: "Trading",
    label: "Trading",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const label = value ? "Continue" : "Discontinue";
        const labelStyle = value
          ? { backgroundColor: "green", color: "white" }
          : { backgroundColor: "red", color: "white" };

        return label === "Continue" ? (
          <button
            style={{ width: "7rem" }}
            onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
            type="button"
            className="btn btn-outline-success"
          >
            {label}
          </button>
        ) : (
          <button
            style={{ width: "7rem" }}
            onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
            type="button"
            className="btn btn-outline-danger"
          >
            {label}
          </button>
        );
      },
    },
  },

  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },
   {
    name: "TaskStatus",
    label: "TaskStatus",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Action",
    label: "Action",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div>
            <DropdownComponent
              tableMeta={tableMeta}
              handleDelete={() => handleDelete(tableMeta, 1)}
              type="Golden Strategy"


              
            />
          </div>
        );
      },
    },
  },
 // Naye columns insert karein iske niche (ya kahin bhi as per design)
{
  name: "STG",
  label: "STG",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "strategytype",
  label: "Strategy Type",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "Target value",
  label: "Target Value",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "SL value",
  label: "SL Value",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "Product Type",
  label: "Product Type",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "LowerRange",
  label: "Lower Range",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "HigherRange",
  label: "Higher Range",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "IName",
  label: "Instrument Name",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "Expirytype",
  label: "Expiry Type",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "TaskTime",
  label: "Task Time",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "Spread",
  label: "Spread",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "DepthofStrike",
  label: "Depth of Strike",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "StrikeType",
  label: "Strike Type",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "Instrument Type",
  label: "Instrument Type",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "Lot",
  label: "Lot",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "WorkingDay",
  label: "Working Days",
  options: {
    filter: true,
    sort: true,
    customBodyRender: (value) => value?.join(', ')
  },
},
{
  name: "TradeType",
  label: "Trade Type",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "Profit",
  label: "Profit",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "Loss",
  label: "Loss",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "DeleteSignal",
  label: "Delete Signal",
  options: {
    filter: true,
    sort: true,
    customBodyRender: (value) => value ? "True" : "False"
  },
},
{
  name: "BufferPointCE",
  label: "Buffer CE",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "BufferPointPE",
  label: "Buffer PE",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "NoofEntry",
  label: "No of Entry",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "FirstOptiontype",
  label: "First Option Type",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "CallExitTargettype",
  label: "Call Exit Target Type",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "CallExitSltype",
  label: "Call Exit SL Type",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "PutExitTargettype",
  label: "Put Exit Target Type",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "PutExitSltype",
  label: "Put Exit SL Type",
  options: {
    filter: true,
    sort: true,
  },
},

{
  name: "MainSymbol",
  label: "Main Symbol",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "Lot Size",
  label: "Lot Size",
  options: {
    filter: true,
    sort: true,
  },
},
{
  name: "Planname",
  label: "Plan Name",
  options: {
    filter: true,
    sort: true,
  },
},

];
