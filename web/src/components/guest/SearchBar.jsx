import { Input, Button } from "antd";
import { HeartTwoTone, SearchOutlined } from "@ant-design/icons";

const CustomSearchBar = () => {
  const suffix = <HeartTwoTone twoToneColor="#eb2f96" />;

  return (
    <div style={{ display: "flex", alignItems: "flex-start", width: "300px" }}>
      <Input
        placeholder="Vấn đề sức khỏe"
        suffix={suffix}
        style={{
          borderRadius: "20px",
          padding: "5px 10px",
          borderColor: "#d9d9d9",
        }}
      />
      <Button
        type="primary"
        shape="circle"
        icon={<SearchOutlined />}
        style={{
          marginLeft: "10px",
        }}
      />
    </div>
  );
};

export default CustomSearchBar;
