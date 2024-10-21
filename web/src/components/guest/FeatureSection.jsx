import { Typography } from "antd";
import Diet from "../../assets/images/diet1.png";
import Stats from "../../assets/images/stats.png";
import colors from "../../constants/Colors";

const { Text, Paragraph } = Typography;

const features = [
  {
    title: "Khuyến nghị thực phẩm",
    description:
      "Chúng tôi cung cấp khuyến nghị về thực phẩm theo nhu cầu calo của bạn.",
    imgSrc: Diet,
  },
  {
    title: "Giá trị dinh dưỡng",
    description:
      "Nhận được tất cả các giá trị dinh dưỡng của món ăn bạn yêu thích.",
    imgSrc: Stats,
  },
];

function FeatureSection() {
  return (
    <div
      style={{
        width: "100%",
        padding: "80px ",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Paragraph strong style={{ width: "250px" }}>
          <Text
            style={{
              wordBreak: "break-word",
              fontSize: "Large",
              color: colors.secondary,
            }}
          >
            CÁC TÍNH NĂNG CHÚNG TÔI CUNG CẤP
          </Text>
        </Paragraph>
        <Paragraph strong style={{ width: "250px" }}>
          <Text style={{ wordBreak: "break-word", fontSize: "x-Large" }}>
            Tính toán BMI dễ hơn
          </Text>
        </Paragraph>
        <Paragraph style={{ width: "250px" }}>
          <Text style={{ wordBreak: "break-word" }}>
            Chúng tôi tính chỉ số BMI của bạn dựa trên dữ liệu như tuổi, chiều
            cao, cân nặng.
          </Text>
        </Paragraph>
      </div>

      {features.map((feature, index) => (
        <div style={{ display: "flex", flexDirection: "column" }} key={index}>
          <img
            style={{ width: "100px", height: "100px" }}
            src={feature.imgSrc}
            alt={feature.title}
          />
          <Paragraph strong style={{ width: "250px" }}>
            <Text style={{ wordBreak: "break-word" }}>{feature.name}</Text>
          </Paragraph>
          <Paragraph style={{ width: "250px" }}>
            <Text style={{ wordBreak: "break-word" }}>
              {feature.description}
            </Text>
          </Paragraph>
        </div>
      ))}
    </div>
  );
}

export default FeatureSection;
