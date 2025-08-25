import React, { useEffect, useState } from "react";
import { subAdminDashboard } from "../../CommonAPI/SubAdmin";

const Dashboard = () => {
  const [data, setData] = useState({ loading: true, data: [] });
  const [error, setError] = useState(null);
  const userName= localStorage.getItem("name");

  const fetchSubAdminDashboard = async () => {
    try {
      const req = {userName:userName};
      const response = await subAdminDashboard(req);
      
      if (response?.Status) {
        setData({ loading: false, data: response.Data });
      } else {
        setData({ loading: false, data: [] });
      }
    } catch (err) {
      setError("Error in fetching the Dashboard Details");
      setData({ loading: false, data: [] });
    }
  };



  useEffect(() => {
    fetchSubAdminDashboard();
  }, []);

   


  if (data.loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="container-fluid" style={{marginTop:"2rem"}}>
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              {data.data.map((item, index) => (

               
                
                <>
                <div className="col-lg-4" >
                  <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                      <div className="iq-header-title">
                        <h4 className="card-title"> Live Account</h4>
                      </div>
                    </div>
                    <div className="iq-card-body">
                      <div className="progress mt-3">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          aria-valuenow={item.progress || 40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: `${item.progress || 40}%` }}
                        />
                      </div>
                      <div className="table-responsive mt-4 new-font-color">
                        <table className="table mb-0 table-borderless">
                          <tbody>
                            <tr>
                              <td>
                                <div className="iq-profile-avatar status-online mt-4"></div>
                              </td>
                              <td>
                                <h4>Total:</h4>
                              </td>
                              <td>
                                <span className="text-white" >{item.Total_Live_Account}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="iq-profile-avatar status-online mt-4"></div>
                              </td>
                              <td>
                                <h4>Active:</h4>
                              </td>
                              <td>
                                <span className="text-white">{item.Active_Live_Account}</span>
                              </td>
                            </tr>
                            
                            <tr>
                              <td>
                                <div className="iq-profile-avatar status-online mt-4"></div>
                              </td>
                              <td>
                                <h4>Expired:</h4>
                              </td>
                              <td>
                                <span className="text-white">{item.Expired_Live_Account}</span>
                              </td>
                            </tr>                               
                          </tbody>
                        </table>
                      </div>
                    </div>

                    
                  </div>
                </div>
                 <div className="col-lg-4" >
                 <div className="iq-card">
                   <div className="iq-card-header d-flex justify-content-between">
                     <div className="iq-header-title">
                       <h4 className="card-title"> Demo Account</h4>
                     </div>
                   </div>
                   <div className="iq-card-body">
                     <div className="progress mt-3">
                       <div
                         className="progress-bar bg-primary"
                         role="progressbar"
                         aria-valuenow={item.progress || 40}
                         aria-valuemin={0}
                         aria-valuemax={100}
                         style={{ width: `${item.progress || 40}%` }}
                       />
                     </div>
                     <div className="table-responsive mt-4">
                       <table className="table mb-0 table-borderless">
                         <tbody>
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Total:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Total_Free_Demo_Account}</span>
                             </td>
                           </tr>
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Active:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Active_Free_Demo_Account}</span>
                             </td>
                           </tr>
                           
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Expired:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Expired_Free_Demo_Account}</span>
                             </td>
                           </tr>                               
                         </tbody>
                       </table>
                     </div>
                   </div>

                   
                 </div>
               </div>

               <div className="col-lg-4" >
                 <div className="iq-card">
                   <div className="iq-card-header d-flex justify-content-between">
                     <div className="iq-header-title">
                       <h4 className="card-title"> Three Days Live Account</h4>
                     </div>
                   </div>
                   <div className="iq-card-body">
                     <div className="progress mt-3">
                       <div
                         className="progress-bar bg-primary"
                         role="progressbar"
                         aria-valuenow={item.progress || 40}
                         aria-valuemin={0}
                         aria-valuemax={100}
                         style={{ width: `${item.progress || 40}%` }}
                       />
                     </div>
                     <div className="table-responsive mt-4">
                       <table className="table mb-0 table-borderless">
                         <tbody>
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Total:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Total_Two_Days_Live_Account}</span>
                             </td>
                           </tr>
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Active:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Active_Two_Days_Live_Account}</span>
                             </td>
                           </tr>
                           
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Expired:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Expired_Two_Days_Live_Account}</span>
                             </td>
                           </tr>                               
                         </tbody>
                       </table>
                     </div>
                   </div>

                   
                 </div>
               </div>
               <div className="col-lg-4" >
                 <div className="iq-card">
                   <div className="iq-card-header d-flex justify-content-between">
                     <div className="iq-header-title">
                       <h4 className="card-title"> Service Count 1</h4>
                     </div>
                   </div>
                   <div className="iq-card-body">
                     <div className="progress mt-3">
                       <div
                         className="progress-bar bg-primary"
                         role="progressbar"
                         aria-valuenow={item.progress || 40}
                         aria-valuemin={0}
                         aria-valuemax={100}
                         style={{ width: `${item.progress || 40}%` }}
                       />
                     </div>
                     <div className="table-responsive mt-4">
                       <table className="table mb-0 table-borderless">
                         <tbody>
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Total:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Total_Service_Count_1}</span>
                             </td>
                           </tr>
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Active:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Active_Service_Count_1}</span>
                             </td>
                           </tr>
                           
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Expired:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Expired_Service_Count_1}</span>
                             </td>
                           </tr>                               
                         </tbody>
                       </table>
                     </div>
                   </div>

                   
                 </div>
               </div>
               <div className="col-lg-4" >
                 <div className="iq-card">
                   <div className="iq-card-header d-flex justify-content-between">
                     <div className="iq-header-title">
                       <h4 className="card-title"> Service Count 2</h4>
                     </div>
                   </div>
                   <div className="iq-card-body">
                     <div className="progress mt-3">
                       <div
                         className="progress-bar bg-primary"
                         role="progressbar"
                         aria-valuenow={item.progress || 40}
                         aria-valuemin={0}
                         aria-valuemax={100}
                         style={{ width: `${item.progress || 40}%` }}
                       />
                     </div>
                     <div className="table-responsive mt-4">
                       <table className="table mb-0 table-borderless">
                         <tbody>
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Total:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Total_Service_Count_2}</span>
                             </td>
                           </tr>
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Active:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Active_Service_Count_2}</span>
                             </td>
                           </tr>
                           
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Expired:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Expired_Service_Count_2}</span>
                             </td>
                           </tr>                               
                         </tbody>
                       </table>
                     </div>
                   </div>

                   
                 </div>
               </div>
               <div className="col-lg-4" >
                 <div className="iq-card">
                   <div className="iq-card-header d-flex justify-content-between">
                     <div className="iq-header-title">
                       <h4 className="card-title"> Service Count 5</h4>
                     </div>
                   </div>
                   <div className="iq-card-body">
                     <div className="progress mt-3">
                       <div
                         className="progress-bar bg-primary"
                         role="progressbar"
                         aria-valuenow={item.progress || 40}
                         aria-valuemin={0}
                         aria-valuemax={100}
                         style={{ width: `${item.progress || 40}%` }}
                       />
                     </div>
                     <div className="table-responsive mt-4">
                       <table className="table mb-0 table-borderless">
                         <tbody>
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Total:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Total_Service_Count_5}</span>
                             </td>
                           </tr>
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Active:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Active_Service_Count_5}</span>
                             </td>
                           </tr>
                           
                           <tr>
                             <td>
                               <div className="iq-profile-avatar status-online mt-4"></div>
                             </td>
                             <td>
                               <h4>Expired:</h4>
                             </td>
                             <td>
                               <span className="text-white">{item.Expired_Service_Count_5}</span>
                             </td>
                           </tr>                               
                         </tbody>
                       </table>
                     </div>
                   </div>

                   
                 </div>
               </div>
               </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
