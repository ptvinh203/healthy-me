import { Button, Col, Flex, Row } from "antd";
import itemIcon from "../../assets/svgs/order/itemIcon.svg"
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import ItemSearchHeader from "../../components/ItemSearchHeader";
import restaurantService from "../../services/restaurantService";
import RestaurantItemCard from "../../components/admin/RestaurantItemCard";
import colors from "../../constants/Colors";
import { showErrorNotification, showSuccessNotification } from "../../utils/commonUtils";
function AdminHome() {
    const [isLoading, setIsLoading] = useState(false);
    const [waittingList, setWaittingList] = useState([]);
    const [isListChanged, setIsListChanged] = useState(false); // State to track changes to the list

    useEffect(() => {
        const getWaitingList = async () => {
            const response = await restaurantService.getWaitingList();
            console.log("res", response.data)
            setWaittingList(response.data)
            return response.data;
        }
        getWaitingList()

    }, [isListChanged])

    const handleApprove = async (id) => {
        setIsLoading(true);
        try {
            const response = await restaurantService.approve(id);
            console.log("Approved:", response);
            setIsListChanged((prev) => !prev);
            showSuccessNotification(`Phê duyệt nhà hàng ${response.data.account.name} thành công`)
        } catch (error) {
            console.error("Error approving:", error);
            showErrorNotification("Phê duyệt thất bại")
        } finally {
            setIsLoading(false);
        }
    }
    const handleReject = async (id) => {
        setIsLoading(true);
        try {
            const response = await restaurantService.reject(id);
            console.log("Decline:", response);
            // setIsListChanged((prev) => !prev);
            showSuccessNotification(`Từ chối phê duyệt nhà hàng ${response.data.account.name}`);
        } catch (error) {
            console.error("Error Rejecting:", error);
            showErrorNotification("Từ chối phê duyệt thất bại")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Flex
            vertical
            gap={22}
            style={{
                overflowY: 'auto',
                height: '100%',
                width: '100%',
                padding: '20px'
            }}
        >
            <ItemSearchHeader placeholder="Tìm kiếm nhà hàng"
            />
            <Row style={{ marginTop: '15px', height: "200px" }}>
                {isLoading || waittingList.length === 0 ? (
                    <Loading />
                ) : (
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
                                    padding: "20px 20px 20px 40px",
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
                                            Chấp nhận
                                        </Button>
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
                                    </Flex>
                                </Flex>
                            ))}
                        </Flex>

                    </div>
                )}
            </Row>


        </Flex>);
}

export default AdminHome;