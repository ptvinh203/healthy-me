import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Modal, Button, Checkbox, Col, Flex, Row } from "antd";
import ItemSearchHeader from "../../components/ItemSearchHeader";
import colors from "../../constants/Colors";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, ExclamationCircleOutlined, HomeTwoTone, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import "../../assets/css/ant_checkbox.css";
import { handlePrice, showErrorNotification, showInfoNotification } from "../../utils/commonUtils";
import shoppingCartService from "../../services/shoppingCartService";
import { searchItems } from '../../services/searchService';
import shoppingCartIcon from "../../assets/images/grocery_store.png"
import OrderItemCart from "../../components/OrderItemCart";

export default function CustomerShoppingCart() {
    const [modal, modalContextHolder] = Modal.useModal();
    const [carts, setCarts] = useState(null);
    const [selectedCartIds, setSelectedCartIds] = useState([]);
    const checkAll = (carts?.length ?? 0) !== 0 && selectedCartIds.length === carts?.length;
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowSearchResults, setIsShowSearchResults] = useState(false);
    const [loadCart, setLoadCart] = useState(false);

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const response = await shoppingCartService.getShoppingCarts();
                setCarts(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        if ((carts?.length ?? 0) <= 0) fetchCarts();
    }, [carts]);

    const handleOrder = () => {
        if (selectedCartIds.length > 0) {
            navigate('/cus/payment', { state: { selectedCartIds } })
        } else {
            showInfoNotification("Chưa chọn món ăn nào", "Vui lòng chọn ít nhất một món ăn để đặt hàng")
        }
    }

    const handleDeleteCart = (cart) => {
        modal.confirm({
            title: 'Xác nhận xóa',
            icon: <ExclamationCircleOutlined />,
            centered: true,
            content: 'Bạn có chắc chắn muốn xóa món ăn này khỏi giỏ hàng?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk() {
                shoppingCartService.deleteShoppingCart(cart.id)
                    .then(() => { setCarts(carts.filter((c) => c.id !== cart.id));
                        setLoadCart(!loadCart);
                     })
                    .catch((error) => { showErrorNotification("Xóa thất bại", error.message); })
                    .finally(() => {setLoadCart(!loadCart); });
            }
        });
    }

    const increaseQuantity = (cart) => {
        if (!cart) return
        shoppingCartService.updateShoppingCart(cart.id, { item_id: cart.item.id, quantity: cart.quantity + 1 })
            .then(() => {
                setCarts(carts.map((c) => {
                    if (c.id === cart.id && c.quantity + 1 < 100) {
                        return { ...c, quantity: c.quantity + 1 }
                    }
                    return c
                }))
            })
            .catch((error) => { showErrorNotification("Cập nhật thất bại", error.message); })

    }

    const decreaseQuantity = (cart) => {
        if (!cart) return
        shoppingCartService.updateShoppingCart(cart.id, { item_id: cart.item.id, quantity: cart.quantity - 1 })
            .then(() => {
                setCarts(carts.map((c) => {
                    if (c.id === cart.id && c.quantity - 1 > 0) {
                        return { ...c, quantity: c.quantity - 1 }
                    }
                    return c
                }))
            })
            .catch((error) => { showErrorNotification("Cập nhật thất bại", error.message); })

    }

    const onCheckAllChange = (e) => {
        setSelectedCartIds(e.target.checked ? carts.map((cart) => cart.id) : [])
    };

    const onCheckCartChange = (cart) => {
        if (selectedCartIds.includes(cart.id)) {
            setSelectedCartIds(selectedCartIds.filter((id) => id !== cart.id))
        }
        else {
            setSelectedCartIds([...selectedCartIds, cart.id])
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
        <Flex vertical justify='space-between' style={{ height: '100%', width: '100%', padding: 20 }}>

            <ItemSearchHeader
                icon={shoppingCartIcon}
                onItemSearch={handleSearch}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                loadCart = {loadCart}
            />
            <Flex style={{ height: "100%", width: "100%", justifyContent: "flex-start" }} vertical>
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
            </Flex>
            {!isShowSearchResults && (
                <>
                    <Flex vertical gap={12} style={{ height: 'calc(100% - 75px)', width: '100%', border: '1px solid black', borderRadius: 12, padding: 10 }}>

                        {/* Titles */}
                        <Row>
                            <Col span={5} style={{ fontSize: 20 }}><Flex justify="center">Món ăn</Flex></Col>
                            <Col span={5} style={{ fontSize: 20 }}><Flex justify="center">Giá</Flex></Col>
                            <Col span={5} style={{ fontSize: 20 }}><Flex justify="center">Số lượng</Flex></Col>
                            <Col span={5} style={{ fontSize: 20 }}><Flex justify="center">Tổng giá</Flex></Col>
                            <Col span={4} style={{ fontSize: 20 }}><Flex justify="center">Xóa</Flex></Col>
                        </Row>


                        {/* Carts */}
                        <Flex vertical justify={carts?.length == 0 ? 'center' : 'start'} gap={12} style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
                            {carts?.length > 0
                                ? carts.map((cart, index) =>
                                    // Cart detail
                                    <Flex key={index} vertical gap={12} style={{ padding: 12, borderRadius: 16, border: '1px solid black' }}>
                                        <Flex justify="start" align='center' gap={12} style={{ cursor: 'pointer', fontSize: 18 }}>
                                            <HomeTwoTone style={{ fontSize: 20 }} />
                                            <p
                                                style={{
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {cart.item.restaurant.account.name}
                                            </p>
                                        </Flex>
                                        <Row>
                                            <Col span={5} style={{ fontSize: 20 }}>
                                                <Checkbox
                                                    onChange={() => onCheckCartChange(cart)}
                                                    checked={(selectedCartIds ?? []).includes(cart.id)}
                                                    style={{ fontSize: 20, height: '100%', display: 'flex', alignItems: 'center' }}
                                                >
                                                    <Flex justify="center" align="center" style={{ width: '100%' }}>
                                                        <img
                                                            alt={cart.item.name}
                                                            src={cart.item.image}
                                                            style={{
                                                                height: 85,
                                                                aspectRatio: '1/1',
                                                                objectFit: 'cover',
                                                                objectPosition: 'center',
                                                                borderRadius: 10,
                                                                margin: '0px 8px'
                                                            }}
                                                        />
                                                        <p
                                                            style={{
                                                                overflow: 'hidden',
                                                                whiteSpace: 'nowrap',
                                                                textOverflow: 'ellipsis',
                                                                maxWidth: '230px'
                                                            }}
                                                        >
                                                            {cart.item.name}
                                                        </p>
                                                    </Flex>
                                                </Checkbox>
                                            </Col>
                                            <Col span={5} style={{ fontSize: 20 }}>
                                                <Flex justify="center" align="center" style={{ height: '100%' }}>{handlePrice(cart.item.price)}</Flex>
                                            </Col>
                                            <Col span={5}>
                                                <Row justify="center" align="center" style={{ height: '100%', width: '100%' }}>
                                                    <Col span={8} style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', fontSize: 20 }}>
                                                        <Button type="text" onClick={() => decreaseQuantity(cart)}>
                                                            <MinusOutlined />
                                                        </Button>
                                                    </Col>
                                                    <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20 }}>
                                                        {cart.quantity}
                                                    </Col>
                                                    <Col span={8} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: 20 }}>
                                                        <Button type="text" onClick={() => increaseQuantity(cart)}>
                                                            <PlusOutlined />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={5} style={{ fontSize: 20 }}>
                                                <Flex justify="center" align="center" style={{ height: '100%' }}>{handlePrice(cart.item.price * cart.quantity)}</Flex>
                                            </Col>
                                            <Col span={4} style={{ fontSize: 20 }}>
                                                <Flex justify="center" align="center" style={{ height: '100%' }}>
                                                    <Button type="text" onClick={() => handleDeleteCart(cart)}>
                                                        <DeleteOutlined style={{ fontSize: 30 }} />
                                                    </Button>
                                                </Flex>
                                            </Col>
                                        </Row>
                                    </Flex>
                                )
                                : carts?.length == 0
                                    ? <div style={{ fontSize: 30, textAlign: 'center' }}>Giỏ hàng trống</div>
                                    : <Loading />}
                        </Flex>

                        {/* Footer */}
                        <Flex align="center" justify='space-between' style={{ width: '100%', padding: '12px 18px', borderRadius: 16, backgroundColor: colors.border, fontSize: 20 }}>
                            <Checkbox onChange={onCheckAllChange} checked={checkAll} disabled={!carts} style={{ fontSize: 20 }}>
                                <p style={{ marginLeft: 8 }}>Chọn tất cả</p>
                            </Checkbox>
                            <Flex gap={100} align="center">
                                <div>
                                    <span style={{ marginRight: 30 }}>Tổng tiền:</span>
                                    <span>
                                        {handlePrice(
                                            carts
                                                ?.filter(cart => selectedCartIds.includes(cart.id))
                                                ?.reduce((sum, cart) => sum + cart.item.price * cart.quantity, 0)
                                            ?? 0
                                        )}
                                    </span>
                                </div>
                                <Button
                                    type='primary' size="large" style={{ backgroundColor: colors.highlight, color: 'black' }}
                                    onClick={handleOrder}
                                >
                                    Đặt hàng
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </>
            )}
            {modalContextHolder}
        </Flex >
    )
}