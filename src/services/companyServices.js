import { get, patch, post } from "../untils/request"

export const getCompanyList = async () => {
    const response = await get(`company`);
    return response;
}

export const getCompany = async (id) => {
    const response = await get(`company/${id}`);
    return response;
}

export const loginCompany = async (email, password) => {
    const response = await get(`company?email=${email}&password=${password}`);
    return response;
}

export const registerAccount = async (object) => {
    const response = await post(`company`, object);
    return response;
}

export const checkExist = async (email) => {
    const response = await get(`company?email=${email}`);
    return response;
}

export const editCompany = async (idCompany, data) => {
    const response = await patch(`company/${idCompany}`, data);
    return response;
}