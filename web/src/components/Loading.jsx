import { Flex, Spin } from "antd";

export default function Loading() {
    return (
        <Flex justify='center' align="center" style={{ height: '100%', width: '100%' }}>
            <Spin size="large" />
        </Flex>
    )
}