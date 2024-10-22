import { Col, Divider, Progress, Row } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import BodyIcon from '../../assets/svgs/home/body.svg'
import LineIcon from '../../assets/svgs/home/line.svg'
import colors from '../../constants/Colors'

// Add this function at the top of your file, outside the BodyInformation component
const getTimeSinceLastCheck = (updatedAt) => {
  const lastCheck = new Date(updatedAt);
  const now = new Date();
  const diffTime = Math.abs(now - lastCheck);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} ngày trước`;
};

function BodyInformation({ customerInfo }) {

    const fourColors = {
        '0%': '#B5D4F1',
        '38%': '#81E5DB',
        '70%': '#E8D284',
        '100%': '#E2798E',
    }

    const BMIHardCode = [15, 20, 25, 30, 35]
    
    return (
        <div style={{
            backgroundColor: colors.darkBackground,
            borderRadius: 30,
            width: '100%',
            height: '100%',
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 20
        }}>

                {/* Header */}
                <Row style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <span style={{ color: 'white', fontSize: '16px' }}>Tính toán BMI</span>
                </Row>

                {/* Height, Width, BMI */}
                <Row style={{ padding: '20px 0'}}>
                    <Col span={10} style={{ height: '100%'}}>
                        {/* Height */}
                        <div style={{
                            background: '#F8DEBD',
                            padding: 8,
                            borderRadius: 8,
                            marginBottom: 10,
                            // height: '50%',
                            height: 'calc(50% - 5px)'
                        }}>
                            <Row style={{ justifyContent: 'flex-end'}}>
                                <img src={LineIcon} alt="Line" style={{ width: '60%', height: '100%' }} />
                            </Row>
                            <Row style={{ justifyContent: 'flex-start'}}>
                                <span style={{fontSize: '10px', padding: '6px 0'}}>Chiều cao {customerInfo.height} cm</span>
                            </Row>
                        </div>
                        {/* Width */}
                        <div style={{
                            background: '#D0FBFF',
                            padding: 8,
                            borderRadius: 8,
                            height: 'calc(50% - 5px)'
                        }}>
                            <Row style={{ justifyContent: 'flex-end'}}>
                                <img src={LineIcon} alt="Line" style={{ width: '60%', height: '100%' }} />
                            </Row>
                            <Row style={{ justifyContent: 'flex-start'}}>
                                <span style={{fontSize: '10px', padding: '6px 0'}}>Cân nặng {customerInfo.weight} kg</span>
                            </Row>
                        </div>
                    </Col>

                    {/* BMI */}
                    <Col span={14} style={{ paddingLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                        <div style={{
                            background: '#4A4949', 
                            borderRadius: 10, 
                            padding: 10, 
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <Row style={{fontSize: '12px', color: 'white'}}>Chỉ số cơ thể (BMI)</Row>
                            <Row style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px 0'
                            }}>
                                <span style={{
                                    fontSize: '14px', 
                                    color: 'white', 
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    {customerInfo.bmi}
                                </span>
                                <span style={{
                                    fontSize: '8px',
                                    backgroundColor: '#D6FFDD',
                                    borderRadius: 4,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 4
                                }}>
                                    {customerInfo.bmi >= 18.5 && customerInfo.bmi <= 24.9 ? 'Bạn khoẻ mạnh' : customerInfo.bmi >= 25 && customerInfo.bmi <= 29.9 ? 'Bạn thừa cân' : 'Bạn béo phì'}
                                </span>
                            </Row>
                            <Row style={{ width: '100%' }}>
                                <Progress percent={100} strokeColor={fourColors} showInfo={false} />
                                <Row style={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                    {BMIHardCode.map((bmi, index) => (
                                        <span key={index} style={{ fontSize: '8px', color: 'white' }}>{bmi}</span>
                                    ))}
                                </Row>
                            </Row>
                        </div>
                    </Col>
                </Row>
                
                <Divider style={{ borderColor: colors.grayDark, margin: '10px 0' }} />

                {/* Body measurements */}
                <Row style={{ width: "100%", display: 'flex', justifyContent: 'space-between', flexGrow: 1, padding: 8, }}>
                    <Col span={14} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                            <div style={{ marginBottom: 10, fontSize: '16px', color: 'white'}}>
                                Số đo cơ thể
                            </div>
                            <div style={{ marginBottom: 10, fontSize: '12px', color: 'white', fontWeight: 200}}>
                                {/* TODO: Get last check by get distance from updatedAt to now */}
                                Lần kiểm tra gần nhất: {getTimeSinceLastCheck(customerInfo.updated_at)}
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '10px',
                                backgroundColor: '#4A4949',
                                color: 'white',
                                fontWeight: 200,
                                padding: 8,
                                borderRadius: 8
                            }}>
                                Hình dạng cơ thể {customerInfo.body_shape}
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                            <div style={{
                                display: 'flex', 
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                width: '60%',
                                borderRadius: 8,
                                padding: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 10
                            }}>
                                <span style={{ color: colors.grayDark, fontSize: '10px' }}>Ngực</span>
                                <span style={{fontSize: '16px' }}>{customerInfo.chest_measurement}</span>
                            </div>
                            <div style={{
                                display: 'flex', 
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                width: '60%',
                                borderRadius: 8,
                                padding: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 10
                            }}>
                                <span style={{ color: colors.grayDark, fontSize: '10px' }}>Eo</span>
                                <span style={{fontSize: '16px' }}>{customerInfo.waist_measurement}</span>
                            </div>
                            <div style={{
                                display: 'flex', 
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                width: '60%',
                                borderRadius: 8,
                                padding: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 10
                            }}>
                                <span style={{ color: colors.grayDark, fontSize: '10px' }}>Mông</span>
                                <span style={{fontSize: '16px' }}>{customerInfo.hips_measurement}</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={10} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <img src={BodyIcon} alt="Body" style={{ width: '86%'}} />
                    </Col>
                </Row>
        </div>
    )
}

BodyInformation.propTypes = {
    customerInfo: PropTypes.shape({
        height: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
        bmi: PropTypes.number.isRequired,
        body_shape: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        chest_measurement: PropTypes.number.isRequired,
        waist_measurement: PropTypes.number.isRequired,
        hips_measurement: PropTypes.number.isRequired,
    }).isRequired,
}

export default BodyInformation
