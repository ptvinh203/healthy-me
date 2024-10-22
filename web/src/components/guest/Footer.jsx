import { Col, Typography, List, Flex } from "antd";
const { Text, Paragraph } = Typography;
import Logo from "../../assets/images/logo.png";
import Facebook from "../../assets/images/Facebook.png";
import phone from "../../assets/images/phone.jpg";
import LinkedIn from "../../assets/images/LinkedIn.png";
import logo_text from "../../assets/images/logo_text.png";
import Instagram from "../../assets/images/Instagram.png";
import Twitter from "../../assets/images/Twitter.png";
import email from "../../assets/images/email.svg";
import Youtube from "../../assets/images/Youtube.png";
import '../../assets/css/global.css';
import colors from "../../constants/Colors";

function Footer() {
    const dataSource = [
        {
            key: "1",
            product: "Features",
            company: "About",
            support: "Getting started",
            contact: <img width={32} src={phone} alt="phone" />,
        },
        {
            key: "2",
            product: "Pricing",
            company: "Contact us",
            support: "Help center",
            contact: <img width={32} src={email} alt="email" />,
        },
        {
            key: "3",
            product: "Case studies",
            company: "Careers",
            support: "Server status",
            contact: "",
        },
        {
            key: "4",
            product: "Reviews",
            company: "Cultures",
            support: "Report a bug",
            contact: "",
        },
        {
            key: "5",
            product: "Update",
            company: "Blog",
            support: "Chat support",
            contact: "",
        },
    ];

    return (
        <div style={{ backgroundColor: "white" }}>
            <Flex justify="center" style={{ padding: "40px 80px" }}>
                <Flex vertical style={{ marginRight: "100px", paddingTop: "20px" }}>
                    <img style={{ width: "130px", height: "71.21px", paddingRight: "30px" }} src={Logo} alt="logo" />
                    <img style={{ width: "250px", height: "60px" }} src={logo_text} alt="logo text" />
                    <Paragraph style={{ width: "250px", paddingTop: "20px" }}>
                        <Text style={{ wordBreak: "break-word" }}>
                            Tìm hiểu cách duy trì sức khỏe tốt hơn với thông tin từ chuyên
                            gia, mẹo dinh dưỡng và kế hoạch luyện tập phù hợp.
                        </Text>
                    </Paragraph>
                    <List
                        grid={{ gutter: 16, column: 5 }}
                        dataSource={[Facebook, Twitter, Instagram, LinkedIn, Youtube]}
                        renderItem={(item) => (
                            <List.Item>
                                <div style={{ padding: "20px 0px" }}>
                                    <button
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                            border: "none",
                                            backgroundColor: "white",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => { }}
                                    >
                                        <img
                                            style={{ width: "100%", height: "100%", backgroundColor: "white" }}
                                            src={item}
                                            alt="social media icon"
                                        />
                                    </button>
                                </div>
                            </List.Item>
                        )}
                    />
                </Flex>

                <Col>
                    <table style={{ borderCollapse: 'collapse', width: '100%', backgroundColor: 'white' }}>
                        <thead>
                            <tr>
                                <th style={{ width: "200px", padding: "8px", color: colors.secondary, textAlign: "left" }}>Product</th>
                                <th style={{ width: "200px", padding: "8px", color: colors.secondary, textAlign: "left" }}>Company</th>
                                <th style={{ width: "200px", padding: "8px", color: colors.secondary, textAlign: "left" }}>Support</th>
                                <th style={{ width: "200px", padding: "8px", color: colors.secondary, textAlign: "left" }}>Contact Us</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataSource.map(item => (
                                <tr key={item.key}>
                                    <td style={{ padding: "8px", height: "60px", border: "none" }}>{item.product}</td>
                                    <td style={{ padding: "8px", height: "60px", border: "none" }}>{item.company}</td>
                                    <td style={{ padding: "8px", height: "60px", border: "none" }}>{item.support}</td>
                                    <td style={{ padding: "8px", height: "60px", border: "none" }}>{item.contact}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
            </Flex>
        </div>
    );
}

export default Footer;
