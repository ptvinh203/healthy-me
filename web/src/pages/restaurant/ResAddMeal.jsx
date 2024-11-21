import { Button, Card, Flex, Form, Input, InputNumber, Select, Upload } from "antd"
import colors from "../../constants/Colors"
import meal from "../../assets/svgs/res/meal.svg"
import download from "../../assets/svgs/res/download.svg"

import { useState } from "react";
import restaurantService from "../../services/restaurantService";
import { showErrorNotification, showSuccessNotification } from "../../utils/commonUtils";
import "../../assets/css/ant_nopadding.css"
function ResAddMeal() {
    const [lastUploadedImage, setLastUploadedImage] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
    const { Option } = Select;
    const [loading, setLoading] = useState(false);
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 6,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 14,
            },
        },
    };

    const onFinish = async (credentials) => {
        if (credentials.ingredients)
            credentials.ingredients = credentials.ingredients.split(",").map((item) => item.trim());
        if (fileList.length === 0) {
            showErrorNotification("Ảnh món ăn", "Vui lòng chọn ảnh cho món ăn mới");
            return;
        }
        setLoading(true);
        try {
            const res = await restaurantService.addMeal(credentials);
            if (res.is_success) {
                const itemId = res.data.id;
                const formData = new FormData();
                formData.append("itemId", itemId);
                for (const file of fileList) {
                    formData.append("file", file);
                    await restaurantService.uploadMealPicture(formData);
                    showSuccessNotification("Thành công", "Tạo món mới thành công");
                }
                form.resetFields();
                setLastUploadedImage(null);
                setFileList([])
            }
            return res.data;
        }
        catch (error) {
            showErrorNotification("Đăng ký thất bại", error.message);
        }
        finally {
            setLoading(false);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleUpload = ({ fileList }) => {
        if (fileList.length > 0) {
            const lastFile = fileList[fileList.length - 1]; // Lấy file cuối cùng
            const reader = new FileReader();
            reader.onload = (e) => {
                setLastUploadedImage(e.target.result); // Hiển thị ảnh cuối
            };
            reader.readAsDataURL(lastFile.originFileObj); // Đọc ảnh
        }
        return false;
    };

    const handleFileChange = (file) => {
        setFileList((prevList) => [...prevList, file]);
        return false; // Prevent automatic upload
    };

    return (
        <Flex style={{
            height: "90%", padding: "40px 40px 0px 40px", margin: "40px 20px"
            , borderRadius: "15px", overflow: "auto"
        }}>
            <Flex vertical style={{
                justifyContent: "flex-start",
                alignItems: "center",
                width: "200px",
                maxHeight: "80%"
            }}>
                <button style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    backgroundColor: colors.lightYellow,
                    padding: "10px",
                    width: "100%",
                    border: `0.5px ${colors.borderlight} solid`,
                    borderRadius: "20px"
                }}>
                    <p style={{
                        fontSize: "18px"

                    }}>
                        Thêm món ăn
                    </p>
                    <img src={meal} style={{ height: "30px", width: "30px" }}>

                    </img>
                </button>
                <Card
                    hoverable
                    style={{ width: "fit-content", borderRadius: 16, marginTop: "20px", backgroundColor: colors.background }}
                    cover={
                        <img
                            src={lastUploadedImage ?? meal}
                            alt="Uploaded"
                            style={{
                                width: "160px",
                                height: "160px",
                                objectFit: "cover",
                                borderRadius: 16,
                            }}
                        />
                    }
                >
                    <Upload
                        style={{
                            width: "160px",
                            height: "160px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "#f0f0f0",
                            borderRadius: 16,
                        }}
                        showUploadList={false}
                        accept="image/*"
                        multiple
                        beforeUpload={handleFileChange}
                        onChange={handleUpload}
                    >
                        <Button style={{ width: "100%", borderRadius: 16 }}>
                            Upload Ảnh
                        </Button>
                    </Upload>
                </Card>
            </Flex>
            <Flex style={{
                margin: "0px 40px", height: "fit-content",
                maxHeight: "80%",
            }}>
                <Form
                    {...formItemLayout}
                    form={form}
                    variant={'filled'}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        height: "fit-content"
                        , maxHeight: "100%",
                        paddingBottom: "20px",
                    }}
                    initialValues={{
                        variant: 'filled',
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Flex vertical style={{
                        minWidth: "250px",
                        maxWidth: "1200px",
                        flex: '0 0 70%',
                        marginLeft: "40px"
                    }}>

                        <Form.Item
                            style={{ margin: 0 }}
                            label="Tên món: "
                            name="name"
                            labelCol={{ span: 24, padding: 0 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập đầy đủ thông tin',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            style={{ margin: 0 }}
                            label="Giá"
                            name="price"
                            labelCol={{ span: 24, padding: "0px" }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập đầy đủ thông tin',
                                },
                                {
                                    pattern: /^[0-9]+$/,
                                    message: 'Không đúng định dạng',
                                }
                            ]}
                        >
                            <Input
                                suffix={"VND"}
                            />
                        </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            label="Thành phần món ăn"
                            name="ingredients"
                            labelCol={{ span: 24, padding: "0px" }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập đầy đủ thông tin',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            label="Khối lượng calo"
                            name="calo"
                            labelCol={{ span: 24, padding: "0px" }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập đầy đủ thông tin',
                                },
                                {
                                    pattern: /^[0-9]+$/,
                                    message: 'Không đúng định dạng',
                                }
                            ]}
                        >
                            <InputNumber
                                style={{
                                    width: '100%',
                                }}
                                suffix={"kcal"}
                            />                </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            label="Loại món ăn"
                            name="type"
                            value={selectedType}
                            onChange={(value) => {
                                setSelectedType(value)
                            }}
                            labelCol={{ span: 24, padding: "0px" }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập đầy đủ thông tin',
                                }
                            ]}
                        >
                            <Select
                            >
                                <Option value="MAIN_FOOD">Bữa chính</Option>
                                <Option value="FAST_FOOD">Đồ ăn nhanh</Option>
                                <Option value="DRINK">Đồ uống</Option>

                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            label="Mô tả"
                            name="description"
                            labelCol={{ span: 24, padding: "0px" }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập đầy đủ thông tin',
                                }
                            ]}
                        >
                            <Input.TextArea style={{ resize: "none" }} />
                        </Form.Item>



                    </Flex>
                    <Flex vertical style={{
                        justifyContent: "flex-end", height: "auto", marginLeft: "100px",
                        marginTop: "auto",
                        flex: '0 0 30%',
                    }}>

                        <Form.Item
                            style={{
                                width: "fit-content",
                                height: "fit-content",
                                margin: 0,
                                padding: 0,
                            }}

                        >
                            <Button disabled={loading} type="primary" htmlType="submit" style={{
                                backgroundColor: colors.lightYellow,
                                padding: "0px 30px"
                            }}>
                                <p style={{ fontSize: "16px", fontWeight: "bold", color: "black", }}>
                                    Lưu
                                </p>
                                <img style={{ width: "20px", height: "20px" }} src={download}>

                                </img>
                            </Button>
                        </Form.Item>
                    </Flex>

                </Form>

            </Flex>
        </Flex >
    )
}

export default ResAddMeal