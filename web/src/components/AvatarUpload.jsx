import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import { showErrorNotification, showSuccessNotification } from "../utils/commonUtils";
import DefaultAvatar from "../assets/images/default_avatar.png";

export default function AvatarUpload({ avatar, onUpload, size = 170 }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imgUploading, setImgUploading] = useState(false);
    const url = avatar ?? DefaultAvatar;

    const uploadImage = async (file) => {
        try {
            setImgUploading(true);
            await onUpload(file);
            showSuccessNotification("Tải ảnh thành công", "Ảnh đã được tải lên thành công!");
        } catch (error) {
            showErrorNotification("Tải ảnh thất bại", error.message);
        } finally {
            setImgUploading(false);
        }
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            showErrorNotification("Tải ảnh thất bại", "Chỉ hỗ trợ tải ảnh định dạng JPG/PNG");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            showErrorNotification("Tải ảnh thất bại", "Kích thước ảnh tối đa là 2MB!");
        }
        if (isJpgOrPng && isLt2M) uploadImage(file);
        return false; // Prevent automatic upload
    }

    return (
        <ImgCrop rotationSlider>
            <Upload
                beforeUpload={beforeUpload}
                showUploadList={false}
                disabled={imgUploading}
            >
                <Flex
                    justify="center"
                    align="center"
                    style={{
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Flex vertical style={{
                        textAlign: 'center', width: '100%', height: '100%', position: 'relative'
                    }}>
                        {/* Image */}
                        {url && <img
                            src={url}
                            alt="Avatar"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                borderRadius: '50%',
                            }}
                        />}

                        {/* Color overlay */}
                        {((url && isHovered) || imgUploading) && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.45)',
                                    borderRadius: '50%',
                                }}
                            />
                        )}

                        {/* Upload icon */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: !url ? 'black' : (isHovered || imgUploading) ? 'white' : 'rgba(255, 255, 255, 0)',
                                fontSize: size / 10,
                            }}
                        >
                            {imgUploading ? <LoadingOutlined /> : <PlusOutlined />}
                            <div style={{ marginTop: 10, }}>
                                {imgUploading ? "Đang tải" : "Chọn ảnh"}
                            </div>
                        </div>
                    </Flex>
                </Flex>
            </Upload>
        </ImgCrop>
    )
}