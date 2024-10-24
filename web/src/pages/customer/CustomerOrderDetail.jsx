import { Layout, Card, Rate, Button, Flex, Spin } from 'antd';
import orderIcon from '../../assets/svgs/orderDetail/order.svg';
import { useEffect, useState } from 'react';
import itemService from '../../services/itemService';
import ItemSearchHeader from '../../components/ItemSearchHeader';
import shoppingCartIcon from "../../assets/svgs/order/shoppingCartIcon.svg"
import { useParams } from 'react-router-dom';
import { handlePrice } from '../../utils/commonUtils';
import { useStateContext } from '../../context/StateContext';
import OrderItemCart from '../../components/OrderItemCart';

const { Content } = Layout;

function CustomerDetail() {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [{ recommendItems }] = useStateContext();

    useEffect(() => {
        const getItemInfo = async () => {
            try {
                const response = await itemService.getItemById(itemId);
                setItem(response?.data);
            } catch (error) {
                console.error('Failed to fetch item: ', error);
            }
        }
        getItemInfo()
    }, [itemId]);

    return (
        <Layout style={{ padding: '20px', overflowY: 'auto', height: '100%', backgroundColor: 'white' }}>
            {/* Search field and shopping cart icon */}
            <ItemSearchHeader icon={shoppingCartIcon} />
            {item ?
                <Content style={{ display: 'flex', flexDirection: 'row', height: '100%', backgroundColor: 'white', overflowY: 'auto' }}>
                    <div className='img'
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: "40%",
                            height: 'calc(100% - 50px)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 20,
                            minHeight: 200,
                            marginTop: 50,
                            border: '2px dashed #AFACAC',
                            backgroundColor: 'whitesmoke',
                            borderRadius: 35,
                        }}>
                        <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', borderRadius: 35 }} />
                    </div>
                    <Card
                        style={{
                            width: "60%",
                            height: '100%',
                            marginLeft: "30px",
                            borderRadius: 35,
                            backgroundColor: 'whitesmoke',
                            border: '2px solid #3A8EF6',
                        }}
                        title={
                            <div style={{ padding: "20px 10px" }}>
                                <h2 style={{ margin: 0 }}>{item.name}</h2>
                                <p style={{ margin: 0, color: '#3A8EF6', fontSize: '16px' }}>{handlePrice(item.price)}</p>
                            </div>
                        }
                        extra={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Rate value={item.rating ?? 0} style={{ marginRight: '8px' }} disabled />
                            </div>
                        }
                        bodyStyle={{ padding: '0px 34px' }} // Chỉ áp dụng padding cho body
                    >
                        <p style={{ width: '80%', height: '100px' }}>
                            {item.description}
                        </p>
                        <p style={{ padding: '10px 0px' }}>Tên nhà hàng/quán ăn: {item.restaurant.account.name}</p>
                        <p style={{ padding: '10px 0px' }}>Lượng calo: {item.calo} kcal</p>
                        <p style={{ padding: '10px 0px' }}>Thành phần chính: {item.ingredients.join(', ')}</p>
                        <div className='order' style={{ display: 'flex', flexDirection: 'row', height: 50, alignItems: 'center' }}>
                            <div className='quantity' style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 80,
                                height: 45,
                                border: '1px solid #3A8EF6',
                                marginLeft: 10,
                                color: '#969AA0',
                                fontSize: 20
                            }}
                            >1</div>
                            <Button type="primary" style={{ borderRadius: 0, width: 80, height: 45, marginLeft: 10 }}>Mua</Button>
                            <Button type="primary" style={{ borderRadius: 0, height: 45, marginLeft: 10 }}>
                                Thêm vào giỏ hàng
                                <img src={orderIcon} style={{ width: 20, height: 20 }} />
                            </Button>
                        </div>
                        <p style={{ marginTop: 18, fontWeight: 600, fontSize: 18 }}>Giải pháp thay thế bạn có thể thử</p>
                        <div
                            style={{
                                padding: '5px 0',
                                overflowX: 'auto',
                                whiteSpace: 'nowrap',
                                scrollbarWidth: 'thin', // For Firefox
                                scrollbarColor: '#666666 transparent', // For Firefox
                                display: 'flex',
                                gap: '10px',
                            }}
                            className="scrollable-container"
                        >
                            {(recommendItems ?? []).map((item, index) => (
                                <div key={index} style={{ maxWidth: '160px' }} onClick={() => setItem(null)}>
                                    <OrderItemCart item={item} isShowNameOnly={true} />
                                </div>
                            ))}
                        </div>
                    </Card>
                </Content>
                : <Flex justify='center' align="center" style={{ height: '100%', width: '100%' }}>
                    <Spin size="large" />
                </Flex>
            }
        </Layout>
    );
}
export default CustomerDetail;