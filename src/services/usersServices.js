import { get, post } from "../untils/request";

export const loginUser = async (email, password) => {
    const res = await get(`users?email=${email}&password=${password}`);
    return res;
};

export const checkExistUser = async (email) => {
    const res = await get(`users?email=${email}`);
    return res;
}

export const registerAccountUser = async (dataObj) => {
    const response = await post(`users`, dataObj);
    return response;
}