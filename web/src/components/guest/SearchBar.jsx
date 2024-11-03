import { Input, Button, Flex } from "antd";
import { HeartTwoTone, SearchOutlined, CloseCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CustomSearchBar = () => {
    const suffix = <HeartTwoTone twoToneColor="#eb2f96" />;
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(false);
    const testApi = "https://jsonplaceholder.typicode.com/albums";
    const [searchResults, setSearchResults] = useState([]);
    console.log(searchResults);
    useEffect(() => {
        const controller = new AbortController();
        async function fetchData() {
            try {
                const res = await fetch(testApi, { signal: controller.signal });
                if (!res.ok) {
                    throw new Error("Fetching Error");
                }
                const data = await res.json();
                setSearchResults(
                    data.filter((item) => {
                        return item.title.toLowerCase().includes(query.toLowerCase());
                    })
                );
            } catch (error) {
                if (error.name != "AbortError") console.log(error.message);
            }
        }

        if (query) {
            fetchData();
        } else {
            setSearchResults([]);
        }

        fetchData();
        return function () {
            controller.abort();
        };
    }, [query]);

    useEffect(() => {
        query.length > 0 ? setActive(true) : setActive(false);
    }, [query]);

    return (
        <div style={{ display: "flex", alignItems: "flex-start", width: "500px" }}>
            <Flex
                style={{
                    width: active ? "100%" : "60%",
                    transition: "width 0.3s ease, transform 0.3s ease",
                    transform: active ? "scale(1.05)" : "scale(1)",
                }}
                vertical
            >
                <Input
                    placeholder="Vấn đề sức khỏe"
                    suffix={suffix}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    value={query}
                    style={{
                        width: "100%",
                        borderRadius: "20px",
                        padding: "5px 10px",
                        borderColor: "#d9d9d9",
                    }}
                />

                {query.length > 0 ? (
                    <Flex vertical></Flex>
                ) : (
                    <div style={{ width: "100%" }}>
                        <span>Hãy nhập tên nhà hàng bạn cần tìm hjhj</span>
                    </div>
                )}
            </Flex>
            {/* route res */}
            {query.length > 0 ? (
                <Button
                    type="primary"
                    shape="circle"
                    icon={<CloseCircleFilled />}
                    style={{
                        marginLeft: "10px",
                    }}
                    onClick={() => {
                        setQuery("");
                    }}
                />
            ) : (
                <Button
                    type="primary"
                    shape="circle"
                    icon={<SearchOutlined />}
                    style={{
                        marginLeft: "10px",
                    }}
                />
            )}
        </div>
    );
};

export default CustomSearchBar;
