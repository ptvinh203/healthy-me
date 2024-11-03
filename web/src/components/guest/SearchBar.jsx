<<<<<<< Updated upstream
import { Input, Button, Flex, Typography } from "antd";
import { HeartTwoTone, SearchOutlined, CloseCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import colors from "../../constants/Colors";
const CustomSearchBar = () => {
    const suffix = <HeartTwoTone twoToneColor="#eb2f96" />;
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(false);
    const testApi = "https://jsonplaceholder.typicode.com/photos";
    const [searchResults, setSearchResults] = useState([]);
    const { Text, Paragraph } = Typography;

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
                if (error.name !== "AbortError") console.log(error.message);
            }
        }

        if (query) {
            fetchData();
        } else {
            setSearchResults([]);
        }

        return function () {
            controller.abort();
        };
    }, [query]);

    function focus() {
        setActive(true);
    }

    function blur() {
        setActive(false);
    }

    function clearQuery() {
        setQuery("");
    }
    console.log(searchResults);
    return (
        <div style={{ display: "flex", alignItems: "flex-start", width: "500px" }}>
            <Flex
                onFocus={focus}
                onBlur={blur}
                style={{
                    marginRight: "10px",
                    width: active ? "100%" : "60%",
                    transition: "width 0.3s ease, transform 0.3s ease",
                    transform: active ? "scale(1.05)" : "scale(1)",
                    position: "relative",
                }}
                vertical
            >
                <Input
                    placeholder="Vấn đề sức khỏe"
                    suffix={suffix}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    style={{
                        width: "100%",
                        borderRadius: "20px",
                        padding: "5px 10px",
                        borderColor: colors.border,
                    }}
                />
                {query.length >= 3 && (
                    <Flex
                        vertical
                        style={{
                            width: "100%",
                            height: "300px",
                            position: "absolute",
                            top: "38px",
                            border: `solid 1px ${colors.border}`,
                            overflowY: "scroll",
                            scrollbarWidth: "thin",
                            scrollbarColor: colors.grayMedium,
                            overflowX: "hidden",
                        }}
                    >
                        <Paragraph strong style={{ width: "100%", margin: "10px 0px 0px 10px" }}>
                            <Text style={{ fontSize: "large" }}>Restaurant</Text>
                        </Paragraph>
                        {searchResults.length == 0 ? (
                            <Paragraph strong style={{ width: "100%", margin: "10px 0px 0px 10px" }}>
                                <Text style={{ fontSize: "medium" }}>Không tìm thấy nhà hàng</Text>
                            </Paragraph>
                        ) : (
                            searchResults.map((item) => (
                                <Flex
                                    key={item.id}
                                    style={{
                                        padding: "10px",
                                        borderTop: `solid 1px ${colors.border}`,
                                    }}
                                    vertical
                                >
                                    <div>{item.title}</div>
                                    <div>{item.id}</div>
                                </Flex>
                            ))
                        )}
                    </Flex>
                )}
            </Flex>

            {/* route res */}
=======
import { Input, Button } from "antd";
import { HeartTwoTone, CloseCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import colors from "../../constants/Colors";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const suffix = <HeartTwoTone twoToneColor="#eb2f96" />;

    const clearQuery = () => {
        setQuery("");
        onSearch(""); // Call the onSearch prop to reset the search
    };

    return (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
            <Input
                placeholder="Vấn đề sức khỏe"
                suffix={suffix}
                onChange={(e) => {
                    setQuery(e.target.value);
                    onSearch(e.target.value);
                }}
                value={query}
                style={{
                    borderRadius: "20px",
                    padding: "5px 10px",
                    borderColor: colors.border,
                }}
            />
>>>>>>> Stashed changes
            {query.length > 0 ? (
                <Button
                    type="primary"
                    shape="circle"
                    icon={<CloseCircleFilled />}
<<<<<<< Updated upstream
                    style={{
                        cursor: "pointer",
                    }}
                    onMouseDown={(event) => {
                        event.preventDefault(); // Prevent input blur
                    }}
                    onClick={clearQuery} // Call clearQuery directly
=======
                    onClick={clearQuery}
>>>>>>> Stashed changes
                />
            ) : (
                <Button
                    type="primary"
                    shape="circle"
                    icon={<SearchOutlined />}
<<<<<<< Updated upstream
                    style={{
                        cursor: query.length > 0 ? "pointer" : "auto",
                        marginLeft: "10px",
                    }}
=======
                    disabled
>>>>>>> Stashed changes
                />
            )}
        </div>
    );
};

export default SearchBar;
