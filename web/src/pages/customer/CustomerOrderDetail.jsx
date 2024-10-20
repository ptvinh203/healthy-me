import React,{ useRef } from 'react';
import { Layout, Input, Card, Rate, Button, Menu } from 'antd';
import searchIcon from '../../assets/svgs/orderDetail/search.svg';
import cartIcon from '../../assets/svgs/orderDetail/cart.svg';
import orderIcon from '../../assets/svgs/orderDetail/order.svg';

const { Header, Content, Footer } = Layout;

const { Meta } = Card;
const items = [
    {
      key: '1',
      name: 'Pizza',
      imgSrc: 'https://cdn.vietnammoi.vn/2019/7/30/photo-1-1564468678230886257026.jpg',
    },
    {
      key: '2',
      name: 'Burger',
      imgSrc: 'https://cdn.vietnammoi.vn/2019/7/30/photo-1-1564468678230886257026.jpg',
    },
    {
      key: '3',
      name: 'Salad',
      imgSrc: 'https://cdn.vietnammoi.vn/2019/7/30/photo-1-1564468678230886257026.jpg',
    },
    {
      key: '4',
      name: 'Pasta',
      imgSrc: 'https://cdn.vietnammoi.vn/2019/7/30/photo-1-1564468678230886257026.jpg',
    },
    {
        key: '5',
        name: 'Pasta',
        imgSrc: 'https://cdn.vietnammoi.vn/2019/7/30/photo-1-1564468678230886257026.jpg',
      },
      {
        key: '6',
        name: 'Pasta',
        imgSrc: 'https://cdn.vietnammoi.vn/2019/7/30/photo-1-1564468678230886257026.jpg',
      },
      {
        key: '6',
        name: 'Pasta',
        imgSrc: 'https://cdn.vietnammoi.vn/2019/7/30/photo-1-1564468678230886257026.jpg',
      },
      {
        key: '7',
        name: 'Pasta',
        imgSrc: 'https://cdn.vietnammoi.vn/2019/7/30/photo-1-1564468678230886257026.jpg',
      },
      {
        key: '8',
        name: 'Pasta',
        imgSrc: 'https://cdn.vietnammoi.vn/2019/7/30/photo-1-1564468678230886257026.jpg',
      },
      {
        key: '9',
        name: 'Pasta',
        imgSrc: 'https://cdn.vietnammoi.vn/2019/7/30/photo-1-1564468678230886257026.jpg',
      },
      {
        key: '10',
        name: 'Pasta',
        imgSrc: 'https://cdn.vietnammoi.vn/2019/7/30/photo-1-1564468678230886257026.jpg',
      },
  ];

function CustomerDetail() {

    return (
        <Layout style={{overflowY: 'auto',height: '100%'}}>
            <Header className="header" style={{ display: 'flex', width: "100%" , alignItems: 'center' , backgroundColor: 'white', position: 'relative', padding: 30}}>
                <Input.Search
                        placeholder="Tìm món ăn..."
                        style={{
                            width: 400,
                            borderRadius: '50px',
                            padding: '10px 20px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            border: 'none',
                            outline: 'none',
                        }}
                        enterButton={
                        <Button style={{ 
                            backgroundColor: '#1890ff', 
                            color: '#fff',
                            width: 40, 
                            height: 40 ,
                            borderRadius: '50%', 
                            marginLeft: '10px', 
                            padding: 0, 
                            background: 'linear-gradient(to right, #3A8EF6, #6F3AFA)'
                            }}>
                            <img src={searchIcon} style={{width: 20}} />
                        </Button>}
                        onSearch={(value) => console.log(value)} 
                        
                    />
                <img src={cartIcon} style={{width: 30, position: 'absolute', right: 20}} />
            </Header>
            <style>
                {`
                    .ant-input {
                        border: none;
                        
                    }
                    .ant-input-wrapper {
                        display: flex;
                        alignContent: center;
                        width: 320px;
                    }
                `}
            </style>
            <Content style={{ padding: '20px', display: 'flex', flexDirection: 'row',height: '600px', backgroundColor: 'white', overflowY: 'auto'}}>
                <div className='img' 
                    style={{
                        display: 'flex',
                        width: "40%", 
                        height: 400,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                        minHeight: 200,
                        marginTop: 50,
                        border: '2px dashed #AFACAC',
                        backgroundColor: 'whitesmoke',
                        borderRadius: 35,
                    }}>
                    <img src='https://cdn.vietnammoi.vn/2019/7/30/photo-1-1564468678230886257026.jpg' style={{width: '100%', height: '100%', borderRadius: 35}}/>
                </div>
                <Card
                    style={{
                        width: "60%", 
                        height: 580,
                        marginLeft: "50px", 
                        borderRadius: 35, 
                        backgroundColor: 'whitesmoke',
                        border: '2px solid #3A8EF6',
                    }}
                    title={
                        <div style={{ padding: "20px 10px" }}>
                        <h2 style={{ margin: 0 }}>Tên món ăn</h2>
                        <p style={{ margin: 0, color: '#3A8EF6', fontSize: '16px' }}>30.000 VND</p>
                        </div>
                    }
                    extra={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Rate defaultValue={4} style={{ marginRight: '8px' }} />
                        </div>
                    }
                    bodyStyle={{ padding: '0px 34px' }} // Chỉ áp dụng padding cho body
                >
                    <p style={{ width: '80%', height: '100px' }}>
                    Chăm sóc bệnh nhân là quan trọng, bệnh nhân sẽ được bệnh nhân theo dõi, nhưng đồng thời sẽ có rất nhiều công việc và đau đớn. Để đi đến từng chi tiết nhỏ nhất, không ai có thể thực hiện bất kỳ loại công việc nào ngoại trừ
                    </p>
                    <p style={{padding: '10px 0px'}}>Tên nhà hàng/ quán ăn</p>
                    <p style={{padding: '10px 0px'}}>Lượng calo</p>
                    <p style={{padding: '10px 0px'}}>Thành phần chính: </p>
                    <div className='order' style={{display: 'flex', flexDirection: 'row', height: 50, alignItems: 'center'}}>
                        <div className='quantity' style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 80, 
                            height: 45,
                            border: '1px solid #3A8EF6', 
                            marginLeft: 10, 
                            color: '#969AA0', 
                            fontSize: 20}}
                            >1</div>
                        <Button type="primary" style={{borderRadius: 0,width: 80, height: 45,marginLeft: 10}}>Mua</Button>
                        <Button type="primary" style={{borderRadius: 0, height: 45, marginLeft: 10}}>
                            Thêm vào giỏ hàng
                            <img src={orderIcon} style={{width: 20, height: 20}} />
                        </Button>
                    </div>
                    <p style={{marginTop: 10, fontWeight: 600, fontSize: 18}}>Giải pháp thay thế bạn có thể thử</p>
                    <div
                        style={{
                            padding: '5px 0',
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                            scrollbarWidth: 'thin', // For Firefox
                            scrollbarColor: '#666666 transparent', // For Firefox
                        }}
                        className="scrollable-container"
                        >
                        {items.map((item, index) => (
                            <Card
                            key={index}
                            hoverable
                            style={{
                                width: 110,
                                display: 'inline-block',
                                marginRight: '20px',
                            }}
                            cover={<img alt={item.name} src={item.imgSrc} />}
                            bodyStyle={{ display: 'flex',justifyContent: 'center' , backgroundColor: '#EDEDED', padding: 0 }} // Chỉnh màu nền của body
                            >
                            <Meta title={item.name} />
                            </Card>
                        ))}
                    </div>
                </Card>
            </Content>
        </Layout>
    );
}

export default CustomerDetail;