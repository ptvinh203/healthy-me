import { Card, Col, Flex, Row } from "antd"
import { useEffect, useState } from 'react';
import itemService from '../../services/itemService';
import ItemSearchHeader from '../../components/ItemSearchHeader';
import React from 'react';
import fast_food from "../../assets/images/fast_food.png";
import fast_food_icon from "../../assets/images/fast_food_icon.png";
import main_food from "../../assets/images/main_food.png";
import main_food_icon from "../../assets/images/main_food_icon.png";
import drink_icon from "../../assets/images/drink_icon.png";
import drink1 from "../../assets/images/drink1.png";
import drink2 from "../../assets/images/drink2.png";
import drink3 from "../../assets/images/drink3.png";
import drink4 from "../../assets/images/drink4.png";
import Loading from "../../components/Loading"
import colors from "../../constants/Colors";
import RestaurantItemCard from "../../components/RestaurantItemCard";

const { Meta } = Card;

function ListFood() {
    const [type, setType] = useState("");
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchGetListFoodByType = async () => {
            if (type){
                try {
                    const res = await itemService.getItemByTypeAndRestaurant(type);
                    const data = res.data;
                    setItems(data);
                } catch (error) {
                    console.log(error)
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchGetListFoodByType();
    }, [type],);

    const handleBackToType = () => {
        setType("");
        setItems([]);
    };


    return (
        <Flex
            vertical
            gap={22}
            style={{
                overflowY: 'auto',
                height: '100%',
                width: '100%',
                padding: '20px'
            }}
        >
            <ItemSearchHeader
                icon={""}
                onItemSearch={""}
                value={""}
                onChange={""}
            />

            {type === "" && (
                <Row gutter={64} style={{marginTop: 50}}>
                <Col span={7}>
                    <Card hoverable style={{display: 'flex', justifyContent: 'center'}} onClick={() => setType("FAST_FOOD")}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{display: 'flex', width: 70, height: 70, marginRight: 10, backgroundColor: "#F8DEBD", borderRadius: 10,
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <img alt="Icon" src={fast_food_icon} style={{ width: 50, height: 40 }} />
                        </div>
                        <Meta title="Đồ ăn nhanh" style={{marginLeft: 30}}/>
                        </div>
                        <div style={{ width: '100%', marginTop: 10 }}>
                            <img alt="Đồ ăn nhanh" src={fast_food} style={{ width: '100%', maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
                        </div>
                    </Card>
                </Col>
                <Col span={7}>
                    <Card hoverable style={{display: 'flex', justifyContent: 'center'}} onClick={() => setType("MAIN_FOOD")}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{display: 'flex', width: 70, height: 70, marginRight: 10, backgroundColor: "#F8DEBD", borderRadius: 10,
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <img alt="Icon" src={main_food_icon} style={{ width: 50, height: 50 }} />
                        </div>
                        <Meta title="Món chính" style={{marginLeft: 30}}/>
                        </div>
                        <div style={{ width: '100%', marginTop: 10 }}>
                            <img alt="Món chính" src={main_food} style={{ width: '100%', maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
                        </div>
                    </Card>
                </Col>
                <Col span={7}>
                    <Card hoverable style={{display: 'flex', justifyContent: 'center'}} onClick={() => setType("DRINK")}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{display: 'flex', width: 70, height: 70, marginRight: 10, backgroundColor: "#F8DEBD", borderRadius: 10,
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <img alt="Icon" src={drink_icon} style={{ width: 50, height: 50 }} />
                        </div>
                        <Meta title="Đồ uống" style={{marginLeft: 30}}/>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: 30 }}>
                            <img alt="Ảnh 1" src={drink1} style={{ width: '100%', height: 'auto', borderRadius: '50%', objectFit: 'cover' }} />
                            <img alt="Ảnh 2" src={drink2} style={{ width: '100%', height: 'auto', borderRadius: '50%', objectFit: 'cover' }} />
                            <img alt="Ảnh 3" src={drink3} style={{ width: '100%', height: 'auto', borderRadius: '50%', objectFit: 'cover' }} />
                            <img alt="Ảnh 4" src={drink4} style={{ width: '100%', height: 'auto', borderRadius: '50%', objectFit: 'cover' }} />
                        </div>
                    </Card>
                </Col>
            </Row>
            )}
            {type !== "" && (
                <div>
                <Col style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <span
                        style={{ fontSize: '18px', fontStyle: 'italic', color: colors.primary, cursor: 'pointer' }}
                        onClick={handleBackToType}
                    >
                        Quay lại
                    </span>
                </Col>
                <Row style={{ marginTop: '15px' }}>
                    {isLoading ? (
                        <Loading children={undefined} />
                    ) : items.length === 0 ? (
                        <Flex align="center" justify="center" style={{ fontSize: '30px' }}>
                            Không có sản phẩm nào
                        </Flex>
                    ) : (
                        <Row gutter={items.length >= 5 ? [10, 20] : [30, 20]} justify={items.length >= 5 ? 'space-between' : 'start'}>
                            {items.map((item, idx) => (
                                <Col key={idx} span={4}>
                                    <RestaurantItemCard item={item}/>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Row>

            </div>
            )}

                  
        </Flex>
    );
}
export default ListFood;