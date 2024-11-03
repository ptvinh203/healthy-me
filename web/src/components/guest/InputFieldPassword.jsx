import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Input from 'antd/es/input/Input';
import { useState } from 'react';
import colors from '../../constants/Colors';
function InputFieldPassword({ placeholder }) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (<>
        <Input.Password
            placeholder={placeholder}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            style={{
                padding: "10px",
                marginBottom: "10px",
                width: "100%",
                backgroundColor: colors.lightBackground
            }}
        />
    </>);
}

export default InputFieldPassword;