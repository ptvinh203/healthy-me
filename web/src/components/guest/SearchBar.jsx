import { Input, Button } from "antd";
import { HeartTwoTone, SearchOutlined } from "@ant-design/icons";

const CustomSearchBar = () => {
    const suffix = <HeartTwoTone twoToneColor="#eb2f96" />;

    return (
        <div style={{ display: "flex", alignItems: "center", width: "80%" }}>
            <Input
                placeholder="Vấn đề sức khỏe"
                suffix={suffix}
                style={{
                    borderRadius: "30px",
                    padding: "10px 20px",
                    borderColor: "#d9d9d9",
                }}
            />
            <Button
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
                size="large"
                style={{
                    marginLeft: "10px",
                }}
            />
        </div>
    );
};

export default CustomSearchBar;
