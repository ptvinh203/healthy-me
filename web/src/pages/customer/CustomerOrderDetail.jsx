import { Layout, Card, Rate, Button, InputNumber, Row, Col, Flex } from 'antd';
import orderIcon from '../../assets/svgs/orderDetail/order.svg';
import { useEffect, useState } from 'react';
import itemService from '../../services/itemService';
import ItemSearchHeader from '../../components/ItemSearchHeader';
import shoppingCartIcon from "../../assets/svgs/order/shoppingCartIcon.svg"
import { useNavigate, useParams } from 'react-router-dom';
import { handlePrice, showErrorNotification, showSuccessNotification } from '../../utils/commonUtils';
import { useStateContext } from '../../context/StateContext';
import OrderItemCart from '../../components/OrderItemCart';
import Loading from '../../components/Loading';
import shoppingCartService from '../../services/shoppingCartService';
import { searchItems } from '../../services/searchService';
import colors from '../../constants/Colors';

const { Content } = Layout;

function CustomerDetail() {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [{ recommendItems }] = useStateContext();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowSearchResults, setIsShowSearchResults] = useState(false);
    const [addToCartLoading, setAddToCartLoading] = useState(false);
    const [buyItemLoading, setBuyItemLoading] = useState(false);

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

    const handleAddToCart = async () => {
        try {
            setAddToCartLoading(true)
            const { is_success } = await shoppingCartService.addShoppingCart({ item_id: itemId, quantity })
            if (is_success) {
                setQuantity(1)
                showSuccessNotification('Thêm vào giỏ hàng thành công')
            }
        } catch (error) {
            showErrorNotification(error.message)
        } finally {
            setAddToCartLoading(false)
        }
    }

    const handBuyItem = async () => {
        try {
            setBuyItemLoading(true)
            const { data } = await shoppingCartService.addShoppingCart({ item_id: itemId, quantity })
            if (data)
                navigate('/cus/payment', { state: { selectedCartIds: [data.id] } })
        } catch (error) {
            showErrorNotification(error.message)
        } finally {
            setBuyItemLoading(false)
        }
    }

    const handleSearch = () => {
        searchItems(query, setSearchResults, setIsLoading);
        if (searchResults) {
            setIsShowSearchResults(true);

        }
    };
    const handleBackToItems = () => {
        setIsShowSearchResults(false);
        setSearchResults([]);
    };

    return (
        <Layout style={{ padding: '20px', overflowY: 'auto', height: '100%', backgroundColor: 'white' }}>
            {/* Search field and shopping cart icon */}
            <ItemSearchHeader
                icon={shoppingCartIcon}
                onItemSearch={handleSearch}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {isShowSearchResults && (
                <div>
                    <Col style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <span
                            style={{ fontSize: '18px', fontStyle: 'italic', color: colors.primary, cursor: 'pointer' }}
                            onClick={handleBackToItems}
                        >
                            Quay lại
                        </span>
                    </Col>
                    <Row style={{ marginTop: '15px' }}>
                        {isLoading ? (
                            <Loading />
                        ) : searchResults.length === 0 ? (
                            <Flex align="center" justify="center" style={{ fontSize: '30px' }}>
                                Không có sản phẩm nào
                            </Flex>
                        ) : (
                            <Row gutter={searchResults.length >= 5 ? [10, 20] : [30, 20]} justify={searchResults.length >= 5 ? 'space-between' : 'start'}>
                                {searchResults.map((item, idx) => (
                                    <Col key={idx} span={4}>
                                        <OrderItemCart item={item} />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Row>

                </div>
            )}
            {!isShowSearchResults && (
                <>
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
                                    <InputNumber
                                        className='quantity'
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: 80,
                                            height: 45,
                                            border: '1px solid #3A8EF6',
                                            color: '#969AA0',
                                            fontSize: 20,
                                            borderRadius: 0
                                        }}
                                        min={1}
                                        max={100}
                                        value={quantity}
                                        onChange={(value) => setQuantity(value)}
                                    />
                                    <Button type="primary" style={{ borderRadius: 0, width: 80, height: 45, marginLeft: 10 }} onClick={handBuyItem} loading={buyItemLoading}>Mua</Button>
                                    <Button type="primary" style={{ borderRadius: 0, height: 45, marginLeft: 10 }} onClick={handleAddToCart} loading={addToCartLoading}>
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
                        : <Loading />
                    }
                </>
            )}
        </Layout>
    );
}
export default CustomerDetail;