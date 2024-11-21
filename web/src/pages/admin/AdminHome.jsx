import { Button, Col, Flex, Modal, Row } from "antd";
import itemIcon from "../../assets/svgs/order/itemIcon.svg"
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import ItemSearchHeader from "../../components/ItemSearchHeader";
import restaurantService from "../../services/restaurantService";
import RestaurantItemCard from "../../components/admin/RestaurantItemCard";
import colors from "../../constants/Colors";
import { showErrorNotification, showSuccessNotification } from "../../utils/commonUtils";
import { ExclamationCircleOutlined } from "@ant-design/icons";
function AdminHome() {
    const [isLoading, setIsLoading] = useState(false);
    const [waittingList, setWaittingList] = useState([]);
    const [isListChanged, setIsListChanged] = useState(false); // State to track changes to the list
    const [modal, modalContextHolder] = Modal.useModal();

    useEffect(() => {
        const getWaitingList = async () => {
            const response = await restaurantService.getWaitingList();
            setWaittingList(response.data)
            return response.data;
        }
        getWaitingList()

    }, [isListChanged])

    const handleApprove = async (id) => {
        modal.confirm({
            title: 'Xác nhận phê duyệt',
            icon: <ExclamationCircleOutlined />,
            centered: true,
            content: 'Bạn có chắc chắn muốn phê duyệt nhà hàng này?',
            okText: 'Phê duyệt',
            cancelText: 'Hủy',
            onOk() {
                setIsLoading(true);
                restaurantService.approve(id)
                    .then((response) => {
                        setIsListChanged((prev) => !prev);
                        showSuccessNotification(`Phê duyệt nhà hàng ${response.data.account.name} thành công`)
                    })
                    .catch((error) => { showErrorNotification("Phê duyệt thất bại", error.message); })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        });

    }
    const handleReject = async (id) => {
        modal.confirm({
            title: 'Xác nhận từ chối phê duyệt',
            icon: <ExclamationCircleOutlined />,
            centered: true,
            content: 'Bạn có chắc chắn muốn từ chối phê duyệt nhà hàng này?',
            okText: 'Từ chối',
            cancelText: 'Hủy',
            onOk() {
                setIsLoading(true);
                restaurantService.reject(id)
                    .then((response) => {
                        showSuccessNotification(`Từ chối phê duyệt nhà hàng ${response.data.account.name}`);
                    })
                    .catch((error) => { showErrorNotification("Từ chối phê duyệt thất bại", error.message); })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        });
    }

    return (
        <Flex
            vertical
            gap={22}
            style={{
                height: '100%',
                width: '100%',
                padding: '20px'
            }}
        >
            <ItemSearchHeader placeholder="Tìm kiếm nhà hàng" />
            <Row style={{ marginTop: '15px', height: 'calc(100% - 75px)', width: '100%', overflowY: 'auto' }}>
                {isLoading ? (
                    <Loading />
                ) :
                    waittingList?.length === 0 ? (
                        <div style={{ fontSize: 30, textAlign: 'center' }}>Không có nhà hàng nào đang chờ phê duyệt</div>
                    )
                        : (
                            <div style={{ width: "100%", height: "200px" }}>
                                <Col style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={itemIcon} alt="item icon" style={{ height: '27px', width: '27px' }} />
                                    <span style={{ marginLeft: '15px', fontSize: '24px' }}>Nhà hàng đang chờ phê duyệt</span>
                                </Col>
                                <Flex style={{ margin: "20px 40px", width: "90%" }} vertical>
                                    {waittingList.map((item) => (
                                        <Flex key={item.id} style={{
                                            borderRadius: '30px',
                                            border: `solid 1px ${colors.border} `,
                                            padding: "20px",
                                            minHeight: "275px",
                                            marginBottom: "20px",
                                        }}>
                                            <Flex style={{ justifyContent: "space-evenly", alignContent: "center", width: "100%" }} vertical>
                                                <RestaurantItemCard item={item} />
                                            </Flex>
                                            <Flex vertical style={{ justifyContent: "flex-end" }}>

                                                <Button type="submit"
                                                    onClick={() => {
                                                        handleApprove(item.id);
                                                    }}
                                                    style={{
                                                        padding: "5px 10px", margin: "10px",
                                                        border: "red solid 1px", borderRadius: "15px",
                                                        color: colors.primary,
                                                        width: "100px",
                                                        fontSize: '16px'
                                                    }} >
                                                    {item.status === "APPROVAL_FAILED" ? "Phê duyệt lại" : "Xác nhận"}
                                                </Button>
                                                {
                                                    item.status !== "APPROVAL_FAILED" &&
                                                    <Button htmlType="button"
                                                        onClick={() => { handleReject(item.id) }}
                                                        style={{
                                                            padding: "5px 10px", margin: "10px",
                                                            border: "red solid 1px", borderRadius: "15px",
                                                            color: colors.primary,
                                                            width: "100px",
                                                            fontSize: '16px'
                                                        }}>
                                                        Xóa
                                                    </Button>
                                                }
                                            </Flex>
                                        </Flex>
                                    ))}
                                </Flex>

                            </div>
                        )}
            </Row>
            {modalContextHolder}
        </Flex>
    );
}

export default AdminHome;