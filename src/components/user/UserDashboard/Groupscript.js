import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullDataTable from "../../../ExtraComponent/CommanDataTable";
import { GetAllGroupService } from "../../CommonAPI/Admin";
import { GetUserScripts } from "../../CommonAPI/User";
import Loader from "../../../ExtraComponent/Loader";
import { getColumns, getColumns1, getColumns2, getColumns7 } from "./Columns";
import Swal from "sweetalert2";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import ViewGroup from "../Group/ViewGroup";

const GroupScript = ({ data, selectedType, GroupName, data2, getGroup }) => {
  const stgType = localStorage.getItem("groupTab");
  const userName = localStorage.getItem("name");

  const navigate = useNavigate();
  const [selectGroup, setSelectGroup] = useState("");
  const [allScripts, setAllScripts] = useState({ data: [], len: 0 });
  const [getAllService, setAllservice] = useState({
    loading: true,
    data: [],
    data1: [],
  });

  useEffect(() => {
    GetUserAllScripts();
  }, []);

  useEffect(() => {
    GetAllUserScriptDetails();
  }, [selectedType, GroupName, stgType]); // remove stgType from dependencies

  const GetUserAllScripts = async () => {
    const data = { Username: userName };
    await GetUserScripts(data)
      .then((response) => {
        if (response.Status) {
          setAllScripts({
            data: response?.data,
            len: response?.data?.length - 1,
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

  const GetAllUserScriptDetails = async () => {
    const stgType = localStorage.getItem("groupTab"); // moved inside to get fresh value
    const data = { Strategy: stgType, Group: GroupName };

    const response = await GetAllGroupService(data);

    if (!response?.Status) {
      setAllservice({
        loading: false,
        data: response?.Data || [],
        data1: [],
      });
      return;
    }

    if (stgType === "Scalping") {
      const filterMulticondtion = response?.Data?.filter(
        (item) => item?.ScalpType === "Multi_Conditional"
      );
      const filterOthers = response?.Data?.filter(
        (item) => item?.ScalpType !== "Multi_Conditional"
      );

      setAllservice({
        loading: false,
        data: filterOthers,
        data1: filterMulticondtion,
      });
    } else {
      setAllservice({
        loading: false,
        data: response?.Data || [],
        data1: [],
      });
    }
  };

  const handleAddScript1 = (data1, type) => {
    const selectedRowIndex = data1?.rowIndex;
    const selectedRow =
      type == 1
        ? getAllService?.data?.[selectedRowIndex]
        : getAllService?.data1?.[selectedRowIndex];

    if (data2?.status == false) {
      Swal.fire({
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
        type: "group",
        ...selectedRow,
      };
      navigate("/user/addscript/scalping", {
        state: { data: data, scriptType: allScripts },
      });
    }
  };
  const handleAddScript2 = (data1) => {
    if (data2.status == false) {
      Swal.fire({
        title: "Error",
        text: data2.msg,
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } else if (allScripts.data.length == 0) {
      Swal.fire({
        title: "Warning",
        text: "You don't have any valid plan to use this strategy",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      const selectedRowIndex = data1?.rowIndex;

      let selectedRow = getAllService?.data?.[selectedRowIndex];
      let OptionStgArr = allScripts?.data[allScripts?.len]?.CombineOption;

      if (
        (OptionStgArr?.includes("Straddle_Strangle") &&
          [
            "ShortStrangle",
            "LongStrangle",
            "LongStraddle",
            "ShortStraddle",
          ]?.includes(selectedRow?.STG)) ||
        (OptionStgArr?.includes("Butterfly_Condor") &&
          [
            "LongIronButterfly",
            "ShortIronButterfly",
            "LongIronCondor",
            "ShortIronCondor",
          ]?.includes(selectedRow?.STG)) ||
        (OptionStgArr?.includes("Spread") &&
          [
            "BearCallSpread",
            "BearPutSpread",
            "BullCallSpread",
            "BullPutSpread",
          ]?.includes(selectedRow?.STG)) ||
        (OptionStgArr?.includes("Ladder_Coverd") &&
          [
            "BullCallLadder",
            "BullPutLadder",
            "CoveredCall",
            "CoveredPut",
          ]?.includes(selectedRow?.STG)) ||
        (OptionStgArr?.includes("Collar_Ratio") &&
          [
            "LongCollar",
            "ShortCollar",
            "RatioCallSpread",
            "RatioPutSpread",
          ]?.includes(selectedRow?.STG)) ||
        (OptionStgArr?.includes("Shifting_FourLeg") &&
          [
            "LongFourLegStretegy",
            "ShortShifting",
            "LongShifting",
            "ShortFourLegStretegy",
          ]?.includes(selectedRow?.STG))
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
    if (data2.status == false) {
      Swal.fire({
        title: "Error",
        text: data2.msg,
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } else if (allScripts.data.length == 0) {
      Swal.fire({
        title: "Warning",
        text: "You don't have any valid plan to use this strategy",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      const selectedRowIndex = data1?.rowIndex;
      const selectedRow = getAllService?.data[selectedRowIndex];

      const isExist =
        allScripts?.data[allScripts?.len]?.CombinePattern?.find(
          (item) => item === selectedRow?.TradePattern
        ) ?? "";
      if (!isExist) {
        Swal.fire({
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
        type: "group",
        ...selectedRow,
      };
      navigate("/user/addscript/pattern", {
        state: { data: data, scriptType: allScripts },
      });
    }
  };

  return (
    <div className="container-fluid" style={{ marginTop: "2rem" }}>
      <ViewGroup
        group={getGroup}
        isCopyScriptVisible={true}
        handleAddScript1={handleAddScript1}
        handleAddScript2={handleAddScript2}
        handleAddScript3={handleAddScript3}
        GroupName={GroupName}
        data2={data2}
      />
    </div>
  );
};

export default GroupScript;
