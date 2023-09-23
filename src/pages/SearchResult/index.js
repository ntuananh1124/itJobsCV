import { useSearchParams } from "react-router-dom";
import GoBack from "../../components/GoBack";
import { Tag } from "antd";
import "./SearchResult.scss"
import { useEffect, useState } from "react";
import { getAllJobs } from "../../services/jobServices";
import SearchList from "../../components/SearchList";

export default function SearchResult() {
    const [data, setData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const citySearchValue = searchParams.get("city") || ""; // lấy ra value của params "city", nếu ng dùng k truyền vào params này thì để value là rỗng
    // console.log(citySearchValue);
    // const keywordSearchValue = searchParams.get("keyword") || ""; // lấy ra value của params "keyword", nếu ng dùng k truyền vào params này thì để value là rỗng
    // console.log(keywordSearchValue);
    const tagSearchValue = searchParams.get("tag") || "";

    useEffect(() => {
        const fetchApi = async () => {
            const allJobResult = await getAllJobs();
            if (allJobResult) {
                const resultData = allJobResult.filter((jobItem) => {
                    const city = citySearchValue ? jobItem.city?.includes(citySearchValue) : true;
                    const tag = tagSearchValue ? jobItem.tags?.includes(tagSearchValue) : true;
                    // const keyword = keywordSearchValue ? jobItem.name.split(" ")?.includes(keywordSearchValue) : true;
                    const status = jobItem.status;
                    return city && tag && status;
                })
                setData(resultData.reverse());
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            <div className="p20">
                <GoBack />
                <div className="result">
                    <h3>Kết quả tìm kiếm: </h3>
                    <div className="result-keyword">
                        {citySearchValue && <Tag color="yellow">{citySearchValue}</Tag>}
                        {tagSearchValue  && <Tag color="blue">{tagSearchValue}</Tag>}
                    </div>
                </div>
                {data.length > 0 ? <SearchList data={data} /> : <div>Chưa có job nào liên quan đến từ khóa bạn cần tìm...</div>}
            </div>
        </>
    )
}