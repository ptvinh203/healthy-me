import { Col, Row } from 'antd';
import React from 'react';

export default function PaymentCard({ cart }) {
    const total = cart.item.price * cart.quantity;

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
    };

    return (
        <Row style={{ padding: '10px 0'}}>
            <Col span={12} style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <img
                    style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 10 }}
                    src={cart.item.image}
                    alt={cart.item.name}
                />
                <strong>{cart.item.name}</strong>
            </Col>
            <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {formatPrice(cart.item.price)}đ
            </Col>
            <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cart.quantity}
            </Col>
            <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {formatPrice(total)}đ
            </Col>
        </Row>
    );
}
