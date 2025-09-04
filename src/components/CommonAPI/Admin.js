import axios from "axios";
import * as Config from "../../Utils/Config";

export const CreateAccount = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}addclient`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const getAdminPermission = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}AdminPermission`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetAdminDashboard = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}admindashboard`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetAdminDashboardClient = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `${Config.base_url}admindashboardclient`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetAdminDashboardTrade = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `${Config.base_url}admindashboardtrade`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const Add_Group = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `${Config.base_url}adminstrategiesgroup`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetGroupNames = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}admingrouptable`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetClientService = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}Profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const AddBrokerCredential = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}Broker`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const AdminAddBrokerCredential = async (data) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.post(`${Config.base_url}AdmBroker`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetAllGroupService = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}groupstrategies`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const Get_Symbol = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}GetSym`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const Get_StrikePrice = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}GetStrike`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const setSmtpDetail = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}upload_images`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GET_EXPIRY_DATE = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}GetExpiry`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const AddAdminScript = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}AdminAddscript`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const Get_Pattern_Time_Frame = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}Timeframe`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const Get_Pattern_Name = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}Pattern/CandleStick`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const Get_Pattern_Charting = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}Pattern/Charting`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const Get_All_Service = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}Servicereport`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const get_User_Data = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}Data`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const get_Trade_History = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}Tradehistory`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const get_PnL_Data = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}Barchart`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const get_EQuityCurveData = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}Equitycurve`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const get_DrapDownData = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}Drawdown`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const get_FiveMostProfitTrade = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}fiveprofit`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const get_FiveMostLossTrade = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}fiveloss`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetClientLogs = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}Clientactivity`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const Get_Client_Report = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}Threadreport`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const clientThreadeReport1 = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}CAllThreadreport`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const Get_Broker_Name = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}Brokernamelist`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const DeleteScript = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `${Config.base_url}Admin_Delete_Script`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const Get_SMTP_Details = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}SMTPDetail`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const ExtendEndDate = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}ExtendEndDate`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const EditClientPanle = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}ClientPanel`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const ServiceCount = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}ServiceCountEx`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetExchange = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}Exchange`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetAllTaskStatus = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}TaskStatus`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const Get_All_Client_Logs = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `${Config.base_url}UserallScriptDetail`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const ExpriyEndDate = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      `${Config.base_url}AddExpiry/${data.Username}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const Get_Broker_Details = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}AdmBroker`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const AdmindashboardGraph = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}admindashboardData23`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const AdmindashboardData = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}admindashboardData`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const DataStart = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}Datastart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const AutoLogin = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}AutoLogin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const LastPattern = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}Last_Pattern`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetLogo = async (data) => {
  var token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}logo`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetHeaderImg1 = async (data) => {
  var token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}icon`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetHeaderImg2 = async (data) => {
  var token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}frontimage`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const Getfaviconimage = async (data) => {
  var token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}favicon`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetPanleName = async (data) => {
  var token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}Companyname`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const UploadImage = async (data) => {
  var token = localStorage.getItem("token");

  try {
    const formData = new FormData();
    formData.append("icon", data.icon);
    formData.append("frontimage", data.frontimage);
    formData.append("logo", data.logo);
    formData.append("company_name", data.company_name);
    formData.append("faviconimage", data.favicon);

    const res = await axios.post(
      `${Config.base_url}uploadimagefile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data;
  } catch (err) {
    console.error("Error uploading image", err);
    return err;
  }
};

export const GetAllStratgy = async (data) => {
  var token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}Stretegy`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const AddPlan = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}AddPlan`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const AddOnPlan = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}AddOn`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const AllReuests = async (data) => {
  var token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}transctionrequestProcess`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const getAddOnPlans = async (data) => {
  var token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}GetAddondata`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const ApprovwRequest = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}transctionrequest`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

// add subadmin

export const AddSubadminbyAdmin = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}CreateSubAdmin`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data;
  } catch (err) {
    return err;
  }
};

// Update / edit subadmin
export const EditSubadminbyAdmin = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `${Config.base_url}SubadminPermissionUpdate`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data;
  } catch (err) {
    return err;
  }
};

// get subadmin details
export const GetAllSubadmin = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}Subadmindetails`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const viewBrokerDetails = async (data) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(
      `${Config.base_url}BrokerApiCreateGet/${data.BrokerName}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const getStrategyType = async () => {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  try {
    const res = await axios.get(`${Config.base_url}MainStrategy/${name}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const SubAdminPermission = async (data) => {
  try {
    if (!data?.username) {
      return;
    }

    const res = await axios.get(
      `${Config.base_url}SubAdminPermission/${data.username}`
    );
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const AdminPermission = async (data) => {
  try {
    const res = await axios.get(
      `${Config.base_url}Permissiondata/${data.username}`
    );
    return res?.data;
  } catch (err) {
    return err;
  }
};

// EditPlanname

export const EditPlanname = async (data) => {
  try {
    const res = await axios.get(`${Config.base_url}EditPlanname`);
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetAccountsApi = async (data) => {
  try {
    const res = await axios.get(`${Config.base_url}GETMasterAccount`);
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const MasterAccountApi = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}MasterAccount`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const UpdateMasterAccount = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `${Config.base_url}UpdateMasterAccount`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const TradeExecutionAPI = async (data) => {
  const token = localStorage.getItem("token");
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${Config.base_url}ChartingPlatform`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    let response = await axios.request(config);
    return response?.data;
  } catch (err) {
    return err;
  }
};

export const getAdminCouponDetails = async (data) => {
  try {
    const res = await axios.get(`${Config.base_url}CouponCodeDetails`);
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const AddCouponCodeApi = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}AddCouponCode`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const addChartingStrategyTag = async (data) => {
  const token = localStorage.getItem("token");

  try {
    const formData = new FormData();
    // formData me data append karo
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const res = await axios.post(
      `${Config.base_url}ChartingStretegyTag`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Content-Type mat do, axios khud dega for FormData
        },
      }
    );

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const getChartingStrategyTag = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}StrategyTagdata`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GetMasterAccountTableData = async () => {
  try {
    const res = await axios.get(`${Config.base_url}GETMasterAccountLogs`);
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const GETBrokerGroupRecord = async (username) => {
  try {
    const res = await axios.get(
      `${Config.base_url}GETBrokerGroupRecord/${username}`
    );

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const getBrokerDetails = async (data) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(
      `${Config.base_url}AdminBrokerAPIInfo/${data.BrokerName}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const AdminProfile = async (data) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`${Config.base_url}AdminProfile`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const checkbalanceAdmin = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}checkbalanceAdmin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const editChartingStretegyTag = async (data) => {
  const token = localStorage.getItem("token");

  try {
    const formData = new FormData();
    // formData me data append karo
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const res = await axios.post(
      `${Config.base_url}EditChartingStretegyTag`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Content-Type mat do, axios khud dega for FormData
        },
      }
    );

    return res?.data;
  } catch (err) {
    return err;
  }
};

export const deleteGroup = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}deletegroup`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const DataStartget = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}DataStartget`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const AutoLoginget = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}AutoLoginget`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const getKeyForAdmin = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}findKey/Admin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const OptionSST_API = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${Config.base_url}OptionSST`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};

export const AdminBrokerName = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}AdminBrokerName`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};


export const GetIndexData = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Config.base_url}SingleIndexToken`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    return err;
  }
};
