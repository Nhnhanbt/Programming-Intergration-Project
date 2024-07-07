import React from "react";
import { Helmet } from "react-helmet";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent"
import {
    WrapperProducts,
    WrapperPage
} from "./style"
import b1 from "../../assets/images/banner1.jpg";
import b2 from "../../assets/images/banner2.jpg";
import b3 from "../../assets/images/banner3.png";
import b4 from "../../assets/images/banner4.jpg";
import b5 from "../../assets/images/banner5.png";
import b6 from "../../assets/images/banner6.jpg";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import NavbarTypeComponent from "../../components/NavbarTypeComponent/NavbarTypeComponent";

const HomePage = () => {
    return (
        <div style={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
            <NavbarTypeComponent />
            <WrapperPage>
                <div style={{width: '1200px'}}>
                    <Helmet>
                        <title>Trang chủ - BKSHOP</title>
                    </Helmet>
         
                    <div id="container">
                        <SliderComponent arrImg={[b1, b2, b3, b4, b5, b6]} />
                        <WrapperProducts>
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                        </WrapperProducts>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
                            <ButtonComponent />
                        </div>
                    </div>
                </div>
            </WrapperPage>
        </div>
    )
}

export default HomePage