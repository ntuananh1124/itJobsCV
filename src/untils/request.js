// const API_DOMAIN = 'http://localhost:3008/';
const API_DOMAIN = 'https://it-jobs-database.vercel.app/';

export const get = async (path) => {
    const response = await fetch(API_DOMAIN + path);
    const result = await response.json();
    return result;
}

export const post = async (path, data) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
}

export const del = async (path) => {
    const response = await fetch(API_DOMAIN + path,{
        method: "DELETE",
    });
    const result = await response.json();
    return result;
}

export const patch = async (path, data) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // vi la gui len dang object nen phai chuyen lai thanh dang json
    })
    const result = await response.json();
    return result;
}