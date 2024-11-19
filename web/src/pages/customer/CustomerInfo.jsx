import { Button, Col, DatePicker, Flex, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import AvatarUpload from "../../components/AvatarUpload";
import { useStateContext } from "../../context/StateContext";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { showErrorNotification, showSuccessNotification } from "../../utils/commonUtils";
import { ReducerCases } from "../../constants/ReducerCases";
import customerService from "../../services/customerService";
import { ExclamationCircleOutlined, PhoneOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export default function CustomerInfo() {
    const [{ profile, account }, dispatch] = useStateContext();
    const [updating, setUpdating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            try {
                if (account) {
                    setLoading(true)
                    const data = await customerService.getCustomerInfo(account.id);
                    console.log(data);
                    setUserInfo(data);
                    dispatch({ type: ReducerCases.SET_PROFILE, payload: data });
                }
            } catch (error) {
                showErrorNotification("Lỗi", error.message)
            }
            finally {
                setLoading(false)
            }
        };

        if (!profile) fetchCustomerInfo();
        else setUserInfo(profile);
    }, [account, dispatch, profile]);

    const onFinish = (values) => {
        Modal.confirm({
            title: 'Xác nhận cập nhật',
            icon: <ExclamationCircleOutlined />,
            centered: true,
            content: 'Bạn có chắc chắn muốn cập nhật này không?',
            okText: 'Lưu',
            cancelText: 'Hủy',
            onOk() {
                setUpdating(true)
                customerService.updateInfo(values)
                    .then(data => {
                        setUserInfo(data);
                        showSuccessNotification("Cập nhật thông tin thành công", "Thông tin của bạn đã được cập nhật thành công!")
                        setUpdating(false)
                    })
                    .catch(error => {
                        showErrorNotification("Cập nhật thông tin thất bại", error.message)
                        setUpdating(false)
                    });
            }
        });
    };

    if (loading) return <Loading />

    return (
        <Flex vertical style={{ height: "100%", width: "100%", padding: 20, overflowY: 'scroll' }}>
            <Row>
                <Col
                    offset={4}
                    md={20} sm={24}
                >
                    <AvatarUpload
                        avatar={userInfo?.avatar}
                        onUpload={async (file) => {
                            const data = await customerService.uploadAvatar(file);
                            setUserInfo({
                                ...userInfo,
                                avatar: data.avatar
                            })
                        }}
                        size={150}
                    />
                </Col>
            </Row>
            <Form
                name="basic"
                labelCol={{ span: 4, }}
                wrapperCol={{ span: 20, }}
                style={{ width: "100%", height: "100%", marginTop: 12, gap: 10 }}
                initialValues={{
                    email: userInfo?.email,
                    name: userInfo?.name,
                    address: userInfo?.address,
                    phone: userInfo?.phone,
                    gender: userInfo?.gender,
                    height: userInfo?.height,
                    weight: userInfo?.weight,
                    heart_rate: userInfo?.heart_rate,
                    blood_glucose: userInfo?.blood_glucose,
                    blood_pressure: userInfo?.blood_pressure,
                    chest_measurement: userInfo?.chest_measurement,
                    waist_measurement: userInfo?.waist_measurement,
                    hips_measurement: userInfo?.hips_measurement,
                    date_of_birth: userInfo?.date_of_birth ? dayjs(userInfo.date_of_birth) : null,
                }}
                onFinish={onFinish}
                autoComplete="off"
                labelWrap
                labelAlign="left"
            >
                {/* Name */}
                <Form.Item label="Họ và Tên"
                    name="name"
                    rules={[
                        { required: true, message: 'Vui lòng nhập họ và tên của bạn' },
                        { max: 255, message: 'Họ và tên không được vượt quá 255 ký tự' }
                    ]}
                >
                    <Input placeholder="Nhập họ và tên" />
                </Form.Item>

                {/* Address */}
                <Form.Item label="Địa chỉ" name="address"
                    rules={[
                        { required: true, message: 'Vui lòng nhập địa chỉ của bạn' },
                        { max: 255, message: 'Địa chỉ không được vượt quá 255 ký tự' }
                    ]}
                >
                    <Input placeholder="Nhập địa chỉ" />
                </Form.Item>

                {/* Date of birth */}
                <Form.Item label="Ngày sinh" name="date_of_birth"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày sinh của bạn' }]}
                >
                    <DatePicker
                        placeholder="Chọn ngày sinh"
                        format={"YYYY-MM-DD"}
                        style={{ width: "100%" }}
                        disabledDate={(current) => current && current.isAfter(dayjs(), 'day')}
                    />
                </Form.Item>

                {/* Phone */}
                <Form.Item label="Số điện thoại" name="phone"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn' }]}
                >
                    <Input
                        suffix={<PhoneOutlined />}
                        placeholder="Nhập số điện thoại"
                        onKeyDown={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                </Form.Item>

                {/* Gender */}
                <Form.Item label="Giới tính" name="gender"
                    rules={[{ required: true, message: 'Vui lòng chọn giới tính của bạn' }]}
                >
                    <Select
                        defaultValue="OTHER"
                        style={{ width: "100%" }}
                        options={[
                            { value: 'MALE', label: 'Nam' },
                            { value: 'FEMALE', label: 'Nữ' },
                            { value: 'OTHER', label: 'Khác' },
                        ]}
                    />
                </Form.Item>

                {/* Height and weight */}
                <Form.Item label="Chiều cao và cân nặng" style={{ marginBottom: 0 }} required>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item name="height"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập chiều cao của bạn' },
                                    {
                                        validator: (_, value) =>
                                            value > 0 ? Promise.resolve() : Promise.reject(new Error('Chiều cao phải lớn hơn 0')),
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    max={300}
                                    addonBefore="Chiều cao"
                                    addonAfter="Cm"
                                    placeholder="Nhập chiều cao"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="weight"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập cân nặng của bạn' },
                                    {
                                        validator: (_, value) =>
                                            value > 0 ? Promise.resolve() : Promise.reject(new Error('Cân nặng phải lớn hơn 0')),
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    max={300}
                                    addonBefore="Cân nặng"
                                    addonAfter="Kg"
                                    placeholder="Nhập cân nặng"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>

                {/* Body index */}
                <Form.Item label="Chỉ số cơ thể" style={{ marginBottom: 0 }} required>
                    <Row gutter={[10, 0]}>
                        <Col span={8}>
                            <Form.Item name="heart_rate"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập nhịp tim của bạn' },
                                    {
                                        validator: (_, value) =>
                                            value > 0 ? Promise.resolve() : Promise.reject(new Error('Nhịp tim phải lớn hơn 0')),
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    max={220}
                                    addonBefore="Nhịp tim"
                                    addonAfter="Nhịp / phút"
                                    placeholder="Nhập nhịp tim"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="blood_glucose"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập đường huyết của bạn' },
                                    {
                                        validator: (_, value) =>
                                            value > 0 ? Promise.resolve() : Promise.reject(new Error('Đường huyết phải lớn hơn 0')),
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    max={100}
                                    addonBefore="Đường huyết"
                                    addonAfter="Mg / dl"
                                    placeholder="Nhập đường huyết"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="blood_pressure"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập huyết áp của bạn' },
                                    {
                                        validator: (_, value) =>
                                            value > 0 ? Promise.resolve() : Promise.reject(new Error('Huyết áp phải lớn hơn 0')),
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    max={300}
                                    addonBefore="Huyết áp"
                                    addonAfter="MmHg"
                                    placeholder="Nhập huyết áp"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="chest_measurement"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập vòng ngực của bạn' },
                                    {
                                        validator: (_, value) =>
                                            value > 0 ? Promise.resolve() : Promise.reject(new Error('Vòng ngực phải lớn hơn 0')),
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    max={300}
                                    addonBefore="Vòng ngực"
                                    addonAfter="Cm"
                                    placeholder="Nhập số đo vòng ngực"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="waist_measurement"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập vòng eo của bạn' },
                                    {
                                        validator: (_, value) =>
                                            value > 0 ? Promise.resolve() : Promise.reject(new Error('Vòng eo phải lớn hơn 0')),
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    max={300}
                                    addonBefore="Vòng eo"
                                    addonAfter="Cm"
                                    placeholder="Nhập số đo vòng eo"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="hips_measurement"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập vòng mông của bạn' },
                                    {
                                        validator: (_, value) =>
                                            value > 0 ? Promise.resolve() : Promise.reject(new Error('Vòng mông phải lớn hơn 0')),
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    max={300}
                                    addonBefore="Vòng mông"
                                    addonAfter="Cm"
                                    placeholder="Nhập số đo vòng mông"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>


                {/* Email */}
                <Form.Item label="Email" name="email">
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 20,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={updating}>
                        Lưu thay đổi
                    </Button>
                </Form.Item>
            </Form>
        </Flex >
    );
}