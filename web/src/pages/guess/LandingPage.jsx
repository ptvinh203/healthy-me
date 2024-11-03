import Footer from "../../components/guest/Footer";
import Header from "../../components/guest/Header";
import FeatureSection from "../../components/guest/FeatureSection";
import SuggestionSection from "../../components/guest/SuggestionSection";
import Image from "../../components/guest/Image";

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
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    {/* <SearchBar></SearchBar> */}
                    <Image></Image>
                </div>
                <FeatureSection />
                <SuggestionSection />
                <Footer />
            </div>
        </>
    );
}

export default LandingPage;
