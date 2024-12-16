import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { getCities } from "../../services/cityServices";
import { useNavigate } from "react-router-dom";
import { getTags } from "../../services/tagsServices";

export default function Search() {
    const [form] = Form.useForm();
    const [city, setCity] = useState();
    const [tags, setTags] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            // city handle
            const result = await getCities();
            if (result) {
                let dataCities = [
                    {
                        key: 0,
                        label: "Tất cả",
                        value: "Tất cả"
                    }
                ]
                for (let i = 0; i < result.length; i++) {
                    dataCities.push({
                        key: i + 1,
                        label: result[i].value,
                        value: result[i].value
                    })
                }
                setCity(dataCities);
            }
        }
        fetchApi()
    }, [])

    const handleSearch = (dataObject) => {
        console.log(dataObject);
        if (dataObject.city === undefined) {
            dataObject.city = "";
        }
        let city = dataObject.city || ""; // Tạo biến "city" từ dataObject.city hoặc "" (trong trường hợp user không điền)
        city = dataObject.city === "Tất cả" ? "" : city; // Gán "city" = (nếu dataObject.city mà bằng "All" khi user chọn "All" thi sẽ là rỗng và ngược lại sẽ lấy biến city)
        
        // Tag cũng giống hệt bên trên:
        // let tag = dataObject.tag || "";
        // tag = dataObject.tag === "Tất cả" ? "" : tag;
        navigate(`search?city=${dataObject.city}&tag=${dataObject.tag || ""}`)
    }

    return (
        <>
            <div className="search">
                <Form form={form} layout="inline" onFinish={handleSearch}>
                    <Form.Item name="city">
                        {city && <Select defaultValue={city[0]} allowClear placeholder="Chọn thành phố" options={city} style={{width: '200px'}}/>}
                    </Form.Item>
                    {/* <Form.Item name="tag">
                        {tags && <Select allowClear placeholder="Tag" options={tags} style={{width: '200px'}}/>}
                    </Form.Item> */}
                    <Form.Item name="tag" style={{width: "400px"}}>
                        <Input placeholder="Nhập tag" />
                    </Form.Item>
                    <Button htmlType="submit" type="primary">Tìm kiếm</Button>
                </Form>
            </div>
        </>
    )
}