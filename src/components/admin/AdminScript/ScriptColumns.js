import { Trash2 } from 'lucide-react';

export const columns = (handleDelete) => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const rowIndex = tableMeta.rowIndex;
                return rowIndex + 1;
            }
        },
    },
    {
        name: "Action",
        label: "Action",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <Trash2 onClick={() => handleDelete(tableMeta)} />
            }
        }
    },
    {
        name: "Targetselection",
        label: "Target Selection",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Exchange",
        label: "Exchange",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TType",
        label: "Transaction Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TStype",
        label: "Measurement Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Booking Point",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Re-entry Point",
        label: "Re-entry",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity",
        label: "Lot",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "ExpiryDate",
        label: "Expiry Date",
        options: {
            filter: true,
            sort: true,
        }
    },


    {
        name: "EntryPrice",
        label: "First Trade Lower Range",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EntryRange",
        label: "First Trade Higher Range",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "EntryTime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "Exit  Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitDay",
        label: "Exit Day",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Instrument Type",
        label: "Instrument Type",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? value : "-"

        }
    },
    {
        name: "GroupN",
        label: "Unique Name",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "TradeExecution",
        label: "Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "closescript",
        label: "close Script",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? "Active" : "Inactive")
        }
    },
    {
        name: "Username",
        label: "Username",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "FixedSM",
        label: "Position Type",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "MainSymbol",
        label: "Main Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "StepUp",
        label: "Step Up",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "IncrementType",
        label: "Increment Type",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : "NA")
        }
    },
    {
        name: "Incrementvalue",
        label: "Increment Value",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Booking Point2",
        label: "Target 2",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Booking Point3",
        label: "Target 3",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity2",
        label: "Lot 2",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity3",
        label: "Lot 3",
        options: {
            filter: true,
            sort: true,
        }
    },




];
export const columns2 = (handleDelete) => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const rowIndex = tableMeta.rowIndex;
                return rowIndex + 1;
            }
        },
    },
    {
        name: "Action",
        label: "Action",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <Trash2 onClick={() => handleDelete(tableMeta)} />
            }
        }
    },
    {
        name: "TradePattern",
        label: "Pattern Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Pattern",
        label: "Pattern Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TType",
        label: "Transaction Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TimeFrame",
        label: "Time Frame",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Exchange",
        label: "Exchange",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Expiry Date",
        label: "Expiry Date",
        options: {
            filter: true,
            sort: true,
        }
    },


    {
        name: "Quantity",
        label: "Lot",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TStype",
        label: "Measurement Type",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Target value",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL value",
        label: "Stoploss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeExecution",
        label: "Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "EntryTime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitDay",
        label: "Exit Day",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Instrument Type",
        label: "Instrument Type",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "MainSymbol",
        label: "Main Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },



];

export const columns1 = (handleDelete) => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const rowIndex = tableMeta.rowIndex;
                return rowIndex + 1;
            }
        },
    },

    {
        name: "Action",
        label: "Action",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <Trash2 onClick={() => handleDelete(tableMeta)} />
            }
        }
    },

    {
        name: "STG",
        label: "Strategy",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },




    {
        name: "Targettype",
        label: "Risk Handle",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Exchange",
        label: "Exchange",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Instrument Type",
        label: "Instrument Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Expirydate",
        label: "Expiry Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Expirytype",
        label: "Expiry Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "strategytype",
        label: "Measurement Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target value",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL value",
        // label: "Re-entry",
        label: "Stoploss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeExecution",
        label: "Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Lot Size",
        label: "Lot",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Entry Time",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Exit Time",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Product Type",
        label: "Exit Day",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "StrikeType",
        label: "Strike Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DepthofStrike",
        label: "Depth Of Strike",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TaskTime",
        label: "TaskTime",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "MainSymbol",
        label: "Main Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "LowerRange",
        label: "Lower Range",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "HigherRange",
        label: "Higher Range",
        options: {
            filter: true,
            sort: true,
        }
    },


    {
        name: "Spread",
        label: "Spread",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DeepStrike",
        label: "Deep Strike",
        options: {
            filter: true,
            sort: true,
        }
    },


    {
        name: "CEDepthLower",
        label: "CE Main Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDepthHigher",
        label: "CE Main Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDeepLower",
        label: "CE Hedge Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDeepHigher",
        label: "CE Hedge Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthLower",
        label: "PE Main Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthHigher",
        label: "PE Main Higher",
        options: {
            filter: true,
            sort: true,
        }
    },


    {
        name: "PEDeepLower",
        label: "PE Hedge Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDeepHigher",
        label: "PE Hedge Higher",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "ExitRuleO",
        label: "Exit Type",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : "NA")
        }
    },



];