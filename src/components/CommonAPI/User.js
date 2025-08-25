import axios from "axios"
import * as Config from "../../Utils/Config";

export const Get_Last_Pattern_Data = async (data) => {
    var token = localStorage.getItem('token')

    try {
        const res = await axios.post(`${Config.base_url}CCLPattern`, data,
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

export const Get_Profile_Data = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}Profile/${data.username}`,
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

export const getNetPnLData = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}NetPnL`, data,
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

export const get_Trade_Response = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Traderesponse`, data,
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

export const ChartingPlatformsegment = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}ChartingPlatformsegment`, data,
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

export const GetAllUserScript = async (data) => {
    try {

        var token = localStorage.getItem('token')

        const res = await axios.get(`${Config.base_url}Dashboard/${data.userName}`,
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

export const GetAllUserGroup = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}clientalotgroupname`, data,
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
    var name = localStorage.getItem('name')


    try {
        const res = await axios.get(`${Config.base_url}MainStrategy/${name}`,
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

export const AddScript = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Addscript`, data,
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

export const AddOptionScript = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}OptionAddscript`, data,
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

export const get_Trade_Report = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Tradereport`, data,
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

export const Get_Panle_Logs = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}PanelTrackAll`, data,
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

export const DeleteUserScript = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Squareoff`, data,
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

export const Continue = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Continue`, data,
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

export const Discontinue = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Discontinue`, data,
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

export const MatchPosition = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}MatchPosition`, data,
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


export const OpenPosition = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}DashboardOpen/${data.userName}`,
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

export const GetBrokerData = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}Brokername/${data.userName}`,
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

export const UpdateBrokerData = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Broker`, data,
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

export const TradingStatus = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}TradingStatus/${data.userName}`,
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

export const ConnectBroker = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}ConnectBroker`, data,
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


export const Get_Pattern_Name2 = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}Pattern/${data.selectPattern}`,
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
export const AvailableScript = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}Script/AvailableScript`,
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

export const GetSymbolIp = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}SymbolP`, data,
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

export const ChartPatternAPI = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}ChartPattern`, data,
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

export const Candlestick_Pattern = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}CandlestickPattern`, data,
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

export const LastPatternCandleData = async (data) => {
    var token = localStorage.getItem('token')
    try {

        const res = await axios.get(`${Config.base_url}DailyData/${data.CartName}`,
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

export const SortPattern = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}CCLPattern`, data,
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

export const get_Trade_Data = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}ScalpingData`, data,
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

export const UpdateUserScript = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Updatescript`, data,
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

export const CheckPnL = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}MaxPnlStrike`, data,
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

export const CheckPnLScalping = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}CheckPnL`, data,
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

export const GetName = async (data) => {
    var token = localStorage.getItem('token')
    try {

        const res = await axios.get(`${Config.base_url}ClientTaskStatus/${data.userName}`,
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

export const GetSingleChart = async (data) => {
    var token = localStorage.getItem('token')
    try {

        const res = await axios.post(`${Config.base_url}PatternDetail`, data,
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

export const GetAllTransection = async (data) => {
    var token = localStorage.getItem('token')
    try {

        const res = await axios.get(`${Config.base_url}ClienttransactionDetails/${data.Name}`,
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

export const AddBalance = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Clienttransaction`, data,
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

export const GetUserBalence = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}checkbalance/${data.userName}`,
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

export const Get_All_Plans = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}AllPlanDetails`,
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

export const Get_All_Buyed_Plans = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}Allotplan/${data.userName}`,
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



export const Purchasedplan = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Purchasedplan`, data,
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
 


export const BuyPlan = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}BuyPlan`, data,
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

export const GetUserScripts = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}AllotStretegy/${data.Username}`,
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
 

export const chartAllotStrategyApi = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}ChartAllotStretegy/${data.Username}`,
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



export const addChartingScript = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}ChartingPlatformStatus`, data,
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

export const getChargingPlatformDataApi = async (username) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}ChartingPlatformData/${username}`,
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


export const getUserChartingScripts = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}ChartingPlatformData1`, data,
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

export const getChartingReport = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Tradereport`, data,
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


export const DeleteSingleChartingScript = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}ChartingPlatformDelete`, data,
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


export const ScalpingPositionDetails = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}ScalpingPositionDetails`, data,
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

// https://soptools.tradestreet.in/backend/Option_Detail

export const Option_Detail = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Option_Detail`, data,
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



export const ClientGroupAllot = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}ClientGroupAllot`, data,
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

export const EditPlan = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}EditPlan`, data,
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


export const getSessionId = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}AdminBroker`,
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

// ExpirePlanDetails / shubh


export const ExpirePlanDetails = async (username) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}ExpirePlanDetails/${username}`,
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





export const CPrice = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}CPrice`, data,
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


export const getToken = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Token`, data,
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


export const GetStrikeToken = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}GetStrikeToken`, data,
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



export const overallReportApi = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}PnlData`, data,
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



export const getStrategyTagApi = async (Username) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}ClientStrategyTag/${Username}`,
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


export const applyCouponCode = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}CouponCode`, data,
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



export const reGenerateKeyApi = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}RegenrateKey`, data,
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


export const getOptionType = async (optionType) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}${optionType}`,
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



export const getPattenNameByMarketWise = async (Marketwise) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}${Marketwise}`,
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


export const unSubscribeGroup = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}ClientGroupUnsubscribe`, data,
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


export const ClientStrategyTagDetails = async (username) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}ClientStrategyTagDetails/${username}`,
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


export const ChartingPlatformSegment = async () => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}ChartingPlatformSegment`,
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



export const getChargingPlatformDataApiForSegments = async (username) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}ChartAllotStretegy/${username}`,
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


export const getgoldenStrategy = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Data`,data,
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