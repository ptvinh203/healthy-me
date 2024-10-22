import { Col, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import BodyInformation from '../../components/home/BodyInformation';
import IndicatorCard from '../../components/home/IndicatorCard';
import LeftHeader from '../../components/home/LeftHeader';
import colors from '../../constants/Colors';
import { useStateContext } from '../../context/StateContext';
import customerService from '../../services/customerService';

const CustomerHome = () => {
    const [{ profile }] = useStateContext();
    const [customerInfo, setCustomerInfo] = useState(null);

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            if (profile && profile.id) {
                try {
                    const response = await customerService.getCustomerInfo(profile.id);
                    console.log(response.data);
                    setCustomerInfo(response.data);
                } catch (error) {
                    console.error('Error fetching customer info:', error);
                }
            }
        };

        fetchCustomerInfo();
    }, [profile]);

    const handleHealthGoalChange = async (value) => {
        if (profile && profile.id) {
            try {
                const response = await customerService.updateHealthGoal(profile.id, value);
                console.log(response.data);
                setCustomerInfo(response.data);
            } catch (error) {
                console.error('Error updating health goal:', error);
            }
        }
    };

    const indicators = customerInfo ? [
        {
            name: 'Đường huyết',
            value: customerInfo.blood_glucose,
            unit: 'mg/dL',
            type: 'Normal',
        },
        {
            name: 'Nhịp tim',
            value: customerInfo.heart_rate,
            unit: 'bpm',
            type: 'Normal',
        },
        {
            name: 'Huyết áp',
            value: customerInfo.blood_pressure,
            unit: 'mmHg',
            type: 'Normal',
        },
        {
            name: 'Lượng calo hấp thụ',
            value: customerInfo.calories_consumed,
            unit: 'kcal/day',
            type: 'Normal',
        },
        {
            name: 'Lượng calo đốt cháy',
            value: customerInfo.calories_burned,
            unit: 'kcal/day',
            type: 'Normal',
        },
    ] : [];

    // Handle change for the Select component
    const handleChange = (value) => {
        console.log(`Selected: ${value}`);
        handleHealthGoalChange(value);
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
                            value={customerInfo ? customerInfo.healthGoal : ""}
                            style={{
                                width: 240,
                                border: 'none',
                                color: 'white'
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'LOSE',
                                    label: 'Giảm cân',
                                },
                                {
                                    value: 'GAIN',
                                    label: 'Tăng cân',
                                },
                                {
                                    value: 'MAINTAIN',
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
                            Lượng calo tiêu thụ gợi ý: {customerInfo ? `${customerInfo.suggested_calorie_intake} kcal` : 'Loading...'}
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
                    <BodyInformation customerInfo={customerInfo} />
                </Col>
            </Row>
        </div>
    );
};

export default CustomerHome;