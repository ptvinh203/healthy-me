import { Button, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import BloodIcon from '../../assets/svgs/home/blood.svg';
import BloodChart from '../../assets/svgs/home/bloodChart.svg';
import GlucoseIcon from '../../assets/svgs/home/glucose.svg';
import GlucoseChart from '../../assets/svgs/home/glucoseChart.svg';
import HeartIcon from '../../assets/svgs/home/heart.svg';
import HeartChart from '../../assets/svgs/home/heartChart.svg';
import colors from '../../constants/Colors';
import PropTypes from 'prop-types';

const { Option } = Select;

function IndicatorCard({ indicator }) {
    const { name, value, unit, type } = indicator;

    // Icon mapping with background and square dimensions
    const iconData = {
        'Nhịp tim': {
            icon: HeartIcon,
            background: '#FAF0F3',
            chart: HeartChart
        },
        'Huyết áp': {
            icon: BloodIcon,
            background: '#D0FBFF',
            chart: BloodChart
        },
        'default': {
            icon: GlucoseIcon,
            background: '#F8DEBD',
            chart: GlucoseChart
        }
    };

    const { icon, background, chart } = iconData[name] || iconData['default'];

    // State for controlling modal visibility
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedValue, setEditedValue] = useState(value);
    const [selectedActivities, setSelectedActivities] = useState([]);

    // Function to show modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Function to hide modal
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    // Function to handle value change in input field
    const handleValueChange = (e) => {
        setEditedValue(e.target.value);
    };

    // Function to handle selected activities
    const handleActivityChange = (selectedItems) => {
        setSelectedActivities(selectedItems);
    };

    // List of sports activities for "Lượng calo đốt cháy"
    const sportsActivities = [
        { label: 'Ít vận động (tập thể dục nhẹ, công việc văn phòng)' },
        { label: 'Hoạt động nhẹ (tập thể dục 1-3 ngày/tuần)' },
        { label: 'Hoạt động vừa (tập thể dục 3-5 ngày/tuần)' },
        { label: 'Hoạt động nặng (tập thể dục 6-7 ngày/tuần)' },
        { label: 'Hoạt động rất nặng (công việc lao động hoặc tập thể dục 2 lần/ngày)' },
    ];

    // Modal content based on indicator type
    const renderModalContent = () => {
        if (name === 'Lượng calo đốt cháy') {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 20
                }}>
                    <p>Chọn các hoạt động thể thao:</p>
                    {/*Select for activities */}
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Chọn các hoạt động"
                        value={selectedActivities}
                        onChange={handleActivityChange}
                    >
                        {sportsActivities.map((activity, index) => (
                            <Option key={activity.label} value={index}>
                                {activity.label}
                            </Option>
                        ))}
                    </Select>
                </div>
            );
        }

        return (
            <div>
                <p>{name} của bạn hiện tại là:</p>
                {/* Input field for editing value */}
                <Input
                    type="number"
                    value={editedValue}
                    onChange={handleValueChange}
                    style={{ marginBottom: '10px', width: '150px' }}
                    suffix={unit} // Display unit as suffix
                />
                <p>Loại chỉ số: {type}</p>
                <img src={chart} alt="chart" style={{ width: '100%' }} />
            </div>
        );
    };

    return (
        <>
            <div
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                    padding: '10px',
                    gap: 4,
                    cursor: 'pointer'
                }}
                onClick={showModal}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px',
                }}>
                    <div style={{
                        background,
                        borderRadius: '10px',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <img src={icon} alt={name} style={{ width: '14px', height: '14px' }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 550 }}>{name}</span>
                </div>
                {/* Indicator */}
                <div>
                    <span style={{ fontSize: '18px', color: colors.textPrimary, fontWeight: 350 }}>{value}</span>
                    &nbsp;
                    <span style={{ fontSize: '13px', color: colors.grayMedium }}>{unit}</span>
                </div>
                {/* Type */}
                <div style={{
                    backgroundColor: background,
                    maxWidth: '60px',
                    borderRadius: 6,
                    padding: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <span style={{ fontSize: '10px', fontWeight: 440 }}>{type}</span>
                </div>
                {/* Chart */}
                <div>
                    <img src={chart} alt="chart" style={{ width: '100%' }} />
                </div>
            </div>

            {/* Modal for showing detailed info */}
            <Modal
                title={name}
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={
                    <Button type="primary" onClick={handleCloseModal}>Lưu thay đổi</Button>
                }
                centered
            >
                {renderModalContent()}
            </Modal>
        </>
    );
}

IndicatorCard.propTypes = {
    indicator: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        unit: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
};

export default IndicatorCard;
