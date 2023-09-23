import Search from "../../components/Search"
import "./Home.scss";
import SkillList from '../../components/SkillList';
import CompanyList from "../../components/CompanyList";

export default function Home() {
    return (
        <>
            <div className="home-content p20">
                <h2>IT Jobs for Developers</h2>
                <Search />
                <SkillList />
                <CompanyList />
            </div>
        </>
    )
}