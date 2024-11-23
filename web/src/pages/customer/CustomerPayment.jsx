import { Button, Col, Flex, Input, message, Row } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import shoppingCartIcon from "../../assets/images/grocery_store.png"
import ItemSearchHeader from "../../components/ItemSearchHeader";
import Loading from "../../components/Loading";
import OrderItemCart from "../../components/OrderItemCart";
import PaymentCard from "../../components/PaymentCard";
import colors from "../../constants/Colors";
import customerService from "../../services/customerService";
import orderService from "../../services/orderService";
import { searchItems } from "../../services/searchService";
import shoppingCartService from "../../services/shoppingCartService";

export default function CustomerPayment() {
    const { state } = useLocation();
    const { selectedCartIds } = state || {};
    const navigate = useNavigate();

    const [carts, setCarts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [loading, setLoading] = useState(true);
    const [updatingAddress, setUpdatingAddress] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);

    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isShowSearchResults, setIsShowSearchResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!selectedCartIds || selectedCartIds.length === 0) {
            message.warning("No carts selected.");
            setLoading(false);
            return;
        }
        console.log('selectedCartIds', selectedCartIds);
    }, [selectedCartIds]);

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const cartData = await Promise.all(
                    selectedCartIds.map(cartId => shoppingCartService.getShoppingCartById(cartId))
                );
                const cartsArray = cartData.map(response => response.data);
                setCarts(cartsArray);

                const calculatedTotal = cartsArray.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
                setTotalPrice(calculatedTotal);
            } catch (error) {
                console.log("Error fetching cart details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedCartIds && selectedCartIds.length > 0) {
            fetchCartDetails();
        }
    }, [selectedCartIds]);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const addressData = await customerService.getCustomerAddress();
                if (addressData) {
                    setAddress(addressData);
                    setNewAddress(addressData);
                } else {
                    setAddress('');
                    setNewAddress('');
                }
            } catch (error) {
                console.error("Error fetching address:", error);
            }
        }

        fetchAddress();
    }, []);

    const handleAddressChange = (e) => {
        setNewAddress(e.target.value);
    };

    const updateAddress = async () => {
        if (newAddress?.trim().length <= 10) {
            message.error("Địa chỉ phải dài hơn 10 ký tự.");
            return;
        }

        if (newAddress?.trim() === address) {
            message.info("Địa chỉ chưa thay đổi.");
            return;
        }

        setUpdatingAddress(true);
        try {
            await customerService.updateCustomerAddress({ address: newAddress.trim() });
            setAddress(newAddress.trim());
            message.success("Địa chỉ đã được cập nhật thành công!");
        } catch (error) {
            console.error("Error updating address:", error);
            message.error("Cập nhật địa chỉ thất bại.");
        } finally {
            setUpdatingAddress(false);
        }
    };

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
    };

    const handleOrder = async () => {
        if (!newAddress) {
            message.warning("Địa chỉ nhận hàng không được để trống!");
            return
        }

        if (carts.length === 0) {
            message.warning("Giỏ hàng trống. Không thể đặt hàng.");
            return;
        }

        const orderDetails = {
            address: newAddress.trim(),
            items: carts.map(cart => ({
                item_id: cart.item.id,
                quantity: cart.quantity,
            })),
        }

        console.log("Order details being sent:", orderDetails);

        try {
            setOrderLoading(true);
            await orderService.placeOrder(orderDetails);
            message.success("Đặt hàng thành công!");
            navigate("/cus/order-success")
        } catch (error) {
            console.error("Error placing order:", error);
            message.error("Đặt hàng thất bại.");
        } finally {
            setOrderLoading(false)
        }
    };

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
        <div style={{
            display: "flex",
            flexDirection: 'column',
            padding: 20,
            gap: 10,
            height: '100%',
            overflowY: 'auto',
        }}>
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
                    {/* Address */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px 10px',
                        background: '#d9d9d9'
                    }}>
                        <strong style={{ width: '200px' }}>Địa chỉ giao hàng</strong>
                        <Input
                            placeholder="Nhập địa chỉ của bạn"
                            value={newAddress}
                            onChange={handleAddressChange}
                            style={{
                                border: 0,
                                boxShadow: `0 2px 4px ${colors.shadow}`,
                                flex: 1,
                            }}
                        />
                        <Button
                            type="primary"
                            onClick={updateAddress}
                            loading={updatingAddress}
                            disabled={newAddress.trim() === address || newAddress.trim().length <= 10}
                            style={{
                                minWidth: 100,
                                borderRadius: 8,
                                background: '#65A7FB',
                                borderColor: '#65A7FB',
                                color: 'white'
                            }}
                        >
                            Thay đổi
                        </Button>
                    </div>

                    {/* List card */}
                    <div style={{
                        padding: '20px 10px',
                        background: '#d9d9d9',
                    }}>
                        <Row style={{ fontWeight: 'bold', marginBottom: 10 }}>
                            <Col span={12}>Món ăn</Col>
                            <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Giá</Col>
                            <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Số lượng</Col>
                            <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Tổng chi phí</Col>
                        </Row>
                        {carts.length > 0 ? (
                            carts.map((cart, index) => (
                                <PaymentCard key={index} cart={cart} />
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: 20 }}>Không có sản phẩm nào trong giỏ hàng.</div>
                        )}
                    </div>

                    {/* Ship method */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px 10px',
                        background: '#d9d9d9'
                    }}>
                        <strong>Phương thức vận chuyển</strong>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: `0 2px 4px ${colors.shadow}`,
                            padding: 10,
                            background: 'white',
                            borderRadius: 8
                        }}>
                            Giao hàng tiêu chuẩn
                        </div>
                    </div>

                    {/* Payment method */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px 10px',
                        background: '#d9d9d9',
                        gap: 20,
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <strong>Phương thức thanh toán</strong>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: `0 2px 4px ${colors.shadow}`,
                                padding: 10,
                                background: 'white',
                                borderRadius: 8
                            }}>
                                Thanh toán khi nhận hàng (COD)
                            </div>
                        </div>
                        <div style={{
                            color: colors.grayDark
                        }}>
                            Nhập vào xác nhận tức là bạn đồng ý tất cả điều khoản và điều kiện
                        </div>
                    </div>

                    {/* Ship method */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px 10px',
                        background: '#d9d9d9'
                    }}>
                        <strong>Phương thức thanh toán</strong>
                        <Button type="primary" onClick={handleOrder} style={{ borderRadius: 8 }} loading={orderLoading}>
                            Đặt hàng - {formatPrice(totalPrice)} đ
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
