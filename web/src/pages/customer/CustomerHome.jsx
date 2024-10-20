import { Col, Row, Select } from 'antd';
import BodyInformation from '../../components/home/BodyInformation';
import IndicatorCard from '../../components/home/IndicatorCard';
import LeftHeader from '../../components/home/LeftHeader';
import colors from '../../constants/Colors';

const CustomerHome = () => {
    const indicators = [
        {
            name: 'Đường huyết',
            value: 80,
            unit: 'mg/dL',
            type: 'Normal',
        },
        {
            name: 'Nhịp tim',
            value: 98,
            unit: 'bpm',
            type: 'Normal',
        },
        {
            name: 'Huyết áp',
            value: 102,
            unit: '/72 mmHg',
            type: 'Normal',
        },
        {
            name: 'Lượng calo hấp thụ',
            value: 1800,
            unit: 'kcal/day',
            type: 'Normal',
        },
        {
            name: 'Lượng calo đốt cháy',
            value: 1900,
            unit: 'kcal/day',
            type: 'Normal',
        },
    ];

    // Handle change for the Select component
    const handleChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    return (
        <div style={{ height: '100%', overflowX: 'auto' }}> {/* Enable horizontal scrolling */}
            <Row justify="space-between" style={{ height: '100%' }}>
                {/* Health overview */}
                <Col span={16} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                    {/* Header */}
                    <LeftHeader />

                    {/* Indicators card */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 20,
                            justifyContent: 'center',
                        }}
                    >
                        {indicators.map((indicator, index) => (
                            <div
                                key={index}
                                style={{
                                    flexBasis: 'calc(33.33% - 20px)',
                                    maxWidth: 'calc(33.33% - 20px)',
                                    minWidth: '200px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <IndicatorCard indicator={indicator} />
                            </div>
                        ))}
                    </div>

                    {/* Target */}
                    <div style={{
                        padding: 20,
                        display: 'flex',
                        gap: 100,
                        alignItems: 'center'
                    }}>
                        <span>Mục tiêu lành mạnh</span>
                        <Select
                            defaultValue=""
                            style={{
                                width: 240,
                                border: 'none',
                                color: 'white'
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'Giảm cân',
                                    label: 'Giảm cân',
                                },
                                {
                                    value: 'Tăng cân',
                                    label: 'Tăng cân',
                                },
                                {
                                    value: 'Duy trì cân nặng',
                                    label: 'Duy trì cân nặng',
                                },
                                {
                                    value: '',
                                    label: 'Chọn mục tiêu sức khoẻ',
                                    disabled: true,
                                },
                            ]}
                            dropdownStyle={{
                                backgroundColor: colors.grayMedium
                            }}
                        />
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <span style={{
                            backgroundColor: '#ccc',
                            padding: 8,
                            borderRadius: 10,
                            fontWeight: 500,
                            fontSize: '14px'
                        }}>
                            Lượng calo tiêu thụ gợi ý: 2323 - 2424 kcal
                        </span>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                    }}>
                        <i style={{
                            backgroundColor: 'white',
                            padding: '4px 10px',
                            borderRadius: 6,
                            color: colors.danger,
                            fontSize: '12px'
                        }}>
                            Vui lòng kiểm tra và điều chỉnh để đảm bảo nó phù hợp với mục tiêu sức khoẻ của bạn!
                        </i>
                    </div>
                </Col>

                {/* Body indices */}
                <Col span={8}>
                    <BodyInformation />
                </Col>
            </Row>
        </div>
    );
};

export default CustomerHome;
