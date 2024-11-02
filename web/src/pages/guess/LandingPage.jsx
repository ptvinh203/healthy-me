import Footer from "../../components/guest/Footer";
import Header from "../../components/guest/Header";
import FeatureSection from "../../components/guest/FeatureSection";
import SuggestionSection from "../../components/guest/SuggestionSection";
import SearchBar from "../../components/guest/SearchBar";
import image from "../../assets/images/doctor.png";
import { Col, Row } from "antd";

function LandingPage() {
    return (
        <>
            <Header />
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        padding: "80px",
                        width: "100%",
                    }}
                >
                    <Row >
                        <Col span={12}>
                            <SearchBar />
                        </Col>
                        <Col
                            span={12}
                            style={{
                                display: "flex",
                                justifyContent: 'center',
                            }}
                        >
                            <img style={{ width: "60%" }} src={image}></img>
                        </Col>
                    </Row>
                </div>
                <FeatureSection />
                <SuggestionSection />
                <Footer />
            </div>
        </>
    );
}

export default LandingPage;
