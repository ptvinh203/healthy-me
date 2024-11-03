import { Button, Col, Flex, Input, Row, Typography } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import searchIcon from '../assets/svgs/orderDetail/search.svg';
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import colors from "../constants/Colors";
// eslint-disable-next-line react/prop-types
export default function ItemSearchHeader({ icon, onItemSearch }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { Text, Paragraph } = Typography;
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    "https://jsonplaceholder.typicode.com/photos"
                ).then(response => response.json());

                setSearchResults(
                    res.filter((item) =>
                        item.id.toString().includes(query.toLowerCase())
                    )
                );
            } catch (error) {
                console.log(error.message);
            }
        }

        if (query) {
            fetchData();
        } else {
            setSearchResults([]);
        }
    }, [query]);

    function clearQuery() {
        setQuery("");
    }

    return (
        <Row justify='space-between' align='middle'>
            <Col xs={{ span: 21 }} md={{ span: 10 }}>
                <Flex
                    align='center'
                    justify='center'
                    style={{
                        transition: "background 0.3s ease",
                        padding: '6px 15px', borderRadius: '30px',
                        background: colors.background,
                        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)', position: "relative"
                    }}
                >
                    <Input
                        placeholder="Tìm kiếm sản phẩm của bạn"
                        size="large"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ border: 'none', boxShadow: 'none', backgroundColor: '#F9F7F7' }}
                    />
                    {query.length >= 1 && (
                        <Flex
                            vertical
                            style={{
                                zIndex: "1000",
                                width: "100%",
                                height: "300px",
                                position: "absolute",
                                top: "60px",
                                borderRadius: "10px",
                                border: `solid 1px ${colors.border}`,
                                backgroundColor: colors.background,
                                overflowY: "scroll",
                            }}
                        >
                            <Paragraph strong style={{ width: "100%", margin: "10px 0px 0px 10px" }}>
                                <Text style={{ fontSize: "large" }}>Món ăn</Text>
                            </Paragraph>
                            {searchResults.length === 0 ? (
                                <Paragraph strong style={{ width: "100%", margin: "10px 0px 0px 10px" }}>
                                    <Text style={{ fontSize: "medium" }}>Không tìm thấy món ăn</Text>
                                </Paragraph>
                            ) : (
                                searchResults.map((item, index) => (
                                    <Flex
                                        key={item.id}
                                        style={{
                                        }}
                                        vertical
                                    >
                                        <Link to={`/cus/item/${item.id}`}>
                                            <Flex
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                                style={{
                                                    background: hoveredIndex === index ? "#D4F6FF" : colors.lightBackground,
                                                    margin: "5px ",
                                                    padding: "5px",
                                                    border: `0.3px solid ${colors.lightBackground}`,
                                                    borderRadius: "5px"
                                                }}
                                            >
                                                <Flex
                                                    style={{
                                                        justifyContent: "center", alignItems: "center", margin: "0px 20px 0px 10px"
                                                    }}>
                                                    <img style={{
                                                        objectFit: "cover", objectPosition: "center center", height: "80px", width: "56px",
                                                        borderRadius: "10px"
                                                    }} src={item.url} alt={item.title} />
                                                </Flex>
                                                <Flex vertical style={{ justifyContent: "space-around" }}>
                                                    <div>{item.title}</div>
                                                    <div>{item.id}</div>
                                                    <div>{item.id}</div>
                                                </Flex>
                                            </Flex>
                                        </Link>
                                    </Flex>
                                ))
                            )}
                        </Flex>
                    )}
                    {query.length > 0 ? (
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<CloseCircleFilled />}
                            style={{
                                cursor: "pointer",
                            }}
                            onMouseDown={(event) => {
                                event.preventDefault();
                            }}
                            onClick={clearQuery}
                        />
                    ) : (
                        <Button
                            style={{
                                backgroundColor: '#1890ff',
                                color: '#fff',
                                width: '40px',
                                height: '40px',
                                borderRadius: '40px',
                                marginLeft: '10px',
                                padding: 0,
                                background: 'linear-gradient(to right, #3A8EF6, #6F3AFA)'
                            }}
                            onClick={onItemSearch}
                        >
                            <img src={searchIcon} style={{ width: '20px', height: '20px' }} />
                        </Button>
                    )}
                </Flex>
            </Col>

            {
                icon && (
                    <Col xs={{ span: 2 }} md={{ span: 2 }}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <img
                            src={icon} alt="icon"
                            style={{
                                height: '40px',
                                width: '40px',
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate('/cus/cart')}
                        />
                    </Col>
                )
            }
        </Row >
    );
}
