import Footer from "../../components/guest/Footer";

import Header from "../../components/guest/Header";
import FeatureSection from "../../components/guest/FeatureSection";
import SuggestionSection from "../../components/guest/SuggestionSection";
import Image from "../../components/guest/Image";
import SearchBar from "../../components/guest/SearchBar";
// import DoctorImage from "../../assets/images/doctor.png";

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
            justifyContent: "space-between",
          }}
        >
          <SearchBar></SearchBar>
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
