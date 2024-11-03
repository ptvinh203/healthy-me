import Input from "antd/es/input/Input";
import colors from "../../constants/Colors";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
function InputFieldText({ placeholder, value, onChange, icon, suffix }) {
    const [inputSuffix, setinputSuffix] = useState(suffix)
    return (
        <div>
            <Input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                icon={icon}
                style={{
                    padding: "10px",
                    marginBottom: "10px",
                    width: "100%",
                    backgroundColor: colors.lightBackground
                }}
                suffix={inputSuffix ? inputSuffix : ""}
            />

        </div>
    );
}

export default InputFieldText;