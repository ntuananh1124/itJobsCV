import { Tag } from "antd";
import './SkillList.scss';
import { getTags } from "../../services/tagsServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SkillList() {
    // const skill = [
    //     {
    //         id: 1,
    //         name: "JavaScript"
    //     },
    //     {
    //         id: 2,
    //         name: "SQL"
    //     },
    //     {
    //         id: 3,
    //         name: "ReactJS"
    //     },
    //     {
    //         id: 4,
    //         name: "Ruby"
    //     },
    //     {
    //         id: 5,
    //         name: "HTML"
    //     }
    // ]
    const [skill, setSkill] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const tags = await getTags();
            if (tags) {
                setSkill(tags);
            }
        }
        fetchApi()
    }, [])

    return (
        <>
            <div className="skill-list">
                {skill && skill.map((item) => (
                    <Link to={`search?tag=${item.value || ""}`} key={item.key}>
                        <Tag color="blue">{item.value}</Tag>
                    </Link>
                ))}
            </div>
        </>
    )
}