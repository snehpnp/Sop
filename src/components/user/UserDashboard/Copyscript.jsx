import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullDataTable from "../../../ExtraComponent/CommanDataTable";
import {
  GetAllUserScript,
  DeleteUserScript,
  GetUserScripts,
} from "../../CommonAPI/User";
import Loader from "../../../ExtraComponent/Loader";
import { getColumns, getColumns1, getColumns2, getColumns7 } from "./Columns";
import Swal from "sweetalert2";

const Coptyscript = ({ data, selectedType, data2 }) => {

  const userName = localStorage.getItem("name");
  const adminPermission = localStorage.getItem("adminPermission");
  const navigate = useNavigate();
  const [selectGroup, setSelectGroup] = useState("");
  const [allScripts, setAllScripts] = useState({ data: [], len: 0 });
  const [getAllService, setAllservice] = useState({
    loading: true,
    ScalpingData: [],
    OptionData: [],
    PatternData: [],
    PatternOption: [],
    Marketwise: [],
    PremiumRotation: [],
    NewScalping: [],
  });

  useEffect(() => {
    GetUserAllScripts();
  }, []);
    useEffect(() => {
    GetAllUserScriptDetails();
  }, [selectedType]);

  const GetUserAllScripts = async () => {
    const data = { Username: userName };
    await GetUserScripts(data)
      .then((response) => {
        if (response.Status) {
          setAllScripts({
            data: response.data,
            len: response.data.length - 1,
          });
        } else {
          setAllScripts({
            data: [],
            len: 0,
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the User Scripts", err);
      });
  };

  const handleAddScript1 = (data1, type) => {
    GetUserAllScripts();
    const selectedRowIndex = data1.rowIndex;

    const selectedRow =
      type == 1
        ? getAllService.ScalpingData[selectedRowIndex]
        : getAllService.NewScalping[selectedRowIndex];

    if (data2.status == false) {
      Swal.fire({
        // background: "#1a1e23 ",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Error",
        text: data2.msg,
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } else if (
      allScripts?.data?.[allScripts?.len]?.CombineScalping?.length == 0
    ) {
      Swal.fire({
        // background: "#1a1e23 ",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Warning",
        text: "You don't have any valid plan to use this strategy",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      const isExist =
        allScripts?.data?.[allScripts?.len]?.CombineScalping?.find(
          (item) => item === selectedRow?.ScalpType
        ) ?? "";
      if (!isExist) {
        Swal.fire({
          // background: "#1a1e23 ",
          backdrop: "#121010ba",
          confirmButtonColor: "#1ccc8a",
          title: "Warning",
          text: "This script is not available for you",
          icon: "warning",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }
      const data = {
        selectGroup: selectGroup,
        selectStrategyType: "Scalping",
        type: "copy",
        ...selectedRow,
      };
      navigate("/user/addscript/scalping", {
        state: { data: data, scriptType: allScripts },
      });
    }
  };

  const handleAddScript2 = (data1) => {
    GetUserAllScripts();
    if (data2.status == false) {
      Swal.fire({
        // background: "#1a1e23 ",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Error",
        text: data2.msg,
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } else if (
      allScripts?.data?.[allScripts?.len]?.CombineOption?.length == 0
    ) {
      Swal.fire({
        // background: "#1a1e23 ",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Warning",
        text: "You don't have any valid plan to use this strategy",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      const selectedRowIndex = data1.rowIndex;
      const selectedRow = getAllService.OptionData[selectedRowIndex];
      let OptionStgArr = allScripts?.data?.[allScripts?.len]?.CombineOption;

      if (
        (OptionStgArr?.includes("Straddle_Strangle") &&
          [
            "ShortStrangle",
            "LongStrangle",
            "LongStraddle",
            "ShortStraddle",
          ].includes(selectedRow.STG)) ||
        (OptionStgArr?.includes("Butterfly_Condor") &&
          [
            "LongIronButterfly",
            "ShortIronButterfly",
            "LongIronCondor",
            "ShortIronCondor",
          ].includes(selectedRow.STG)) ||
        (OptionStgArr?.includes("Spread") &&
          [
            "BearCallSpread",
            "BearPutSpread",
            "BullCallSpread",
            "BullPutSpread",
          ].includes(selectedRow.STG)) ||
        (OptionStgArr?.includes("Ladder_Coverd") &&
          [
            "BullCallLadder",
            "BullPutLadder",
            "CoveredCall",
            "CoveredPut",
          ].includes(selectedRow.STG)) ||
        (OptionStgArr?.includes("Collar_Ratio") &&
          [
            "LongCollar",
            "ShortCollar",
            "RatioCallSpread",
            "RatioPutSpread",
          ].includes(selectedRow.STG)) ||
        (OptionStgArr?.includes("Shifting_FourLeg") &&
          [
            "LongFourLegStretegy",
            "ShortShifting",
            "LongShifting",
            "ShortFourLegStretegy",
          ].includes(selectedRow.STG))
      ) {
        const data = {
          selectGroup: selectGroup,
          selectStrategyType: "Option Strategy",
          type: "copy",
          ...selectedRow,
        };
        navigate("/user/addscript/option", {
          state: { data: data, scriptType: allScripts },
        });
      } else {
        Swal.fire({
          // background: "#1a1e23 ",
          backdrop: "#121010ba",
          confirmButtonColor: "#1ccc8a",
          title: "Warning",
          text: "This script is not available for you",
          icon: "warning",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }
    }
  };

  const handleAddScript3 = (data1) => {
    GetUserAllScripts();
    if (data2.status == false) {
      Swal.fire({
        // background: "#1a1e23 ",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Error",
        text: data2.msg,
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } else if (
      allScripts?.data?.[allScripts?.len]?.CombinePattern?.length == 0
    ) {
      Swal.fire({
        // background: "#1a1e23 ",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Warning",
        text: "You don't have any valid plan to use this strategy",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      const selectedRowIndex = data1.rowIndex;
      const selectedRow = getAllService.PatternData[selectedRowIndex];
      const isExist =
        allScripts?.data?.[allScripts?.len]?.CombinePattern?.find(
          (item) => item === selectedRow.TradePattern
        ) ?? "";
      if (!isExist) {
        Swal.fire({
          // background: "#1a1e23 ",
          backdrop: "#121010ba",
          confirmButtonColor: "#1ccc8a",
          title: "Warning",
          text: "This script is not available for you",
          icon: "warning",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }
      const data = {
        selectGroup: selectGroup,
        selectStrategyType: "Pattern",
        type: "copy",
        ...selectedRow,
      };
      navigate("/user/addscript/pattern", {
        state: { data: data, scriptType: allScripts },
      });
    }
  };

  const GetAllUserScriptDetails = async () => {
    const data = { userName: userName };
    await GetAllUserScript(data)
      .then((response) => {
        if (response.Status) {
          setAllservice({
            loading: false,
            ScalpingData: response.Scalping,
            OptionData: response.Option,
            PatternData: response.Pattern,
            PatternOption: response.PatternOption,
            Marketwise: response.Marketwise,
            PremiumRotation: response.PremiumRotation,
            NewScalping: response.NewScalping,
          });
        } else {
          setAllservice({
            loading: false,
            ScalpingData: [],
            OptionData: [],
            PatternData: [],
            PatternOption: [],
            Marketwise: [],
            PremiumRotation: [],
            NewScalping: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding group service", err);
      });
  };



  return (
    <div className="container-fluid" style={{ marginTop: "-2rem" }}>
      <div className="row">
        <div className="col-sm-12">
          {/* <div className="iq-card"> */}
          {/* <div className="iq-card-body " style={{ padding: "3px" }}> */}

          <div
            className="tab-pane fade show active"
            id="home-justify"
            role="tabpanel"
            aria-labelledby="home-tab-justify">
            {data && (
              <>
                <div className="iq-card-body " style={{ padding: "3px" }}>
                  <div className="table-responsive">
                    <div>
                      <div className="iq-header-title mt-4"></div>

                      {getAllService.loading ? (
                        <Loader />
                      ) : (
                        data !== "Scalping" && (
                          <div>
                            {/* <h4 className="card-title">{data}</h4> */}
                            <FullDataTable
                              columns={
                                // data === "Scalping"
                                //   ? getColumns(handleAddScript1)
                                data === "Option Strategy"
                                  ? getColumns1(handleAddScript2)
                                  : data === "Pattern"
                                    ? getColumns2(handleAddScript3)
                                    : getColumns(handleAddScript1)
                              }
                              data={
                                // data === "Scalping"
                                //   ? getAllService.ScalpingData
                                data === "Option Strategy"
                                  ? getAllService.OptionData
                                  : data === "Pattern"
                                    ? getAllService.PatternData
                                    : []
                              }
                              checkBox={false}
                            />
                          </div>
                        )
                      )}
                    </div>
                    {data === "Scalping" &&
                      adminPermission?.includes("Charting Platform") && (
                        <div>
                          <div className="iq-header-title mt-4">
                            {/* <h4 className="card-title">
                        
                              Scalping
                            </h4> */}
                          </div>
                          {getAllService.loading ? (
                            <Loader />
                          ) : (
                            <FullDataTable
                              columns={getColumns7(handleAddScript1)}
                              data={getAllService.NewScalping}
                              checkBox={false}
                            />
                          )}
                        </div>
                      )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Coptyscript;
