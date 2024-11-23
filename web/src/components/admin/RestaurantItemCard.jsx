import { Card, Flex, Tag } from "antd";
import defaultAva from "../../assets/images/default_avatar.png";
import colors from "../../constants/Colors";
import { Link } from "react-router-dom";
export default function RestaurantItemCard({ item }) {
    return (
        (item === undefined || item === null) ?
            <Card
                loading={true}
                hoverable
                style={{
                    borderRadius: '30px',
                    aspectRatio: '1/1',
                }}
            ></Card> :
            <Flex style={{ width: "90%", justifyContent: "flex-start" }}>
                <Flex vertical style={{ position: 'relative', justifyContent: "space-around" }}>
                    <p style={{
                        fontWeight: "500",
                        fontSize: '20px',
                        lineHeight: "30px",
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 200
                    }}>
                        {item.account.name}
                    </p>
                    <img
                        alt="Item image"
                        src={item.account.avatar ? item.account.avatar : defaultAva}
                        style={{
                            borderRadius: '30px',
                            width: "160px",
                            height: "160px",
                            objectFit: 'cover', objectPosition: 'center center', margin: "20px"
                        }}
                    />

                </Flex>
                <Flex vertical style={{
                    textAlign: 'left', position: 'relative', justifyContent: "space-between", margin: "0px 40px 20px 40px",
                    width: "100%",
                }}>
                    <p style={{
                        fontSize: '20px',
                        lineHeight: "30px",
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontWeight: "bold"
                    }}
                    >
                        Thông tin chi tiết
                    </p>
                    <span style={{
                        backgroundColor: colors.grayLight, marginLeft: "20px"
                    }}>
                        <p style={{
                            fontSize: '20px',
                            lineHeight: "30px",
                            textAlign: 'left',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                        >
                            {item.address}
                        </p>

                    </span>
                    <p style={{
                        fontSize: '20px',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        lineHeight: "30px",
                        textOverflow: 'ellipsis',
                        fontWeight: "bold"
                    }}
                    >
                        Giấy chứng nhận an toàn thực phẩm
                    </p>
                    <span style={{
                        backgroundColor: colors.grayLight,
                        marginLeft: "20px"

                    }}>
                        {item.certification["0"] === "temp" ? (
                            <p style={{
                                fontSize: '20px',
                                textAlign: 'left',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                lineHeight: "30px",
                                textOverflow: 'ellipsis',
                                color: "red",
                                fontWeight: "bold"
                            }}
                            >
                                Nhà hàng này chưa cung cấp chứng chỉ
                            </p>
                        ) :
                            (
                                <div
                                    style={{
                                        height: "43px",
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: "100%",
                                        overflowX: 'auto',
                                        overflowY: 'hidden',
                                        whiteSpace: 'nowrap',
                                        border: "1px solid #d9d9d9",
                                        padding: "4px 11px",
                                        zIndex: "1000",
                                        borderRadius: "5px",
                                        backgroundColor: colors.lightBackground,
                                    }}
                                >
                                    {item.certification.map((file) => (
                                        <div key={file.uid}>
                                            <Link to={file} target="_blank" >
                                                <Tag
                                                    style={{
                                                        cursor: "pointer",
                                                        width: "fit-content",
                                                        padding: "2px 8px",
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        marginRight: "8px", // Space between tags
                                                    }}
                                                >
                                                    {file.length > 30 ? `${file.slice(0, 30)}...` : file}
                                                </Tag>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </span>

                </Flex>
            </Flex >
    )
}