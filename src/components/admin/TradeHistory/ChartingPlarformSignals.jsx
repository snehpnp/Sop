import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
 
 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getStrategyTagApi } from "../../CommonAPI/User";
import Content from "../../../ExtraComponent/Content";
import Loader from "../../../ExtraComponent/Loader";
import FullDataTable from "../../../ExtraComponent/CommanDataTable(original)";
import { getColumns8 } from "../../user/UserDashboard/Columns";
import ChartingCard from "../../user/UserDashboard/ChartingCard";
import NoDataFound from "../../../ExtraComponent/NoDataFound";

const ChartingPlatformSignal = ({
    data,
    loading,
    chartingSubTab,
    setChartingSubTab,
    strategy,
    setStrategy,
    strategyTagOptions,
    selectedSignal,
    setSelectedSignal,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    view,
    setView
}) => {
    return (
        <Content
            Page_title={"🖥️ Panel Track"}
            button_status={false}
            backbutton_status={false}>
            <div className="iq-card-body">
                <div className="d-flex justify-content-between align-items-center">
                    {/* No back button here, as navigation is handled by parent */}
                    <div className="d-flex" style={{ gap: "10px", flex: 1, justifyContent: "flex-end" }}>
                        {data?.length > 0 && (
                            <>
                                <button
                                    className={`nav-link rounded-pill ${view === "table" ? "active" : ""}`}
                                    onClick={() => setView("table")}
                                    style={{
                                        padding: "7px 20px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        backgroundColor: view === "table" ? "#007bff" : "#fff",
                                        color: view === "table" ? "#fff" : "#333",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    Table View
                                </button>
                                <button
                                    className={`nav-link rounded-pill ${view === "card" ? "active" : ""}`}
                                    onClick={() => setView("card")}
                                    style={{
                                        padding: "7px 20px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        backgroundColor: view === "card" ? "#007bff" : "#fff",
                                        color: view === "card" ? "#fff" : "#333",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    Card View
                                </button>
                            </>
                        )}
                    </div>
                </div>
                {/* Segment Tabs */}
                <div className="d-flex chartingsignal-capsule-btns" style={{ gap: "10px", flex: 2, justifyContent: "center", minWidth: 300 }}>
                    {["Cash", "Future", "Option"].map((tab) => (
                        <button
                            key={tab}
                            className={`nav-link rounded-pill ${chartingSubTab === tab ? "active" : ""}`}
                            onClick={() => setChartingSubTab(tab)}
                            style={{
                                padding: "10px 30px",
                                fontSize: "14px",
                                fontWeight: "600",
                                backgroundColor: chartingSubTab === tab ? "#007bff" : "#fff",
                                color: chartingSubTab === tab ? "#fff" : "#333",
                                border: "1px solid #ddd",
                                minWidth: "90px"
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {/* Table/Card View */}
                <div className="iq-card-body" style={{ padding: "3px" }}>
                    <div className="table-responsive">
                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                {view === "table" ? (
                                    data?.length > 0 ? (
                                        <FullDataTable
                                            columns={getColumns8(() => { }, chartingSubTab, () => {})}
                                            data={data}
                                            checkBox={false}
                                            FixedRowPerPage={10}
                                        />
                                    ) : (
                                        <NoDataFound />
                                    )
                                ) : (
                                    <div className="card-view-container">
                                        {data?.length > 0 ? (
                                            <ChartingCard data={data} />
                                        ) : (
                                            <NoDataFound />
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Content>
    );
};

export default ChartingPlatformSignal;