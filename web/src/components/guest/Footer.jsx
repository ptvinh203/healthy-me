import { Col, Typography, List, Table, Flex } from "antd";
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


import "./GuestCss.css";
function Footer() {
    const columns = [
        { title: "Product", dataIndex: "product", key: "product", width: "200px" },
        { title: "Company", dataIndex: "company", key: "company", width: "200px" },
        { title: "Support", dataIndex: "support", key: "support", width: "200px" },
        {
            title: "Contact Us",
            dataIndex: "contact",
            key: "contact",
            width: "200px",
        },
    ];

    const dataSource = [
        {

            key: "1",
            product: "Features",
            company: "About",
            support: "Getting started",
            contact: (
                <img
                    width={32}
                    src={phone}
                />
            ),
        },
        {
            key: "2",
            product: "Pricing",
            company: "Contact us",
            support: "Help center",
            contact: (
                <img
                    width={32}
                    src={email}
                />
            ),
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
            <Flex justify="center" style={{ padding: "40px 80px " }}>
                <Flex vertical style={{ marginRight: "100px", paddingTop: "20px" }}>
                    <img style={{ width: "130px", height: "71.21px", paddingRight: "30px" }} src={Logo} alt="logo" />
                    <img style={{ width: "250px", height: "60px" }} src={logo_text} alt="logo" />
                    <Paragraph style={{ width: "250px", paddingTop: "20px" }}>
                        <Text
                            style={{ wordBreak: "break-word" }}
                        //ellipsis={{tooltip:true}}
                        >
                            Tìm hiểu cách duy trì sức khỏe tốt hơn với thông tin từ chuyên
                            gia, mẹo dinh dưỡng và kế hoạch luyện tập phù hợp.
                        </Text>
                    </Paragraph>
                    <List
                        grid={{ gutter: 16, column: 5 }}
                        dataSource={[
                            Facebook, Twitter, Instagram, LinkedIn, Youtube
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <div style={{ padding: "20px 0px" }}>
                                    <button
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                            border: "none",
                                            backgroundColor: "white",
                                            cursor: "pointer" //
                                        }}
                                        onClick={() => {
                                        }}
                                    >
                                        <img
                                            style={{ width: "100%", height: "100%", backgroundColor: "white" }}
                                            src={item}
                                            alt="item"
                                        />
                                    </button>
                                </div>
                            </List.Item>
                        )}
                    />
                </Flex>

                <Col>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        bordered={false}
                        pagination={false}
                        style={{ border: "none" }}
                    />
                </Col>
            </Flex>
        </div>
    );
}

export default Footer;
