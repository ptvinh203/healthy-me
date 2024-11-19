import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {
    const navigate = useNavigate();

    return (
        <Result
            status="success"
            title="Đặt hàng thành công!"
            subTitle="Hãy chú ý điện thoại của bạn, đơn hàng của bạn sẽ được tài xế giao sớm nhất."
            extra={[
                <Button key="buy" onClick={() => navigate('/cus/order')}>Mua thêm</Button>,
            ]}
        />
    )
}

export default OrderSuccess
