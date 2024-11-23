import { Avatar, Card, Flex, Spin, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import restaurantOrderService from '../../services/restaurantOrderService';
import { formatPrice } from '../../utils/formatUtils';

const { Text } = Typography;

const RestaurantOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        page: 0,
        size: 10,
        status: null
    });

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await restaurantOrderService.getOrders(filters);
            console.log('Orders:', response);
            setOrders(response.content);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [filters]);

    const getStatusColor = (status) => {
        const statusColors = {
            'PENDING': '#faad14',
            'CONFIRMED': '#1890ff',
            'PREPARING': '#722ed1',
            'READY': '#52c41a',
            'DELIVERING': '#eb2f96',
            'COMPLETED': '#52c41a',
            'CANCELLED': '#ff4d4f'
        };
        return statusColors[status] || '#000000';
    };

    const renderOrderCard = (order) => (
        <Card
            key={order.id}
            style={{
                marginBottom: 16,
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                width: '100%'
            }}
        >
            <Flex vertical gap={16} style={{ width: '100%' }}>
                <Flex align="start" justify="space-between">
                    <Flex align="center" gap={16}>
                        <Avatar size={64} src={order.customerAvatar} />
                        <Flex vertical gap={4}>
                            <Text strong>{order.customerName}</Text>
                            <Text type="secondary">Số điện thoại: {order.customerPhone}</Text>
                            <Text type="secondary">
                                Tổng số món: {order.totalAmount}
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex vertical align="end" gap={8}>
                        <Text strong>
                            Tổng giá: {formatPrice(order.totalPrice)}
                        </Text>
                        <Text type="secondary">
                            Địa chỉ: {order.deliveryAddress}
                        </Text>
                        <Text type="secondary">
                            Thời gian đặt hàng: {order.createdAt}
                        </Text>
                    </Flex>

                    <Tag color={getStatusColor('READY')} style={{ color: 'white', fontWeight: '500' }}>
                        Đã đặt hàng
                    </Tag>
                </Flex>

                <div style={{
                    background: '#f5f5f5',
                    padding: '12px',
                    borderRadius: '6px'
                }}>
                    <Text strong style={{ marginBottom: '8px', display: 'block' }}>
                        Chi tiết đơn hàng:
                    </Text>
                    {order.orderDetails.map((item, index) => (
                        <Flex
                            key={index}
                            justify="space-between"
                            align="center"
                            style={{
                                marginBottom: index !== order.orderDetails.length - 1 ? '8px' : 0
                            }}
                        >
                            <Text>{item.item_name}</Text>
                            <Flex gap={24}>
                                <Text type="secondary">x{item.amount}</Text>
                            </Flex>
                        </Flex>
                    ))}
                </div>
            </Flex>
        </Card>
    );

    return (
        <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Flex justify="space-between" align="start" style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 24 }}>Danh sách đơn hàng</Text>
            </Flex>

            {loading ? (
                <Flex justify="center">
                    <Spin size="large" />
                </Flex>
            ) : (
                <div style={{ overflowY: 'auto', flex: 1 }}>
                    {orders.map(renderOrderCard)}
                </div>
            )}
        </div>
    );
};

export default RestaurantOrders;