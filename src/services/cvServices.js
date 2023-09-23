import { del, get, patch, post } from "../untils/request";

export async function createCV(dataObject) {
    const response = await post(`cv`, dataObject);
    return response;
}

export async function getCVListOfCompany(idCompany) {
    const response = await get(`cv?idCompany=${idCompany}`);
    return response;
}

export const getCVDetails = async (idCV) => {
    const response = await get(`cv/${idCV}`);
    return response;
}

export const changeStatusCV = async (idCV, data) => {
    const response = await patch(`cv/${idCV}`, data);
    return response;
}

export const deleteCV = async (idCV) => {
    const response = await del(`cv/${idCV}`);
    return response;
}