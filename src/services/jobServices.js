import { del, get, patch, post } from "../untils/request"

export const getJobsOfCompany = async (idCompany) => {
    const response = await get(`jobs?idCompany=${idCompany}`);
    return response;
}

export const getJobDetails = async (jobId) => {
    const response = await get(`jobs/${jobId}`);
    return response;
}

export const createJob = async (object) => {
    const response = await post(`jobs`, object);
    return response;
}

export const deleteJob = async (jobId) => {
    const response = await del(`jobs/${jobId}`);
    return response;
}

export const updateJob = async (jobId, data) => {
    const response = await patch(`jobs/${jobId}`, data)
    return response;
}

export const getJobOfCompany = async (idJob, idCompany) => {
    const response = await get(`jobs?id=${idJob}&idCompany=${idCompany}`);
    return response;
}

export const getAllJobs = async () => {
    const response = await get(`jobs`);
    return response;
}