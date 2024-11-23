import { Button, Col, Flex, Input, Row } from "antd";
import searchIcon from '../assets/svgs/orderDetail/search.svg';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import shoppingCartService from "../services/shoppingCartService";

export default function ItemSearchHeader({ icon, onItemSearch, value, onChange, placeholder, loadCart = false }) {
    const navigate = useNavigate();
    const [cartQuantitys, setCartQuantitys] = useState(0);

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const response = await shoppingCartService.getShoppingCarts();
                setCartQuantitys(response.data.length);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCarts();
    }, [loadCart]);

    return (
        <Row justify='space-between' align='middle'>
            <Col xs={{ span: 21 }} md={{ span: 10 }}>
                <Flex
                    align='center'
                    justify='center'
                    style={{ padding: '6px 15px', borderRadius: '30px', background: '#F9F7F7', boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)' }}
                >
                    <Input
                        placeholder={placeholder ?? "Tìm kiếm sản phẩm của bạn"}
                        allowClear
                        size="large"
                        value={value}
                        onChange={onChange}
                        onPressEnter={onItemSearch}
                        style={{ border: 'none', boxShadow: 'none', backgroundColor: '#F9F7F7' }}
                    />
                    <Button
                        style={{
                            backgroundColor: '#1890ff',
                            color: '#fff',
                            width: '40px',
                            height: '40px',
                            borderRadius: '40px',
                            marginLeft: '10px',
                            padding: 0,
                            background: 'linear-gradient(to right, #3A8EF6, #6F3AFA)',
                        }}
                        onClick={onItemSearch}
                    >
                        <img src={searchIcon} style={{ width: '20px', height: '20px' }} />
                    </Button>
                </Flex>
            </Col>
            {icon && (
                <Col xs={{ span: 2 }} md={{ span: 2 }} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', position: 'relative' }}>
                    <img
                        src={icon} alt="icon"
                        style={{
                            height: '40px',
                            width: '40px',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/cus/cart')}
                    />

                    {/* Div hình tròn */}
                    {cartQuantitys > 0 && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '-5px', // Đẩy lên phía trên icon
                                right: '-5px', // Đẩy sang phải icon
                                height: '20px', // Kích thước hình tròn
                                width: '20px',
                                backgroundColor: '#FF5733', // Màu nền của hình tròn
                                borderRadius: '50%', // Tạo hình tròn
                                color: 'white', // Màu chữ
                                fontSize: '12px', // Kích thước chữ
                                display: 'flex', // Dùng flex để căn giữa nội dung
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Hiệu ứng đổ bóng
                            }}
                        >
                            {cartQuantitys}
                        </div>
                    )}
                </Col>
            )}
        </Row>
    );
}

