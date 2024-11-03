import { Button } from "antd";
import { useState } from "react";

function ButtonStyled({ children, cusWidth }) {
    const [width, setWidth] = useState(cusWidth);
    return (

        <Button
            style={{
                color: "#FFFFFF",
                width: width ? width : "fit-content",
                padding: "20px 30px",
                backgroundImage: "linear-gradient(to right, #3A8EF6, #6F3AFA)",
            }}
            size="large"
        >
            {children}
        </Button>
    );
}

export default ButtonStyled;