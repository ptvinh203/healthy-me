import { Col, Divider, Row } from 'antd';
import React from 'react';

export default function OrderHistoryCard({ cart }) {
    const { amount, image, item_id, item_name, price, restaurant } = cart;
    const total = price * amount;

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
    };

    return (
        <div style={{
            borderRadius: '10px',
            marginBottom: '10px',
            padding: '6px',
            backgroundColor: '#fff',
        }}>
            <div style={{ fontWeight: '500', marginBottom: '10px' }}>
                {restaurant?.account?.name || ''}
            </div>
            <Row style={{ padding: '10px 0' }}>
                <Col span={12} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <img
                        style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 10 }}
                        src={image}
                        alt={item_name}
                    />
                    <strong>{item_name}</strong>
                </Col>
                <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {formatPrice(price)}đ
                </Col>
                <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {amount}
                </Col>
                <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {formatPrice(total)}đ
                </Col>
            </Row>
            <Divider />
        </div>
    );
}
