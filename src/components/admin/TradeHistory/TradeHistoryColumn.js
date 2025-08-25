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
            }
        },
    },
     {
        name: "Targetselection",
        label: "Target Selection",
        options: {
            filter: true,
            sort: true,
        }
    },

    // {
    //     name: "ScalpType",
    //     label: "Target Selection",
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
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TType",
        label: "TType",
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
        label: "ExpiryDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeExecution",
        label: "TradeExecution",
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
        name: "EntryTime",
        label: "EntryTime",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "ExitTime",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "SSDate",
        label: "SSDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SEDate",
        label: "SEDate",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "TaskStatus",
        label: "TaskStatus",
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
        name: "TradeCount",
        label: "TradeCount",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TStype",
        label: "TStype",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PositionType",
        label: "Position Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Booking Point",
        label: "Booking Point",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Re-entry Point",
        label: "Re-entry Point",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trading",
        label: "Trading",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? "Active" : "Inactive",
        }
    },
    {
        name: "Profit",
        label: "Profit",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Loss",
        label: "Loss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "HoldExit",
        label: "Hold / Exit",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Instrument Symbol",
        label: "Instrument Symbol",
        options: {
            filter: true,
            sort: true,
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
        name: "EntryPrice",
        label: "Entry Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EntryRange",
        label: "Entry Range",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "GroupN",
        label: "Group Name",
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
            customBodyRender: (value) => value ? value : " - "
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
        name: "Expirytype",
        label: "Expiry Type",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? value : " - "
        }
    },
    {
        name: "Booking Point2",
        label: "Booking Point 2",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Booking Point3",
        label: "Booking Point 3",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity2",
        label: "Quantity 2",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity3",
        label: "Quantity 3",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "OrderType",
        label: "Order Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "RolloverTF",
        label: "RolloverTF",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? "true" : " false "
        }
    },
    {
        name: "RolloverDay",
        label: "RolloverDay",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? value : " - "
        }
    },
    {
        name: "RolloverTime",
        label: "RolloverTime",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? value : " - "
        }
    },
    {
        name: "TargetExit",
        label: "Target Exit",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? "true" : "false"
        }
    },
    {
        name: "RepeatationCount",
        label: "Repetition Count",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token1",
        label: "Token1",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "MatchPosition",
        label: "Match Position",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? "true" : "false"
        }
    },
    {
        name: "WorkingDay",
        label: "Working Day",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                if (Array.isArray(value)) {
                    return (
                        <div>
                            {value
                                .map((day, index) =>
                                    ((index + 1) % 3 === 0 ? day + "\n" : day)
                                )
                                .join(", ")
                                .split("\n")
                                .map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))
                            }
                        </div>
                    );
                }
                return value; // Agar value array nahi hai toh direct return
            }
        }
    },
    {
        name: "FinalTarget",
        label: "FinalTarget",
        options: {
            filter: true,
            sort: true,
        }
    },




];
// export const columns7 = () => [
//     {
//         name: "S.No",
//         label: "S.No",
//         options: {
//             filter: true,
//             sort: true,
//             customBodyRender: (value, tableMeta, updateValue) => {
//                 const rowIndex = tableMeta.rowIndex;
//                 return rowIndex + 1;
//             }
//         },
//     },
//     {
//         name: "ScalpType",
//         label: "ScalpType",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "Exchange",
//         label: "Exchange",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "Symbol",
//         label: "Symbol",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "Token",
//         label: "Token",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "TType",
//         label: "TType",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "Lot",
//         label: "Quantity",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },

//     {
//         name: "ExpiryDate",
//         label: "Expiry Date",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "TradeExecution",
//         label: "Trade Execution",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "ExitDay",
//         label: "Exit Day",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "EntryTime",
//         label: "EntryTime",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "ExitTime",
//         label: "ExitTime",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },

//     {
//         name: "SSDate",
//         label: "SSDate",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "SEDate",
//         label: "SEDate",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },

//     {
//         name: "TaskStatus",
//         label: "TaskStatus",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "TaskTime",
//         label: "TaskTime",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "TradeCount",
//         label: "TradeCount",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },

// ];


export const columns7 = () => [

    {
        name: "DayExittime",
        label: "Day Exit Time",
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
        name: "Exchange",
        label: "Exchange",
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
        name: "ManuallyExit",
        label: "Manually Exit",
        options: {
            filter: true,
            sort: true,
            // Display "Yes" or "No" instead of true/false
            customBodyRender: (value) => (value ? "Yes" : "No"),
        },
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
        name: "SL",
        label: "Stop Loss",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "Segment",
        label: "Segment",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "Stretegy",
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
        name: "Target",
        label: "Target",
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
        label: "Trade",
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
        name: "Username",
        label: "Username",
        options: {
            filter: true,
            sort: true,
        },
    },
]





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

            }
        },
    },
    {
        name: "STG",
        label: "Strategy Type",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Lot",
        label: "Quantity",
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
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "IName",
        label: "IName",
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
            customBodyRender: (value) => value ? value : " - "
        }
    },
    {
        name: "strategytype",
        label: "Measurment Type",
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
        label: "SL value",
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
        label: "LotSize",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Product Type",
        label: "Product Type",
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
        name: "DeepStrike",
        label: "Deep Strike",
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
        name: "SSDate",
        label: "SSDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SEDate",
        label: "SEDate",
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
        name: "LowerRange",
        label: "LowerRange",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "HigherRange",
        label: "HigherRange",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDepthLower",
        label: "CEDepth Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDepthHigher",
        label: "CEDepth Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthLower",
        label: "PEDepthLower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthHigher",
        label: "PEDepthHigher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDeepLower",
        label: "CEDeep Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDeepHigher",
        label: "CEDeepHigher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDeepHigher",
        label: "PEDeepHigher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDeepLower",
        label: "PEDeepLower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "FixedSM",
        label: "FixedSM",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? value : "-"
        }
    },

    {
        name: "TradeCount",
        label: "Trade Count",
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
        name: "Trading",
        label: "Trading",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? "Active" : "Inactive",
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
        name: "MainSymbol",
        label: "Main Symbol",
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
        name: "TaskStatus",
        label: "Task Status",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TaskTime",
        label: "Task Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "GroupN",
        label: "Group Name",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? value : "-"
        }
    },
    {
        name: "ExitRuleO",
        label: "Exit Rule",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "WorkingDay",
        label: "Working Day",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                if (Array.isArray(value)) {
                    return (
                        <div>
                            {value
                                .map((day, index) =>
                                    ((index + 1) % 3 === 0 ? day + "\n" : day)
                                )
                                .join(", ")
                                .split("\n")
                                .map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))
                            }
                        </div>
                    );
                }
                return value; // Agar value array nahi hai toh direct return
            }
        }
    },
    {
        name: "Profit",
        label: "Profit",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Loss",
        label: "Loss",
        options: {
            filter: true,
            sort: true,
        }
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

            }
        },
    },
    {
        name: "TradePattern",
        label: "TradePattern",
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
        name: "Symbol",
        label: "Symbol",
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
        label: "TType",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TStype",
        label: "TStype",
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
        name: "Expiry Date",
        label: "Expiry Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeExecution",
        label: "TradeExecution",
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
        name: "EntryTime",
        label: "EntryTime",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "ExitTime",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Pattern",
        label: "Pattern",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TimeFrame",
        label: "TimeFrame",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SEDate",
        label: "SEDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SSDate",
        label: "SSDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trend",
        label: "Trend",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeCount",
        label: "TradeCount",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trading",
        label: "Trading",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? "Active" : "Inactive",
        }
    },
    {
        name: "Instrument Name",
        label: "Instrument Name",
        options: {
            filter: true,
            sort: true,
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
        name: "Expirytype",
        label: "Expiry Type",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? value : " - "
        }
    },
    {
        name: "TaskTime",
        label: "Task Time",
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

// export const columns3 = (selectStrategyType) => [
//     {
//         name: "S.No",
//         label: "S.No",
//         options: {
//             filter: true,
//             sort: true,
//             customBodyRender: (value, tableMeta, updateValue) => {
//                 const rowIndex = tableMeta.rowIndex;
//                 return rowIndex + 1;
//             }
//         },
//     },
//     {
//         // name: "ETime",
//         name: "EntryTime",
//         label: "Entry Time",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         // name: "EPrice",
//         name: "EntryPrice",
//         label: "Entry Price",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "ExitTime",
//         label: "Exit Time",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     // {
//     //     name: "ExitPrice",
//     //     label: "Exit Price",
//     //     options: {
//     //         filter: true,
//     //         sort: true,
//     //     }
//     // },
//     {
//         // name: "TradeType",
//         name: "TType",
//         label: "Transaction Type",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: selectStrategyType == "Option Strategy" ? "LotSize" : selectStrategyType == "Scalping" ? "Quantity" : "Quantity",
//         label: selectStrategyType == "Option Strategy" ? "Lot" : selectStrategyType == "Scalping" ? "Quantity" : "Quantity",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     // {
//     //     name: "Trade",
//     //     label: "Trade",
//     //     options: {
//     //         filter: true,
//     //         sort: true,
//     //     }
//     // },
//     // {
//     //     name: "Target",
//     //     label: "Target",
//     //     options: {
//     //         filter: true,
//     //         sort: true,
//     //     }
//     // },
//     // {
//     //     name: "SL",
//     //     label: "SL",
//     //     options: {
//     //         filter: true,
//     //         sort: true,
//     //     }
//     // },
//     // {
//     //     name: "PnL",
//     //     label: "PnL",

//     //     options: {
//     //         // customBodyRender: (value, tableMeta, updateValue) => { 
//     //         //     return parseFloat(value).toFixed(4);
//     //         // },
//     //         filter: true,
//     //         sort: true,
//     //     }
//     // },

//     // {
//     //     name: "BookingPoint",
//     //     label: "Booking Point",
//     //     options: {
//     //         filter: true,
//     //         sort: true,
//     //     }
//     // },
//     // {
//     //     name: "BookingPoint2",
//     //     label: "Booking Point2",
//     //     options: {
//     //         filter: true,
//     //         sort: true,
//     //     }
//     // },
//     // {
//     //     name: "BookingPoint3",
//     //     label: "Booking Point3",
//     //     options: {
//     //         filter: true,
//     //         sort: true,
//     //     }
//     // },
//     {
//         name: "EntryRange",
//         label: "Entry Range",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "ExitDay",
//         label: "Exit Day",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "ExpiryDate",
//         label: "Expiry Date",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "GroupN",
//         label: "Group Name",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     // {
//     //     name: "HigherRange",
//     //     label: "Higher Range",
//     //     options: {
//     //         filter: true,
//     //         sort: true,
//     //     }
//     // },
//     // {
//     //     name: "IncrementType",
//     //     label: "Increment Type",
//     //     options: {
//     //         filter: true,
//     //         sort: true,
//     //     }
//     // },
//     {
//         name: "Incrementvalue",
//         label: "Increment Value",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     // {
//     //     name: "InstrumentSymbol",
//     //     label: "Instrument Symbol",
//     //     options: {
//     //         filter: true,
//     //         sort: true,
//     //     }
//     // },
//     // {
//     //     name: "InstrumentType",
//     //     label: "Instrument Type",
//     //     options: {
//     //         filter: true,
//     //         sort: true,
//     //     }
//     // },
//     {
//         name: "Lot",
//         label: "Lot",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "LowerRange",
//         label: "Lower Range",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "MainSymbol",
//         label: "Main Symbol",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "OrderType",
//         label: "Order Type",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "PositionType",
//         label: "Position Type",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "Quantity",
//         label: "Quantity",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     // {
//     //     name: "ReentryPoint",
//     //     label: "Re-entry Point",
//     //     options: {
//     //         filter: true,
//     //         sort: true,
//     //     }
//     // },
//     {
//         name: "SEDate",
//         label: "SE Date",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "SSDate",
//         label: "SS Date",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "ScalpType",
//         label: "Scalp Type",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "StepUp",
//         label: "Step Up",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "Symbol",
//         label: "Symbol",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "TStype",
//         label: "TS Type",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "TType",
//         label: "T Type",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "Targetselection",
//         label: "Target Selection",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "TaskStatus",
//         label: "Task Status",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "TaskTime",
//         label: "Task Time",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "Token",
//         label: "Token",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "TradeCount",
//         label: "Trade Count",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "TradeExecution",
//         label: "Trade Execution",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     // {
//     //     name: "Trading",
//     //     label: "Trading",
//     //     options: {
//     //         filter: true,
//     //         sort: true,
//     //     }
//     // },
//     {
//         name: "Username",
//         label: "Username",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },

// ];


// export const columns3 = (selectStrategyType) => [
//     {
//         name: "S.No",
//         label: "S.No",
//         options: {
//             filter: true,
//             sort: true,
//             customBodyRender: (value, tableMeta, updateValue) => {
//                 const rowIndex = tableMeta.rowIndex;

//                 return rowIndex + 1;
//             },
//         },
//     },
//     {
//         name: "ETime",
//         label: "Entry Time",
//         options: {
//             filter: true,
//             sort: true,
//         },
//     },
//     {
//         name: "EPrice",
//         label: "Entry Price",
//         options: {
//             filter: true,
//             sort: true,
//         },
//     },
//     {
//         name: "ExitTime",
//         label: "Exit Time",
//         options: {
//             filter: true,
//             sort: true,
//         },
//     },
//     {
//         name: "ExitPrice",
//         label: "Exit Price",
//         options: {
//             filter: true,
//             sort: true,
//         },
//     },
//     {
//         name: "TradeType",
//         label: "Trade Type",
//         options: {
//             filter: true,
//             sort: true,
//         },
//     },

//      {
//         name: "StrategyTag",
//         label: "StrategyTag",
//         options: {
//             filter: true,
//             sort: true,
//         },
//     },
//     {
//         name:
//             selectStrategyType == "Option Strategy"
//                 ? "LotSize"
//                 : selectStrategyType == "Scalping"
//                     ? "Quantity"
//                     : "Quantity",
//         label:
//             selectStrategyType == "Option Strategy"
//                 ? "Lot"
//                 : selectStrategyType == "Scalping"
//                     ? "Quantity"
//                     : "Quantity",
//         options: {
//             filter: true,
//             sort: true,
//         },
//     },
//     {
//         name: "Trade",
//         label: "Trade",
//         options: {
//             filter: true,
//             sort: true,
//         },
//     },
//     {
//         name: "Target",
//         label: "Target",
//         options: {
//             filter: true,
//             sort: true,
//         },
//     },
//     {
//         name: "SL",
//         label: selectStrategyType == "Scalping" ? "Re-entry" : "Stoploss",
//         options: {
//             filter: true,
//             sort: true,
//         },
//     },
//     {
//         name: "PnL",
//         label: "PnL",

//         options: {
//             filter: true,
//             sort: true,
//             // customBodyRender: (value, tableMeta, updateValue) => {
//             //     return parseFloat(value).toFixed(4);
//             // },
//         },
//     },
// ];


export const columns3 = (selectStrategyType) => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta) => {
                return tableMeta.rowIndex + 1;
            },
        },
    },
    { name: "Symbol", label: "Symbol", options: { filter: true, sort: true } },
    { name: "ETime", label: "Entry Time", options: { filter: true, sort: true } },
    { name: "EPrice", label: "Entry Price", options: { filter: true, sort: true } },
    { name: "ExitTime", label: "Exit Time", options: { filter: true, sort: true } },
    { name: "ExitPrice", label: "Exit Price", options: { filter: true, sort: true } },
    { name: "PnL", label: "PnL", options: { filter: true, sort: true } },

    { name: "TradeType", label: "Trade Type", options: { filter: true, sort: true } },
    { name: "StrategyTag", label: "Strategy Tag", options: { filter: true, sort: true } },
    {
        name:
            selectStrategyType === "Option Strategy"
                ? "LotSize"
                : "Quantity",
        label:
            selectStrategyType === "Option Strategy"
                ? "Lot"
                : "Quantity",
        options: { filter: true, sort: true },
    },
    { name: "Trade", label: "Trade", options: { filter: true, sort: true } },
    { name: "Target", label: "Target", options: { filter: true, sort: true } },
    {
        name: "SL",
        label: selectStrategyType === "Scalping" ? "Re-entry" : "Stoploss",
        options: { filter: true, sort: true },
    },
    { name: "Exchange", label: "Exchange", options: { filter: true, sort: true } },
    { name: "Username", label: "Username", options: { filter: true, sort: true } },
    { name: "Stretegy", label: "Strategy", options: { filter: true, sort: true } }, // consider renaming to Strategy
    { name: "Segment", label: "Segment", options: { filter: true, sort: true } },
    { name: "Token", label: "Token", options: { filter: true, sort: true } },
    { name: "DayExittime", label: "Day Exit Time", options: { filter: true, sort: true } },
    {
        name: "ManuallyExit",
        label: "Manual Exit",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? "Yes" : "No"),
        },
    },
    { name: "Planname", label: "Plan", options: { filter: true, sort: true } },
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
            }
        },
    },
    {
        name: "ETime",
        label: "Entry Time",

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
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
        }
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
            }
        },
    },
    {
        name: selectStrategyType == "Pattern" ? "ETime" : "ExitTime",
        label: "Exit Time",

        options: {
            filter: true,
            sort: true,
        }
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
        }
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
            }
        },
    },
    {
        name: "ETime",
        label: "Entry Time",

        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Drawdown",

        label: "Drawdown",
        options: {
            filter: true,
            sort: true,
        }
    },


];