import { Button, Col, Flex, Input, Row } from "antd";
import searchIcon from '../assets/svgs/orderDetail/search.svg';
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ItemSearchHeader({ icon, onItemSearch, value, onChange }) {
    const navigate = useNavigate();

    return (
        <Row justify='space-between' align='middle'>
            <Col xs={{ span: 21 }} md={{ span: 10 }}>
                <Flex
                    align='center'
                    justify='center'
                    style={{ padding: '6px 15px', borderRadius: '30px', background: '#F9F7F7', boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)' }}
                >
                    <Input
                        placeholder="Tìm kiếm sản phẩm của bạn"
                        allowClear
                        size="large"
                        value={value}
                        onChange={onChange}
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
                <Col xs={{ span: 2 }} md={{ span: 2 }} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <img
                        src={icon} alt="icon"
                        style={{
                            height: '40px',
                            width: '40px',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/cus/cart')}
                    />
                </Col>
            )}
        </Row>
    );
}

