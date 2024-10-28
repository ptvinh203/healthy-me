import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Button, Checkbox, Col, Flex, Row } from "antd";
import ItemSearchHeader from "../../components/ItemSearchHeader";
import colors from "../../constants/Colors";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import { ReducerCases } from "../../constants/ReducerCases";
import { DeleteOutlined, HomeTwoTone } from "@ant-design/icons";
import "../../assets/css/ant_checkbox.css";
import { handlePrice } from "../../utils/commonUtils";

export default function CustomerShoppingCart() {
    const [{ selectedCartIds }, dispatch] = useStateContext();
    const [goToPayment, setGoToPayment] = useState(false);
    const [carts, setCarts] = useState([]);
    const checkAll = (carts?.length ?? 0) !== 0 && selectedCartIds.length === carts.length;
    const navigate = useNavigate();

    useEffect(() => {
        console.log('CustomerShoppingCart useEffect', goToPayment);
        setCarts([
            {
                id: 1,
                name: "Nuoc chanh",
                price: 50000,
                quantity: 1,
                restaurant_name: "Nhà hàng 1",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQPpgLRrL9bKqzsKtMkWR_ggjPlVdWXh0kXQ&s"
            },
            {
                id: 2,
                name: "Mi ga Da Nang",
                price: 100000,
                quantity: 2,
                restaurant_name: "Nhà hàng 2",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlMyzfmXp2bWMGCMLw2JC4uXpXR1qEGTCBvw&s"
            },
        ]);

        return () => {
            // Reset selectedCartIds when leave page
            dispatch({
                type: ReducerCases.SET_SELECTED_CART_IDS,
                reset: true
            })
        }
    }, [dispatch, goToPayment]);

    const handleDeleteCart = (cart) => {
        console.log('Delete cart', cart);

    }

    const handleOrder = () => {
        setGoToPayment(true)
        navigate('/cus/payment')
    }

    const onCheckAllChange = (e) => {
        dispatch({
            type: ReducerCases.SET_SELECTED_CART_IDS,
            data: e.target.checked ? carts.map((cart) => cart.id) : []
        })
    };

    const onCheckCartChange = (cart) => {
        if (selectedCartIds.includes(cart.id)) {
            dispatch({
                type: ReducerCases.SET_SELECTED_CART_IDS,
                data: selectedCartIds.filter((id) => id !== cart.id)
            })
        }
        else {
            dispatch({
                type: ReducerCases.SET_SELECTED_CART_IDS,
                data: [...selectedCartIds, cart.id]
            })
        }

    };

    return (
        <Flex vertical justify='space-between' style={{ height: '100%', width: '100%', padding: 20 }}>
            <ItemSearchHeader />

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
                <Flex vertical gap={12} style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
                    {carts
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
                                        {cart.restaurant_name}
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
                                                    alt={cart.name}
                                                    src={cart.image}
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
                                                    {cart.name}
                                                </p>
                                            </Flex>
                                        </Checkbox>
                                    </Col>
                                    <Col span={5} style={{ fontSize: 20 }}>
                                        <Flex justify="center" align="center" style={{ height: '100%' }}>{handlePrice(cart.price)}</Flex>
                                    </Col>
                                    <Col span={5} style={{ fontSize: 20 }}>
                                        <Flex justify="center" align="center" style={{ height: '100%' }}>{cart.quantity}</Flex>
                                    </Col>
                                    <Col span={5} style={{ fontSize: 20 }}>
                                        <Flex justify="center" align="center" style={{ height: '100%' }}>{handlePrice(cart.price * cart.quantity)}</Flex>
                                    </Col>
                                    <Col span={4} style={{ fontSize: 20 }}>
                                        <Flex justify="center" align="center" style={{ height: '100%' }}>
                                            <DeleteOutlined style={{ cursor: 'pointer', fontSize: 30 }} onClick={() => handleDeleteCart(cart)} />
                                        </Flex>
                                    </Col>
                                </Row>
                            </Flex>
                        )
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
                                        .filter(cart => selectedCartIds.includes(cart.id))
                                        .reduce((sum, cart) => sum + cart.price * cart.quantity, 0)
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
        </Flex >
    )
}