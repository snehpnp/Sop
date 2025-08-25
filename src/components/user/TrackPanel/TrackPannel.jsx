import React, { useEffect, useState } from "react";
import FullDataTable from "../../../ExtraComponent/CommanDataTable";
import { Get_Panle_Logs, GetName } from "../../CommonAPI/User";
import DatePicker from "react-datepicker";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import Content from "../../../ExtraComponent/Content";

const Pannel = () => {
  const userName = localStorage.getItem("name");
  const Activity = sessionStorage.getItem("Activity");
  const [getPanleData, setPanleData] = useState({
    loading: true,
    data: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [fromDate, setFromData] = useState("");
  const [ToDate, setToData] = useState("");
  const [getActivity, setActivity] = useState(Activity || "");
  const [getMsg, setMsg] = useState("");
  const [getSortName, setSortName] = useState([]);

  // set Defult Date
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate());
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;

  // Select From Date
  const DefultToDate = new Date();
  DefultToDate.setDate(DefultToDate.getDate() + 1);
  const year1 = DefultToDate.getFullYear();
  const month1 = String(DefultToDate.getMonth() + 1).padStart(2, "0");
  const day1 = String(DefultToDate.getDate()).padStart(2, "0");
  const Defult_To_Date = `${year1}.${month1}.${day1}`;

  useEffect(() => {
    GetSortTypeName();
  }, []);

  useEffect(() => {
    GetAllPanleData();
  }, [ToDate, fromDate, getActivity]);

  const convertDateFormat = (date) => {
    if (date == "") {
      return "";
    } else {
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      return `${year}.${month}.${day}`;
    }
  };

  const GetSortTypeName = async () => {
    const data = { userName: userName };
    await GetName(data).then((response) => {
      if (response.Status) {
        setSortName(response.Taskstatus);
      } else {
        setSortName([]);
      }
    });
  };

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
    // {
    //   name: "Username",
    //   label: "Username",

    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: "Activity",
      label: "Activity",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "message",
      label: "Message",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Time",
      label: "Time",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "InitiatedBy",
      label: "InitiatedBy",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const GetAllPanleData = async () => {
    const data = {
      User: userName,
      From_date: fromDate == "" ? formattedDate : convertDateFormat(fromDate),
      To_date: ToDate == "" ? Defult_To_Date : convertDateFormat(ToDate),
    };

    await Get_Panle_Logs(data)
      .then((response) => {
        if (response.Status) {
          const filterData = response.PanelDetails.filter((item) => {
            const matchedData =
              getActivity == "" ||
              item.Activity.toLowerCase() == getActivity.toLowerCase();

            return matchedData;
          });

          setPanleData({
            loading: false,
            data: getActivity != "" ? filterData : response.PanelDetails,
          });
        } else {
          setPanleData({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the panle details", err);
      });
  };

  return (
    <>
      <Content
        Page_title={"🖥️ Panel Track"}
        button_status={false}
        backbutton_status={false}>
        <div className="iq-card-body">
          <div>
            <div className="row">
              <div className="form-group col-lg-4">
                <label>Select From Date</label>
                <DatePicker
                  className="form-select"
                  selected={fromDate == "" ? formattedDate : fromDate}
                  onChange={(date) => setFromData(date)}
                />
              </div>
              <div className="form-group col-lg-4">
                <label>Select To Date</label>
                <DatePicker
                  className="form-select"
                  selected={ToDate == "" ? Defult_To_Date : ToDate}
                  onChange={(date) => setToData(date)}
                />
              </div>
              <div className="form-group col-lg-4">
                <label htmlFor="email">Activity</label>
                <select
                  className="form-select"
                  required
                  onChange={(e) => {
                    setActivity(e.target.value);
                    sessionStorage.setItem("Activity", e.target.value);
                  }}
                  value={getActivity}
                >
                  {getSortName.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>
          <div className="table-responsive">
            {getPanleData.data && getPanleData.data.length > 0 ? (
              <FullDataTable
                columns={columns}
                data={getPanleData.data}
                checkBox={false}
              />
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>

        {showModal && (
          <div
            className="modal custom-modal d-flex"
            id="add_vendor"
            role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-md custom-width-modal">
              <div className="modal-content">
                <div className="modal-header border-0 pb-0">
                  <div className="form-header modal-header-title text-start mb-0">
                    <h4 className="mb-0">Message</h4>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowModal(!showModal)}></button>
                </div>
                <form action="#">
                  <div className="modal-body">
                    <div className="row">
                      {getActivity === 2 ? (
                        <span>{getMsg && getMsg.APIPassword}</span>
                      ) : (
                        <p>{getMsg}</p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="iq-card-body">
              <div>
                <div className="row">
                  <div className="form-group col-lg-3 ">
                    <label>Select From Date</label>
                    <DatePicker
                      className="form-select"
                      selected={fromDate == "" ? formattedDate : fromDate}
                      onChange={(date) => setFromData(date)}
                    />
                  </div>
                  <div className="form-group col-lg-3">
                    <label>Select To Date</label>
                    <DatePicker
                      className="form-select"
                      selected={ToDate == "" ? Defult_To_Date : ToDate}
                      onChange={(date) => setToData(date)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="email">Activity</label>
                    <select
                      className="form-select my-2"
                      required=""
                      onChange={(e) => setActivity(e.target.value)}
                      value={getActivity}>
                      <option value="">All Activity</option>
                      {getSortName.map((item, index) => {
                        return <option value={item}>{item}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                {getPanleData.data && getPanleData.data.length > 0 ? (
                  <FullDataTable
                    columns={columns}
                    data={getPanleData.data}
                    checkBox={false}
                  />
                ) : (
                  <NoDataFound />
                )}
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div
            className="modal custom-modal d-flex"
            id="add_vendor"
            role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-md custom-width-modal">
              <div className="modal-content">
                <div className="modal-header border-0 pb-0">
                  <div className="form-header modal-header-title text-start mb-0">
                    <h4 className="mb-0">Message</h4>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowModal(!showModal)}></button>
                </div>
                <form action="#">
                  <div className="modal-body">
                    <div className="row">
                      {getActivity === 2 ? (
                        <span>{getMsg && getMsg.APIPassword}</span>
                      ) : (
                        <p>{getMsg}</p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Content>
    </>
  );
};
export default Pannel;
