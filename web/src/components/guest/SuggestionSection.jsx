import { Spin, Typography } from "antd";
import { useState, useEffect } from "react";
import colors from "../../constants/Colors";
const { Text, Paragraph } = Typography;

function SuggestionSection() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/v1/item/low-calorie?limit=10"
                );
                const data = await response.json();
                console.log(data);
                setItems(data);
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100vh",
                    alignItems: "center",
                }}
            />
        );
    }

    return (
        <div
            style={{
                padding: "20px 80px",
                display: "flex",
                flexDirection: "column",

            }}
        >
            <Paragraph strong style={{ width: "150px" }}>
                <Text style={{ fontSize: "large", color: colors.secondary }}>
                    CHỦ ĐỀ GỢI Ý
                </Text>
            </Paragraph>

            <Paragraph strong style={{ width: "100%", margin: "40px 0px" }}>
                <Text style={{ fontSize: "xxx-Large" }}>Nâng cao lối sống của bạn</Text>
            </Paragraph>

            <div
                style={{
                    marginTop: "40px",
                    padding: "20px 80px",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                }}
            >
                {items.slice(0, 8).map((item, index) => (
                    <div key={index} style={{ marginBottom: "20px", textAlign: "left" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                paddingBottom: "20px",
                            }}
                        >
                            <img
                                style={{
                                    width: "150px", cursor: "pointer",
                                    height: "150px",
                                    borderRadius: "30px",
                                }}
                                onClick={() => { }}
                                alt={item.title}
                                src={item.image}
                            />
                            <Paragraph strong style={{ width: "150px", marginTop: "10px" }}>
                                <Text style={{ wordBreak: "break-word" }}>{item.name}</Text>
                            </Paragraph>
                            <Paragraph style={{ width: "150px" }}>
                                <Text style={{ wordBreak: "break-word" }}>
                                    {item.description}
                                </Text>
                            </Paragraph>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default SuggestionSection;
