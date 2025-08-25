import axios from "axios";
import * as Config from "../../Utils/Config";

export const subAdminDashboard = async (data) => {

  try {
    const res = await axios.get(`${Config.base_url}Subadmindashboard/${data.userName}`);
    return res?.data;  
  } catch (err) {
    console.error("API Error: ", err);
    throw err;  
  }
};

export const createClient = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}addclient`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return res?.data
    }
    catch (err) {
        return err
    }
}

export const GetAllSubadminClient = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}SubadminClientdetails/${data.userName}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return res?.data
    }
    catch (err) {
        return err
    }
}

export const subadminGroups = async (data) => {
  const token = localStorage.getItem('token')
  try {
      const res = await axios.get(`${Config.base_url}SubAdminGrropselct/${data.subadmin}`,
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          }
      )
      return res?.data

  }
  catch (err) {
      return err
  }
}

export const subadminClientName = async () => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}SubAdminname`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return res?.data
    }
    catch (err) {
        return err
    }
}