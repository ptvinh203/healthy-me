import { Button } from 'antd';
import React from 'react';
import bellIcon from '../../assets/svgs/res/bellIcon.svg';
import colors from '../../constants/Colors';


function LeftHeader() {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: 20
        }}>
            <div style={{
                display: 'flex',
                flexDirection: "column",
                gap: 8
            }}>
                <h2 style={{ color: colors.textPrimary, fontWeight: 550}}>Tổng quan về sức khoẻ</h2>
                <p style={{ color: colors.grayDark, fontSize: '13px' }}>September 12, 2024</p>
            </div>
            <Button
                style={{
                    background: 'white',
                    width: '30px',
                    height: '30px'
                }}
                onClick={() => { }}
            >
                <img
                    src={bellIcon}
                    alt="Notification"
                    style={{ width: '16px', height: '16px' }}
                />
            </Button>
        </div>
    )
}

export default LeftHeader
