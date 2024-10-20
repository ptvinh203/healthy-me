/* eslint-disable react/prop-types */
import { Button, Card, Flex, Rate } from "antd";

export default function OrderItemCart({ item, onOrder, onItemClick }) {

    const handlePrice = (price) => {
        return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }

    return (
        (item === undefined || item === null) ?
            <Card
                loading={true}
                hoverable
                style={{
                    borderRadius: '30px',
                    width: '100%',
                    aspectRatio: '1/1'
                }}
            ></Card> :
            <Flex vertical style={{ cursor: 'pointer' }} onClick={onItemClick}>
                <Flex vertical style={{ textAlign: 'center', position: 'relative' }}>
                    <img
                        alt="Item image"
                        src={item.image}
                        style={{ borderRadius: '30px', aspectRatio: '4/3', marginBottom: '10px' }}
                    />
                    <Rate
                        style={{
                            position: 'absolute',
                            bottom: '8px',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        disabled
                        value={item?.rating ?? 5}
                    />
                </Flex>
                <Flex gap={4} vertical align="center">
                    <p style={{ fontSize: '16px' }}>{item.name}</p>
                    <p style={{ fontSize: '16px', textAlign: 'center' }}>{item.restaurant.account.name}</p>
                    <p style={{ fontSize: '16px', textAlign: 'center', color: '#FFCA42', fontWeight: 'bold' }}>{handlePrice(item.price)}</p>
                    <Button
                        style={{ border: '1px solid #FFCA42', fontSize: '19px' }}
                        type="text"
                        onClick={onOrder}
                    >Đặt món</Button>
                </Flex>
            </Flex >
    )
}