import { Card, Flex, Rate } from "antd";

export default function RestaurantItemCard({ item}) {

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
            <Flex vertical style={{ cursor: 'pointer' }} >
                <Flex vertical style={{ textAlign: 'center', position: 'relative' }}>
                    <img
                        alt="Item image"
                        src={item.image}
                        style={{ width: '100%', height: 'auto', borderRadius: '30px', aspectRatio: '4/3', marginBottom: '10px', objectFit: 'cover', objectPosition: 'center center' }}
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
                    <p style={{
                        fontSize: '16px',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 150
                    }}
                    >
                        {item.name}
                    </p>
                    <p style={{
                        textAlign: 'center',
                        margin: 0, 
                        width: '100%', 
                        fontSize: '14px',
                        marginTop: 10,
                    }}>
                        Lượng calo: {item.calo} kcal
                    </p>
                    <p style={{
                        textAlign: 'center',
                        margin: 0, 
                        width: '100%', 
                        fontSize: '14px',
                        marginTop: 10,
                    }}>
                        Thành phần chính: {item.ingredients.join(', ')}
                    </p>
                    
                </Flex>
            </Flex >
    )
}
