import { lab } from "d3";

export const columns = () => [
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
    label: "Re-entry",
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
    label: "SS Date",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SEDate",
    label: "SE Date",
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
    label: "Order Type",
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

  {
    name: "PositionType",
    label: "Position Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TaskStatus",
    label: "Task Status",
    options: {
      filter: true,
      sort: true,
    },
  },



  // {
  //   name: "Trading",
  //   label: "Trading",
  //   options: {
  //     filter: true,
  //     sort: true,
  //     customBodyRender: (value) => (value ? "true" : "false"),
  //   },
  // },
];

export const columns1 = () => [
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
    label: "Expiry type",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? value : "-"),
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
    name: "StrikeType",
    label: "Strike Type",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? value : "-"),
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
    name: "DeepStrike",
    label: "Deep Strike",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SSDate",
    label: "SS Date",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "SEDate",
    label: "SE Date",
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
    name: "Targettype",
    label: "Risk Handle",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "strategytype",
    label: "Measurment Type",
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
    name: "Exchange",
    label: "Exchange",
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



  {
    name: "Instrument Type",
    label: "Instrument Type",
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
    name: "MainSymbol",
    label: "Main Symbol",
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
];

export const columns2 = () => [
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
    name: "Expiry Date",
    label: "Expiry Date",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SEDate",
    label: "SE Date",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SSDate",
    label: "SS Date",
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
  {
    name: "MainSymbol",
    label: "Main Symbol",
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



  // {
  //   name: "Trend",
  //   label: "Trend",
  //   options: {
  //     filter: true,
  //     sort: true,
  //   },
  // },
];

export const columns3 = (selectStrategyType) => [
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
    name: "PnL",
    label: "PnL",

    options: {
      filter: true,
      sort: true,
      // customBodyRender: (value, tableMeta, updateValue) => {
      //     return parseFloat(value).toFixed(4);
      // },
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

  // {
  //   name: "StrategyTag",
  //   label: "StrategyTag",
  //   options: {
  //     filter: true,
  //     sort: true,
  //   },
  // },
  {
    name:
      selectStrategyType == "Option Strategy"
        ? "LotSize"
        : selectStrategyType == "Scalping"
          ? "Quantity"
          : "Quantity",
    label:
      selectStrategyType == "Option Strategy"
        ? "Lot"
        : selectStrategyType == "Scalping"
          ? "Quantity"
          : "Quantity",
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
    name: "Target",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SL",
    label: selectStrategyType == "Scalping" ? "Re-entry" : "Stoploss",
    options: {
      filter: true,
      sort: true,
    },
  },
  
];

export const columns4 = () => [
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
    name: "ETime",
    label: "Entry Time",

    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "PnL",

    label: "PnL",

    options: {
      // customBodyRender: (value, tableMeta, updateValue) => {
      //     return parseFloat(value).toFixed(4);
      // },
      filter: true,
      sort: true,
    },
  },
];

export const columns5 = (selectStrategyType) => [
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
    name: selectStrategyType == "Pattern" ? "ETime" : "ExitTime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: selectStrategyType == "Scalping" ? "EquityCurve" : "PnL",
    label: "Equity Curve",
    options: {
      // customBodyRender: (value, tableMeta, updateValue) => {
      //     return parseFloat(value).toFixed(4);
      // },
      filter: true,
      sort: true,
    },
  },
];

export const columns6 = () => [
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
    name: "ETime",
    label: "Entry Time",

    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Drawdown",

    label: "Drawdown",
    options: {
      filter: true,
      sort: true,
    },
  },
];

export const columns7 = () => [
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
    name: "Max Open Trade",
    label: "EMax Open Trade",

    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Max Profit",
    label: "Max Profit",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Max Drawdown",
    label: "Max Drawdown",
    options: {
      // customBodyRender: (value, tableMeta, updateValue) => {
      //     return parseFloat(value).toFixed(4);
      // },
      filter: true,
      sort: true,
    },
  },
  {
    name: "profit at Max Draw Down",
    label: "profit at Max Draw Down",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Current Price",
    label: "Current Price",
    options: {
      filter: true,
      sort: true,
    },
  },
];

export const columns8 = () => [
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
    name: "Current Runing loss",
    label: "Current Runing loss",

    options: {
      // customBodyRender: (value, tableMeta, updateValue) => {
      //     return parseFloat(value).toFixed(4);
      // },
      filter: true,
      sort: true,
    },
  },
  {
    name: "Current open Trade",

    label: "Current open Trade",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Max Price of Trade Execution",
    label: "Max Price of Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Min Price of Trade Execution",
    label: "Min Price of Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Max Involved fund",
    label: "Max Involved fund",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Last trade open price",
    label: "Last trade open price",
    options: {
      filter: true,
      sort: true,
    },
  },
];


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
    }
  },

  {
    name: "PnL",
    label: "PnL",
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
    name: "Token",
    label: "Token",
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
    name: "TradeType",
    label: "Trade Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  // {
  //   name: "Username",
  //   label: "Username",
  //   options: {
  //     filter: true,
  //     sort: true,
  //   },
  // },

  {
    name: "DayExittime",
    label: "Day Exit Time",
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
      // Display "Yes" or "No" instead of true/false
      customBodyRender: (value) => (value ? "Yes" : "No"),
    },
  },

  // {
  //   name: "Exchange",
  //   label: "Exchange",
  //   options: {
  //     filter: true,
  //     sort: true,
  //   },
  // },
];



export const goldenstrategy_tradehistory = () => [
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
  name:"Exchange" ,
  label: "Exchange",
  options: {
    filter: true,
    sort: true,
  },

 },
 {  name: "Trading",
    label: "Trading",
    options: {
      filter: true,
      sort: true,
    },
  },
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
    name: "SSDate",
    label: "SS Date",
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
      customBodyRender: (value) => (value ? value : "-"),
    },
  },
  {
    name: "TaskStatus",
    label: "Task Status",
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
      customBodyRender: (value) => (value ? value : "-"),
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
    name: "TradeCount",
    label: "No. of Cycle",
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
      customBodyRender: (value) => (value ? "Yes" : "No"),
    },
  },
  {
    name: "BufferPointCE",
    label: "Buffer Point CE",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "BufferPointPE",
    label: "Buffer Point PE",
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
    name: "GroupN",
    label: "Group Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Username",
    label: "Username",
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
    name: "SEDate",
    label: "SE Date",
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
    name: "Planname",
    label: "Plan Name",
    options: {
      filter: true,
      sort: true,
    },
  },
 

];



export const goldenstrategy_tradehistory_data = () => [
  {
    name: "S.No",
    label: "S.No",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return tableMeta.rowIndex + 1; // auto serial number
      },
    },
  },
  {
    name: "Exchange",
    label: "Exchange",
    options: { filter: true, sort: true },
  },
  {
    name: "ETime",
    label: "Entry Time",
    options: { filter: true, sort: true },
  },
  {
    name: "EPrice",
    label: "Entry Price",
    options: { filter: true, sort: true },
  },
  {
    name: "ExitTime",
    label: "Exit Time",
    options: { filter: true, sort: true },
  },
  {
    name: "ExitPrice",
    label: "Exit Price",
    options: { filter: true, sort: true },
  },
  {
    name: "MOTrade",
    label: "MO Trade",
    options: { filter: true, sort: true },
  },
  {
    name: "LotSize",
    label: "Lot Size",
    options: { filter: true, sort: true },
  },
  {
    name: "MOPnL",
    label: "MO PnL",
    options: { filter: true, sort: true },
  },
  {
    name: "MCPnL",
    label: "MC PnL",
    options: { filter: true, sort: true },
  },
  {
    name: "Trade",
    label: "Trade",
    options: { filter: true, sort: true },
  },
  {
    name: "Target",
    label: "Target",
    options: { filter: true, sort: true },
  },
  {
    name: "SL",
    label: "Stop Loss",
    options: { filter: true, sort: true },
  },
  {
    name: "Username",
    label: "Username",
    options: { filter: true, sort: true },
  },
  {
    name: "Strategy",
    label: "Strategy",
    options: { filter: true, sort: true },
  },
  {
    name: "Option Type",
    label: "Option Type",
    options: { filter: true, sort: true },
  },
  {
    name: "Strike price",
    label: "Strike Price",
    options: { filter: true, sort: true },
  },
  {
    name: "Token",
    label: "Token",
    options: { filter: true, sort: true },
  },
  {
    name: "Symbol",
    label: "Symbol",
    options: { filter: true, sort: true },
  },
  {
    name: "Spot Price",
    label: "Spot Price",
    options: { filter: true, sort: true },
  },
  {
    name: "Hashing",
    label: "Hashing",
    options: { filter: true, sort: true },
  },
  {
    name: "MainSymbol",
    label: "Main Symbol",
    options: { filter: true, sort: true },
  },
  {
    name: "TradeType",
    label: "Trade Type",
    options: { filter: true, sort: true },
  },
  {
    name: "GroupN",
    label: "Group",
    options: { filter: true, sort: true },
  },
  {
    name: "CallExitTargettype",
    label: "Call Exit Target",
    options: { filter: true, sort: true },
  },
  {
    name: "PutExitTargettype",
    label: "Put Exit Target",
    options: { filter: true, sort: true },
  },
  {
    name: "CallExitSltype",
    label: "Call Exit SL",
    options: { filter: true, sort: true },
  },
  {
    name: "PutExitSltype",
    label: "Put Exit SL",
    options: { filter: true, sort: true },
  },
  {
    name: "Intraday Exit",
    label: "Intraday Exit",
    options: { filter: true, sort: true },
  },
  {
    name: "TradeExecution",
    label: "Trade Execution",
    options: { filter: true, sort: true },
  },
  {
    name: "TRColl",
    label: "Collection",
    options: { filter: true, sort: true },
  },
  {
    name: "Quantity",
    label: "Quantity",
    options: { filter: true, sort: true },
  },
  {
    name: "Product Type",
    label: "Product Type",
    options: { filter: true, sort: true },
  },
  {
    name: "Trading",
    label: "Trading",
    options: { filter: true, sort: true },
  },
  {
    name: "DeleteSignal",
    label: "Delete Signal",
    options: { filter: true, sort: true },
  },
  {
    name: "statusofExit",
    label: "Exit Status",
    options: { filter: true, sort: true },
  },
  {
    name: "PnL",
    label: "PnL",
    options: { 
      filter: true, 
      sort: true,
      customBodyRender: (value) => {
        return (
          <span style={{ color: value >= 0 ? "green" : "red", fontWeight: "bold" }}>
            {value}
          </span>
        );
      }
    },
  },
];


export const ChartingPlatformColumn = (selectStrategyType) => [
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
    name: "PnL",
    label: "PnL",

    options: {
      filter: true,
      sort: true,
      // customBodyRender: (value, tableMeta, updateValue) => {
      //     return parseFloat(value).toFixed(4);
      // },
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
    name: "StrategyTag",
    label: "StrategyTag",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name:
      selectStrategyType == "Option Strategy"
        ? "LotSize"
        : selectStrategyType == "Scalping"
          ? "Quantity"
          : "Quantity",
    label:
      selectStrategyType == "Option Strategy"
        ? "Lot"
        : selectStrategyType == "Scalping"
          ? "Quantity"
          : "Quantity",
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
    name: "Target",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SL",
    label: selectStrategyType == "Scalping" ? "Re-entry" : "Stoploss",
    options: {
      filter: true,
      sort: true,
    },
  },
  
];
