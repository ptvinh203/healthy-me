import { useState, useEffect } from 'react';
import { Avatar, Card, Flex, Typography, Tag, Tooltip, DatePicker, Select, Spin } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import restaurantOrderService from '../../services/restaurantOrderService';
import colors from '../../constants/Colors';
import { formatDateTime, formatPrice } from '../../utils/formatUtils';
import { Navigate } from 'react-router-dom';

const { Text } = Typography;
const { RangePicker } = DatePicker;

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    page: 0,
    size: 10,
    status: null,
    fromDate: null,
    toDate: null
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await restaurantOrderService.getOrders(filters);
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

  const handleStatusChange = (value) => {
    setFilters(prev => ({ ...prev, status: value }));
  };

  const handleDateRangeChange = (dates) => {
    if (dates) {
      setFilters(prev => ({
        ...prev,
        fromDate: dates[0].format('YYYY-MM-DD'),
        toDate: dates[1].format('YYYY-MM-DD')
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        fromDate: null,
        toDate: null
      }));
    }
  };

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
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={16}>
          <Avatar size={64} src={order.customerAvatar} />
          <Flex vertical gap={4}>
            <Text strong>{order.customerName}</Text>
            <Text type="secondary">Số điện thoại: {order.phoneNumber}</Text>
            <Text type="secondary">
              Tổng số món: {order.totalItems}
            </Text>
            <Text type="secondary">
              Thời gian đặt hàng: {formatDateTime(order.orderTime)}
            </Text>
          </Flex>
        </Flex>

        <Flex vertical align="end" gap={8}>
          <Text strong>
            Tổng giá: {formatPrice(order.totalPrice)}
          </Text>
          <Text type="secondary">
            Địa chỉ: {order.address}
          </Text>
          <Text type="secondary">
            Thời gian giao hàng: {formatDateTime(order.deliveryTime)}
          </Text>
          <Tag color={getStatusColor(order.status)}>
            {order.status}
          </Tag>
        </Flex>

        <Tooltip title="Xem chi tiết">
          <InfoCircleOutlined 
            style={{ fontSize: 20, color: colors.primary, cursor: 'pointer' }}
            onClick={() => Navigate(`/restaurant/orders/${order.id}`)}
          />
        </Tooltip>
      </Flex>
    </Card>
  );

  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 24 }}>Danh sách đơn hàng</Text>
        
        <Flex gap={16}>
          <Select
            style={{ width: 200 }}
            placeholder="Trạng thái đơn hàng"
            allowClear
            onChange={handleStatusChange}
            value={'Chờ xác nhận'}
          />
          
          <RangePicker 
            onChange={handleDateRangeChange}
            format="DD/MM/YYYY"
          />
        </Flex>
      </Flex>

      {loading ? (
        <Flex justify="center">
          <Spin size="large" />
        </Flex>
      ) : (
        orders.map(renderOrderCard)
      )}
    </div>
  );
};

export default RestaurantOrders; 