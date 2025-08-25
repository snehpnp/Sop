export const getColumns = () => [
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
    name: "ScalpType",
    label: "ScalpType",
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
    name: "TType",
    label: "Trade Type",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Lot",
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
    name: "TaskTime",
    label: "Task Time",
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
export const getColumns1 = () => [
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
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "STG",
    label: "Strategy Type",
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
      // customBodyRender: (value, tableMeta, updateValue) => {
      //     return parseFloat(value).toFixed(4);
      // },
    },
  },
  {
    name: "SL value",
    // label: "Re-entry",
    label: "Stoploss",
    options: {
      filter: true,
      sort: true,
      // customBodyRender: (value, tableMeta, updateValue) => {
      //     return parseFloat(value).toFixed(4);
      // },
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
    name: "StrikeType",
    label: "Strike Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "DepthofStrike",
    label: "Strike value",
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
    name: "TradeCount",
    label: "No. of Cycle",
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
              {value.map((day, index) => (
                <>
                  {index > 0 && index % 3 === 0 ? <br /> : ""}
                  {typeof day === "object" && day.label ? day.label : day}
                  {index % 3 !== 2 && index !== value.length - 1 ? ", " : ""}
                </>
              ))}
            </span>
          );
        }
        return value;
      },
    },
  },
];
export const getColumns2 = () => [
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
    name: "Symbol",
    label: "Symbol",
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
    name: "Pattern",
    label: "Pattern Name",
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
    name: "Quantity",
    label: "Lot",
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
    name: "TradeExecution",
    label: "Trade Execution",
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
    name: "TradeCount",
    label: "TradeCount",
    options: {
      filter: true,
      sort: true,
    },
  },
];

export const getColumns9 = () => [
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
    name: "Symbol",
    label: "Symbol",
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
    name: "Targetselection",
    label: "Target Selection",
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
    name: "Booking Point",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Re-entry Point",
    label: "Re-Entry",
    options: {
      filter: true,
      sort: true,
    },
  },

  // {
  //     name: "ScalpType",
  //     label: "ScalpType",
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
    name: "Token",
    label: "Token",
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
    name: "TaskTime",
    label: "Task Time",
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
      customBodyRender: (value) => (value ? value : "-"),
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
              {value.map((day, index) => (
                <>
                  {index > 0 && index % 3 === 0 ? <br /> : ""}
                  {typeof day === "object" && day.label ? day.label : day}
                  {index % 3 !== 2 && index !== value.length - 1 ? ", " : ""}
                </>
              ))}
            </span>
          );
        }
        return value;
      },
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
  {
    name: "GroupN",
    label: "Unique Name",
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
    name: "MainSymbol",
    label: "Main Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "OrderType",
    label: "OrderType",
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
    name: "MatchPosition",
    label: "Match Position",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? "true" : "false"),
    },
  },

  {
    name: "FinalTarget",
    label: "Final Target",
    options: {
      filter: true,
      sort: true,
    },
  },
];

export const getColumns3 = (Targetselection) => {
  const columns = [
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
      name: "ScalpType",
      label: "Target Type",
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
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EPrice",
      label: "Entry Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "TradeType",
      label: "Transaction Type",
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
      name: "Target",
      label: "Target",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Trade",
      label: "Trade",
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
  ];

  if (Targetselection === "Single") {
    columns.splice(8, 0, {
      name: "SL",
      label: "Stoploss",
      options: {
        filter: true,
        sort: true,
      },
    });
  } else {
    columns.splice(8, 0, {
      name: "SL",
      label: "Re-entry",
      options: {
        filter: true,
        sort: true,
      },
    });
  }
  return columns;
};
export const getColumns6 = (Targetselection) => {
  const columns = [
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
      name: "ScalpType",
      label: "Target Type",
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
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EPrice",
      label: "Entry Price",
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
      name: "ExitPrice",
      label: "Exit Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "TradeType",
      label: "Transaction Type",
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
      name: "Target",
      label: "Target",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Trade",
      label: "Trade",
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
  ];
  if (Targetselection === "Single") {
    columns.splice(10, 0, {
      name: "SL",
      label: "Stoploss",
      options: {
        filter: true,
        sort: true,
      },
    });
  } else {
    columns.splice(10, 0, {
      name: "SL",
      label: "Re-entry",
      options: {
        filter: true,
        sort: true,
      },
    });
  }

  return columns;
};

export const getColumns4 = (STG) => {
  const columns = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowIndex + 1;
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
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EPrice",
      label: "Entry Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "TradeType",
      label: "Transaction Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "LotSize",
      label: "Quantity",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Option Type",
      label: "Option Type",
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
      name: "SL",
      label: "Stoploss",
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
      name: "Hashing",
      label: "Hashing",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  if (STG !== "LongShifting" && STG !== "ShortShifting") {
    columns.splice(12, 0, {
      name: "Spot Price",
      label: "Spot Price",
      options: {
        filter: true,
        sort: true,
      },
    });
  }

  if (STG === "LongShifting" || STG == "ShortShifting") {
    columns.push({
      name: "EnFPrice",
      label: "Future Entry Price",
      options: {
        filter: true,
        sort: true,
      },
    });

    // columns.push({
    //     name: "ExFPrice",
    //     label: "Future Exit Price",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // });
  }

  return columns;
};

export const getColumns7 = (STG) => {
  const columns = [
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
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EPrice",
      label: "Entry Price",
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
      name: "ExitPrice",
      label: "Exit Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "TradeType",
      label: "Transaction Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "LotSize",
      label: "Quantity",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Option Type",
      label: "Option Type",
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
      name: "SL",
      label: "Stoploss",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Trade",
      label: "Trade",
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
      name: "Token",
      label: "Token",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Hashing",
      label: "Hashing",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  if (STG !== "LongShifting" && STG !== "ShortShifting") {
    columns.splice(12, 0, {
      name: "Spot Price",
      label: "Spot Price",
      options: {
        filter: true,
        sort: true,
      },
    });
  }

  if (STG === "LongShifting" || STG == "ShortShifting") {
    columns.push({
      name: "EnFPrice",
      label: "Future Entry Price",
      options: {
        filter: true,
        sort: true,
      },
    });

    columns.push({
      name: "ExFPrice",
      label: "Future Exit Price",
      options: {
        filter: true,
        sort: true,
      },
    });
  }

  return columns;
};
//Pattern
export const getColumns5 = () => [
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
    name: "TradePattern",
    label: "Pattern Type",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "SPattern",
    label: "Pattern Name",
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
    name: "ETime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EPrice",
    label: "Entry Price",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "TradeType",
    label: "Transaction Type",
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
    name: "Target",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SL",
    label: "Stoploss",
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
    name: "PatternTime",
    label: "Pattern Time",
    options: {
      filter: true,
      sort: true,
    },
  },
];

export const getColumns8 = () => [
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
    name: "TradePattern",
    label: "Pattern Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SPattern",
    label: "Pattern Name",
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
    name: "PatternTime",
    label: "Pattern Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ETime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EPrice",
    label: "Entry Price",
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
    name: "ExitPrice",
    label: "Exit Price",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeType",
    label: "Transaction Type",
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
    name: "Target",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SL",
    label: "Stoploss",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Trade",
    label: "Trade",
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

  // {
  //     name: "Token",
  //     label: "Token",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
];

// close
export const getColumns10 = () => [
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
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },

  // {
  //     name: "AccType",
  //     label: "AccType",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },

  // {
  //     name: "Segmenttype",
  //     label: "Segmenttype",
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
    name: "EPrice",
    label: "Entry Price",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "ETime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitPrice",
    label: "Exit Price",
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
    name: "StrategyTag",
    label: "Strategy Tag",
    options: {
      filter: true,
      sort: true,
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
    name: "Quantity",
    label: "Quantity",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Trade",
    label: "Status",
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
    name: "SL",
    // label: "Re-entry",
    label: "Stoploss",
    options: {
      filter: true,
      sort: true,
    },
  },

  //  {
  //     name: "ManuallyExit",
  //     label: "Manually Exit",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
];

// open
export const getColumns12 = () => [
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
  //     name: "AccType",
  //     label: "AccType",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },

  // {
  //     name: "Segmenttype",
  //     label: "Segmenttype",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "EPrice",
    label: "Entry Price",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "ETime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitPrice",
    label: "Exit Price",
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
    name: "TradeType",
    label: "Trade Type",
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
    name: "SL",
    // label: "Re-entry",
    label: "Stoploss",
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
    name: "StrategyTag",
    label: "Strategy Tag",
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
    name: "Trade",
    label: "Status",
    options: {
      filter: true,
      sort: true,
    },
  },
];

export const getgoldenStrategyCol = () => [
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
      customBodyRender: (value) => value?.join(", "),
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
      customBodyRender: (value) => (value ? "True" : "False"),
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

export const goldenstrategy_tradereport = () => [
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
  { name: "Exchange", selector: (row) => row.Exchange, sortable: true },
   {
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
   {
      name: "EPrice",
      label: "Entry Price",
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
      name: "ExitPrice",
      label: "Exit Price",
      options: {
        filter: true,
        sort: true,
      },
    },
  {
    name:"Target",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
    },
    { name: "SL",
      label: "Stoploss",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "Trade",
        label: "Trade",
        options: {
            filter: true,
            sort: true,
        },
        },
    {
        name: "MOTrade",
        label: "MO Trade",
        options: {
            filter: true,
            sort: true,
        },
        },
    {   
        name: "LotSize",
        label: "Lot Size",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "MOPnL",
        label: "MO PnL",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "MCPnL",
        label: "MC PnL",
        options: {
            filter: true,
            sort: true,
        },
    },

    {    name: "Username",
        label: "Username",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "Strategy",
        label: "Strategy",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "Option Type",
        label: "Option Type",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "Strike price",
        label: "Strike Price",
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
      name:"Spot Price",
      label:"Spot Price",
      options:{
          filter:true,
          sort:true
      }
    },
    {
        name: "Hashing",
        label: "Hashing",
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
        name: "TradeType",
        label: "Trade Type",
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
        name: "CallExitTargettype",
        label: "Call Exit Target Type",
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
        name: "CallExitSltype",
        label: "Call Exit SL Type",
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
      name:"Intraday Exit",
      label:"Intraday Exit",
      options:{
          filter:true,
          sort:true
      }
    },
    {
      name:"TradeExecution",
      label:"Trade Execution",
      options:{
          filter:true,
          sort:true
      }
    },
    {
      name:"TRColl",
      label:"TR Collection",
      options:{
          filter:true,
          sort:true
      }
  },
    {      name: "Quantity",
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
        name: "Trading",
        label: "Trading",
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
        },
    },
    {
        name: "statusofExit",
        label: "Status of Exit",
        options: {
            filter: true,
            sort: true,
        },
    },
];
// {
//     "SN": 1,
//     "Exchange": "BFO",
//     "ETime": "2025.08.13 12:13:32",
//     "EPrice": 404.05,
//     "ExitTime": "2025.08.13 12:17:51",
//     "ExitPrice": 417.7,
//     "MOTrade": 1,
//     "LotSize": 20,
//     "MOPnL": 0,
//     "MCPnL": 0,
//     "Trade": "Close",
//     "Target": 416.05,
//     "SL": 384.05,
//     "Username": "shashwat",
//     "Strategy": "MomentumPicker",
//     "Option Type": "PE",
//     "Strike price": 80600,
//     "Token": "847136",
//     "Symbol": "SENSEX2581980600PE",
//     "Spot Price": 80711.1,
//     "Hashing": "First",
//     "MainSymbol": "SENSEX",
//     "TradeType": "BUY",
//     "GroupN": "A",
//     "CallExitTargettype": "PE",
//     "PutExitTargettype": "PE",
//     "CallExitSltype": "PE",
//     "PutExitSltype": "PE",
//     "Intraday Exit": "15:14:00",
//     "TradeExecution": "Live Trade",
//     "TRColl": "MomentumPicker_TradeReport",
//     "Quantity": 20,
//     "Product Type": "Intraday",
//     "Trading": true,
//     "DeleteSignal": false,
//     "statusofExit": "STarget"
// }