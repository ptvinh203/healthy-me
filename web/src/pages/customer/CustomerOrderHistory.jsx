import { Button, Col, Row, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import OrderHistoryCard from '../../components/OrderHistoryCard'
import colors from '../../constants/Colors'
import orderService from '../../services/orderService'

function CustomerOrderHistory() {

    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            if (loading) return
            setLoading(true)

            try {
                const response = await orderService.getHistory()
                const { data, is_success } = response
                console.log(data)
                if (is_success) {
                    setOrders(data)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }


        }
        fetchOrders()
    }, [])

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
    };

    if (loading) {
        return (
            <div style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Spin size="large" />
            </div>
        )
    }
    return (
        <div style={{
            padding: '20px'
        }}>
            {/* List card */}
            <div style={{
                padding: '20px 10px',
                background: '#F1F1F1',
                borderRadius: '10px',
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 140px)'
            }}>
                <Row style={{ fontWeight: 'bold', marginBottom: 10 }}>
                    <Col span={12}>Món ăn</Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Giá</Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Số lượng</Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Tổng</Col>
                </Row>
                {orders.length > 0 ? (
                    orders.map((order, orderIndex) => (
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            margin: '10px 0',
                            padding: '10px'
                        }}>
                            <div>
                                {
                                    order.order_details.length > 0 ? (
                                        order.order_details.map((od, index) => {
                                            return (
                                                <OrderHistoryCard key={index} cart={od} />
                                            );
                                        })
                                    ) : null
                                }
                            </div>
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div><strong>Ngày đặt hàng: </strong>{order.created_at_formatted}</div>
                                <div>
                                    <Button type="primary" style={{ marginRight: '5px'}}>Xếp hạng</Button>
                                    <Button type="primary" style={{background: colors.warning, color: colors.textPrimary}}>Tổng thanh toán: {formatPrice(order.total_price)}đ</Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    )
}

export default CustomerOrderHistory