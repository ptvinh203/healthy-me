import Footer from "../../components/guest/Footer";
import Header from "../../components/guest/Header";
import FeatureSection from "../../components/guest/FeatureSection";
import SuggestionSection from "../../components/guest/SuggestionSection";
import Image from "../../components/guest/Image";
import CustomSearchBar from "../../components/guest/SearchBar";
const { Title, Text } = Typography;
import { Typography } from 'antd';

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
                        padding: "80px 80px 0px 80px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <div
                        style={{
                            display: 'flex', flexDirection: 'column',
                            justifyContent: "flex-start",
                            maxWidth: "50%",
                        }}
                    >
                        <CustomSearchBar ></CustomSearchBar>
                        <div>
                            <Title level={3} style={{ width: "60%", fontWeight: 'bold', marginTop: '80px', color: '#333' }}>
                                Hãy tham gia cùng chúng tôi để khiến sức khỏe cộng đồng tốt hơn
                            </Title>
                            <Text style={{ width: 500, fontSize: '20px', color: '#666' }}>
                                Đăng nhập để trải nghiệm những chức năng khác                            </Text>
                        </div>
                    </div>

                    <Image

                        style={{

                            maxWidth: "50%",
                        }}
                    ></Image>

                </div>
                <FeatureSection />
                <SuggestionSection />
                <Footer />
            </div >
        </>
    );
}

export default LandingPage;
