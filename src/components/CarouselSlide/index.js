import { Carousel } from "antd";
import './CarouselSlide.scss';

// import images
import Image1 from "../../assets/images/angular.png";
import Image2 from "../../assets/images/react.jpg";
import Image3 from "../../assets/images/vue.png";
import Image4 from "../../assets/images/people1.jpg";
import Image5 from "../../assets/images/people2.jpg";

export default function CarouselSlide() {
    return (
        <div style={{marginTop: 30}}>
            <Carousel arrows infinite={true} autoplay>
                <div className="slide">
                    <img src={Image1} alt="img1" className="slide-img" />
                </div>
                <div className="slide">
                    <img src={Image2} alt="img2" className="slide-img" />
                </div>
                <div className="slide">
                    <img src={Image3} alt="img3" className="slide-img" />
                </div>
                <div className="slide">
                    <img src={Image4} alt="img4" className="slide-img" />
                </div>
                <div className="slide">
                    <img src={Image5} alt="img5" className="slide-img" />
                </div>
            </Carousel>
        </div>
    )
}