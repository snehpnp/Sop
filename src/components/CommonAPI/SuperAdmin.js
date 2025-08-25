import axios from "axios"
import * as Config from "../../Utils/Config";

export const superAdminDashboard = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.superAdmin_base_url}Superadmindashboard`, data,
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

export const adminDetails = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.superAdmin_base_url}AdminDetails`, data,
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

export const createAdmin = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}CreateAdmin`, data,
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

export const getCompanyName = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.superAdmin_base_url}Companynames`, data,
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

export const companyDetails = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.superAdmin_base_url}AmmountDetails/${data.comapnyName}`, data,
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

export const adminActivity = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}AddAmount`, data,
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

export const clientThreadeReport = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.superAdmin_base_url}ClientThreadReport/${data.comapnyName}`, data,
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

export const getClientName = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.superAdmin_base_url}Clientname/${data.comapnyName}`, data,
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


export const getStrategyType = async () => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}MainStrategy`,
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
export const addBroker = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}AddBroker`, data,
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

export const allClientdetails = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.superAdmin_base_url}ClientDetails/${data.comapnyName}`, data,
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


export const updateClientDetails = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}ClientUpdateDetails`, data,
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

export const deleteClient = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}ClientDeleteDetails`, data,
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

export const getClientScript = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}ClientStretegy`, data,
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

export const ClientTradeResponse = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}ClientTraderesponse`, data,
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

export const addFund = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}AddAmount`, data,
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


export const closePanel = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}ClosePanel`, data,
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

export const updateAdmin = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}UpdateAdmin`, data,
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


export const apiCreateInfo = async (formData) => {
    const token = localStorage.getItem('token')


    // Brokername: str = Form(...),
    // Companyname: str = Form(...),
    // step1: str = Form(None),
    // step1image: UploadFile = File(None),
    // step2: str = Form(None),
    // step2image: UploadFile = File(None),
    // step3: str = Form(None),
    // step3image: UploadFile = File(None),
    // step4: str = Form(None),
    // step4image: UploadFile = File(None),
    // step5: str = Form(None),
    // step5image: UploadFile = File(None)
    try {
        // const formData = new FormData();
        // formData.append('Brokername', data.Brokername);
        // formData.append('step1', data.step1);
        // formData.append('step1image', data.step1image);
        // formData.append('step2', data.step2);
        // formData.append('step2image', data.step2image);
        // formData.append('step3', data.step3);
        // formData.append('step3image', data.step3image);
        // formData.append('step4', data.step4);
        // formData.append('step4image', data.step4image);
        // formData.append('step5', data.step5);
        // formData.append('step5image', data.step5image);


        const res = await axios.post(`${Config.superAdmin_base_url}BrokerApiCreate`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

export const pm2Reload = async (data) => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${Config.superAdmin_base_url}Livedatafeed/${data.Companyname}`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    } catch (err) {
        return err
    }
}


export const allClientListDetails = async (data) => {
    const token = localStorage.getItem('token');
    try {


        const res = await axios.get(`${Config.superAdmin_base_url}ClientDetails/${data}`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    } catch (error) {
        return error
    }
}


//create api for Superadmin to admin Broker permission

export const superToAdminBrokerPermission = async (data) => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}BrokerPermission`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    } catch (error) {
        return error
    }
}


//create api for Superadmin to admin permission

export const superToAdminPermission = async (data) => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}PermissionUpdate`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    } catch (error) {
        return error
    }
}



//create api for New update for data in superadmin  (for New update page)

export const superToAdminAddNewPermission = async (data) => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}NewUpdate`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    } catch (error) {
        return error
    }
}


//create api for get updated data (For create-admin page)

export const superToAdminGetNewPermission = async (data) => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${Config.superAdmin_base_url}NewUpdateData`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    } catch (error) {
        return error
    }
}

//Delete sub admin details
export const deleteSubAdminButton = async (data) => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}SubadminDeleteDetails`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    } catch (error) {
        return error
    }
}


//subadmin list api
export const seeAllSubAdminList = async (data) => {
    const token = localStorage.getItem('token');
    try {
        // const res = await axios.get(`${Config.superAdmin_base_url}SubadminDetails/${Companyname}`, data,
        const res = await axios.get(`${Config.superAdmin_base_url}SubadminDetails/${data}`, data,

            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data

    } catch (error) {
        return error
    }
}


//delete subadmin
export const deleteSubAdminData = async (data) => {



    const token = localStorage.getItem('token');
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}SubadminDeleteDetails`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    } catch (error) {
        return error
    }
}




export const superAdminClientThreadeReport1 = async (companyName) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}CAllThreadreport/${companyName}`,
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


export const superadminCoupon = async (data) => {



    const token = localStorage.getItem('token');
    try {
        const res = await axios.post(`${Config.superAdmin_base_url}Adminoffer`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    } catch (error) {
        return error
    }
}

// Admin offer page api
export const GETAdminOffer = async () => {
    try {
        const res = await axios.get(`${Config.superAdmin_base_url}GETAdminoffer`)
        return res?.data

    } catch (error) {

    }
}


//superadmin broker 

export const GETSuperAdminBroker = async () => {
    try {
        const res = await axios.get(`${Config.superAdmin_base_url}brokers`)
        return res?.data

    } catch (error) {

    }
}

export const GetAllThemes = async () => {
    try {
        const res = await axios.get(`${Config.superAdmin_base_url}theme`)
        return res?.data

    } catch (error) {
        return error
    }
}


