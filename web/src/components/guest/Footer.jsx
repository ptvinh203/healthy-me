import { Col, Typography, List, Table, Flex } from "antd";
const { Text, Paragraph } = Typography;
import Logo from "../../assets/images/logo.png";
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
          src="https://product.hstatic.net/1000304920/product/dia-cd-the-neighbourhood-wiped-out-jewel-case-cd_d396dd8b45ca4f26871393846a7d7fb4.jpg"
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
          src="https://product.hstatic.net/1000304920/product/dia-cd-the-neighbourhood-wiped-out-jewel-case-cd_d396dd8b45ca4f26871393846a7d7fb4.jpg"
        />
      ),
    },
    {
      key: "3",
      product: "Case studies",
      company: "Careers",
      support: "Server status",
      contact: (
        <img
          width={32}
          src="https://product.hstatic.net/1000304920/product/dia-cd-the-neighbourhood-wiped-out-jewel-case-cd_d396dd8b45ca4f26871393846a7d7fb4.jpg"
        />
      ),
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
          <img width={150} src={Logo} alt="The Neighbourhood Album" />
          <Paragraph style={{ width: "250px" }}>
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
              "https://product.hstatic.net/1000304920/product/dia-cd-the-neighbourhood-wiped-out-jewel-case-cd_d396dd8b45ca4f26871393846a7d7fb4.jpg",
              "https://product.hstatic.net/1000304920/product/dia-cd-the-neighbourhood-wiped-out-jewel-case-cd_d396dd8b45ca4f26871393846a7d7fb4.jpg",
              "https://product.hstatic.net/1000304920/product/dia-cd-the-neighbourhood-wiped-out-jewel-case-cd_d396dd8b45ca4f26871393846a7d7fb4.jpg",
              "https://product.hstatic.net/1000304920/product/dia-cd-the-neighbourhood-wiped-out-jewel-case-cd_d396dd8b45ca4f26871393846a7d7fb4.jpg",
              "https://product.hstatic.net/1000304920/product/dia-cd-the-neighbourhood-wiped-out-jewel-case-cd_d396dd8b45ca4f26871393846a7d7fb4.jpg",
            ]}
            renderItem={(item) => (
              <List.Item>
                <img width={32} src={item} />
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
