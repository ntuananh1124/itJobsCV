import { get } from "../untils/request"

export const getCities = async () => {
    const response = await get(`city`);
    return response;
}