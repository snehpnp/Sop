import Checkbox from '@mui/material/Checkbox';

// Client Activity Column
export const ClientActivityPage = () => [
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
        name: "Username",
        label: "Username",
        options: {
            filter: true,
            sort: true,
        }
    },

    // {
    //     name: "ServiceCount",
    //     label: "Service Count",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    // {
    //     name: "Broker",
    //     label: "Broker",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "Planname",
        label: "Plan Name",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                if (value?.length == 0)
                    return "-";
                else
                    return value;
            },
        }
    },
    {
        name: "Credit Use",
        label: "Credit Use",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "ServiceStartDate",
        label: "SS Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    // {
    //     name: "ServiceEndDate",
    //     label: "SE Date",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    
    // {
    //     name: "LicanseStartDate",
    //     label: "LS Date",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "RemainingAmount",
        label: "Remaining Ammount",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TotalCreditUse",
        label: "Total Credit Use",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SubAdmin",
        label: "SubAdmin",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? value : "-"
        }
    },
    // {
    //     name: "Scalping",
    //     label: "Scalping",
    //     options: {
    //         filter: true,
    //         sort: true,
    //         customBodyRender: (value) => {
    //             return value && value.toString().trim() !== "" ? value : "NA";
    //         },
    //     }
    // },
    // {
    //     name: "Option Strategy",
    //     label: "Option Strategy",
    //     options: {
    //         filter: true,
    //         sort: true,
    //         customBodyRender: (value) => {
    //             if (Array.isArray(value)) {
    //                 return (
    //                     <div style={{
    //                         display: "grid",
    //                         gridTemplateColumns: "repeat(3, 1fr)",
    //                         gap: "0px" // Extra gap hata diya
    //                     }}>
    //                         {value.map((item, index) => (
    //                             <span key={index} style={{ whiteSpace: "nowrap" }}>
    //                                 {item.trim()}
    //                                 {index !== value.length - 1 ? ", " : ""}
    //                             </span>
    //                         ))}
    //                     </div>
    //                 );
    //             }
    //             return value && value.toString().trim() !== "" ? value : "NA";
    //         },
    //     }
    // },


    // {
    //     name: "Pattern",
    //     label: "Pattern",
    //     options: {
    //         filter: true,
    //         sort: true,
    //         customBodyRender: (value) => {
    //             return value && value.toString().trim() !== "" ? value : "NA";
    //         },
    //     }
    // },
    // {
    //     name: "ChartingSignal",
    //     label: "Charting Signal",
    //     options: {
    //         filter: true,
    //         sort: true,
    //         customBodyRender: (value) => {
    //             return value && value.toString().trim() !== "" ? value : "NA";
    //         },
    //     }
    // },


     {
        name: "Extendtype",
        label: "Extend Type",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
                return value && value.toString().trim() !== "" ? value : "NA";
            },
        }
    },



];

//Client Report Column
export const ClientReportColumn = () => [
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
        name: "Thread",
        label: "Thread",
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
        name: "ThreadName",
        label: "Thread Name",
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
        name: "Threading Status",
        label: "Threading Status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const isChecked = Boolean(value);
                return (
                    <Checkbox
                        checked={isChecked}
                    />
                );
            }
        }
    },

    {
        name: "Time",
        label: "Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ProjectName",
        label: "Project Name",
        options: {
            filter: true,
            sort: true,
        }
    },



]

// USER LOG
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
        name: "ExpiryDate",
        label: "Expiry Date",
        options: {
            filter: true,
            sort: true,
        }
    },


    {
        name: "HoldExit",
        label: "Hold Exit",
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
        name: "GroupN",
        label: "Unique Name",
        options: {
            filter: true,
            sort: true,
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
        name: "ExitDay",
        label: "ExitDay",
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
        name: "TaskTime",
        label: "TaskTime",
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
        name: "TradeCount",
        label: "No. of Cycle",
        options: {
            filter: true,
            sort: true,
        }
    },


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
            }
        },
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
        name: "Targettype",
        label: "Risk Handle",
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
        name: "Symbol",
        label: "Symbol",
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
        name: "TradePattern",
        label: "Trade Pattern",
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
        name: "TaskStatus",
        label: "Task Status",
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
        }
    },

];


// USER LOG
export const columns3 = () => [
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
        name: "GroupN",
        label: "Unique Name",
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



];

//User Report Column
export const ReportColumns3 = () => [
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
        label: "Transaction Type",
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
        name: "Lot",
        label: "Lot",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "TStype",
        label: "Meausrement Type",
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
        name: "Exchange",
        label: "Exchange",
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
        name: "FinalTarget",
        label: "Final Target",
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
        name: "StepUp",
        label: "StepUp",
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
        name: "MatchPosition",
        label: "Match Position",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? "true" : "false"),
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
        name: "PositionType",
        label: "Position Type",
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
        name: "Token",
        label: "Token",
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

export const ReportColumns4 = () => [
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
        name: "Expirydate",
        label: "Expiry Date",
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
        name: "Token",
        label: "Token",
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

export const ReportColumns5 = () => [
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
        name: "Pattern",
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
        name: "TimeFrame",
        label: "Time Frame",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "TType",
        label: "TransactionType",
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
    {
        name: "Token",
        label: "Token",
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

    // {
    //   name: "Trend",
    //   label: "Trend",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
];



