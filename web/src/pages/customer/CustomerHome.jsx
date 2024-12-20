import { Col, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import BodyInformation from '../../components/home/BodyInformation';
import IndicatorCard from '../../components/home/IndicatorCard';
import LeftHeader from '../../components/home/LeftHeader';
import colors from '../../constants/Colors';
import { ReducerCases } from '../../constants/ReducerCases';
import { useStateContext } from '../../context/StateContext';
import customerService from '../../services/customerService';
import { showErrorNotification } from '../../utils/commonUtils';
import Loading from '../../components/Loading';

const CustomerHome = () => {
    const [{ account }, dispatch] = useStateContext()
    const [customerInfo, setCustomerInfo] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            try {
                if (account && !customerInfo) {
                    setLoading(true)
                    const data = await customerService.getCustomerInfo(account.id);
                    setCustomerInfo(data);
                    dispatch({ type: ReducerCases.SET_PROFILE, payload: data });
                }
            } catch (error) {
                showErrorNotification("Lỗi", error.message)
            }
            finally {
                setLoading(false)
            }
        };

        fetchCustomerInfo();
    }, [account, dispatch, customerInfo]);

    // Get calories burned based on activity index
    const getCaloriesBurned = activity_index => {
        switch (activity_index) {
            case 0: return '1,800';
            case 1: return '2,000';
            case 2: return '2,400';
            case 3: return '2,800';
            case 4: return '3,000';
            default: return '1,800';
        }
    }

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
            value: getCaloriesBurned(customerInfo.activity_index),
            unit: 'kcal/day',
            type: 'Normal',
        },
    ] : [];

    // Handle change for the Select component
    const handleChange = async (value) => {
        if (account) {
            const response = await customerService.updateHealthGoal(account.id, value);
            setCustomerInfo(response.data);
        }
    };

    const handleChangeActivityIndex = async (value) => {
        if (account) {
            const response = await customerService.updateActivityIndex(account.id, value);
            setCustomerInfo(response.data);
        }
    }

    if (loading)
        return <Loading />

    return (
        <div style={{ height: '100%', overflowX: 'auto' }}> {/* Enable horizontal scrolling */}
            {customerInfo &&
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
                                    <IndicatorCard indicator={indicator} activity_index={customerInfo.activity_index} onChangeActivityIndex={handleChangeActivityIndex} />
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
                                value={customerInfo ? customerInfo.health_goal : ""}
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
                                Lượng calo hấp thụ gợi ý: {customerInfo ? `${customerInfo.suggested_calorie_intake} kcal` : 'Loading...'}
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
            }
        </div>
    );
};

export default CustomerHome;