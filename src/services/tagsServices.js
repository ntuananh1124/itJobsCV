import { get } from "../untils/request"

export const getTags = async () => {
    const response = await get(`tags`);
    return response;
}