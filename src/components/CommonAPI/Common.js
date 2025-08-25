import axios from "axios"
import * as Config from "../../Utils/Config";

export const LoginPage=async(data)=>{
    try{
        const res =  await axios.post(`${Config.base_url}login`, data)
        return res?.data
    }
    catch(err){
        return err
    }

}

export const ForgotPassword=async(data)=>{
    try{
        const res =  await axios.post(`${Config.base_url}Resetpass`, data)
        return res?.data
    }
    catch(err){
        return err
    }
}


export const PasswordChange=async(data)=>{
    const token = localStorage.getItem('token')

    try{
        const res =  await axios.post(`${Config.base_url}forgetpass`, data , 
            {
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${token}`
            }})
        return res?.data
    }
    catch(err){
        return err
    }

}

export const RegistorUser=async(data)=>{
    try{
        const res =  await axios.post(`${Config.base_url}Signup`, data)
        return res?.data
    }
    catch(err){
        return err
    }

}


export const GetInstrument = async(data)=>{
    try{
        const res =  await axios.post(`${Config.base_url}GetInstrument`, data)
        return res?.data
    }
    catch(err){
        return err
    }

}


export const getOptionSymbol = async(Exchange)=>{
    try{
        if(!Exchange) {
            return
        }
        const res =  await axios.get(`${Config.base_url}OptionSymbol/${Exchange}`)
        return res?.data
    }
    catch(err){
        return err
    }

}

export const getThemeForAdminAndClient = async (data) => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${Config.base_url}GetTheme`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return res?.data
    } catch (error) {
        return error
    }

}

 

 
 