import { Col, Flex, Row } from "antd"
import shoppingCartIcon from "../../assets/images/grocery_store.png"
import itemIcon from "../../assets/svgs/order/itemIcon.svg"
import colors from "../../constants/Colors"
import { useEffect, useState } from "react"
import { useStateContext } from "../../context/StateContext"
import OrderItemCart from "../../components/OrderItemCart"
import ItemSearchHeader from "../../components/ItemSearchHeader"
import recommendService from "../../services/recommendService"
import { ReducerCases } from "../../constants/ReducerCases"
import itemService from "../../services/itemService"
import Loading from "../../components/Loading"

export default function CustomerOrder() {
    const [{ recommendItems, highRatingItems, account }, dispatch] = useStateContext();
    const [isShowAllRecommendItems, setIsShowAllRecommendItems] = useState(false)
    const [isShowAllHighRatingItems, setIsShowAllHighRatingItems] = useState(false)
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isShowSearchResults, setIsShowSearchResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRecommendAndHighRatingItems = async () => {
            try {
                const response = await recommendService.recommend()
                if (response.is_success) {
                    dispatch({
                        type: ReducerCases.SET_RECOMMEND_ITEMS,
                        data: response.data.list_by_calo
                    })
                    dispatch({
                        type: ReducerCases.SET_HIGH_RATING_ITEMS,
                        data: response.data.list_by_evaluate
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }

        // Fetch recommend items and high rating items
        if (account && (recommendItems === undefined || highRatingItems === undefined))
            fetchRecommendAndHighRatingItems()
    }, [highRatingItems, account, recommendItems, dispatch]);
    // TODO: handle search item

    const handleSearch = () => {
        if (query) {
            onSearch(query);
            setIsShowSearchResults(true);
        }
    };

    const onSearch = async (value) => {
        if (value) {
            setIsLoading(true); // Start loading
            try {
                const res = await itemService.getItemByNameOrIngredients(value);
                const data = res.data;
                setSearchResults(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false); // Stop loading
            }
        }
    };
    const handleBackToItems = () => {
        setIsShowSearchResults(false);
        setSearchResults([]);
    };
    const handleViewAllRecommendItems = () => {
        if (recommendItems)
            setIsShowAllRecommendItems(!isShowAllRecommendItems)
    }

    const handleViewAllHighRatingItems = () => {
        if (highRatingItems)
            setIsShowAllHighRatingItems(!isShowAllHighRatingItems)
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
            <ItemSearchHeader
                icon={shoppingCartIcon}
                onItemSearch={handleSearch}
                value={query}
                onChange={(e) => setQuery(e.target.value)
                }
            />
            {isShowSearchResults && (
                <div>
                    <Col style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <span
                            style={{ fontSize: '18px', fontStyle: 'italic', color: colors.primary, cursor: 'pointer' }}
                            onClick={handleBackToItems}
                        >
                            Quay lại
                        </span>
                    </Col>
                    <Row style={{ marginTop: '15px' }}>
                        {isLoading ? (
                            <Loading />
                        ) : searchResults.length === 0 ? (
                            <Flex align="center" justify="center" style={{ fontSize: '30px' }}>
                                Không có sản phẩm nào
                            </Flex>
                        ) : (
                            <Row style={{width: '100%'}} gutter={searchResults.length >= 5 ? [10, 20] : [30, 20]} justify={searchResults.length >= 5 ? 'space-between' : 'start'}>
                                {searchResults.map((item, idx) => (
                                    <Col key={idx} span={4}>
                                        <OrderItemCart item={item} />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Row>

                </div>
            )}
            {!isShowSearchResults && (
                <>

                    {/* View all recommend items */}
                    {isShowAllRecommendItems && !isShowAllHighRatingItems &&
                        <div>
                            <Col style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <span
                                    style={{ fontSize: '18px', fontStyle: 'italic', color: `${colors.primary}`, cursor: 'pointer' }}
                                    onClick={handleViewAllRecommendItems}
                                >
                                    Quay lại
                                </span>
                            </Col>
                            <Row style={{ marginTop: '15px' }}>
                                {recommendItems !== undefined && recommendItems?.length === 0 &&
                                    <Flex align="center" justify="center" style={{ fontSize: '30px' }}>
                                        Không có sản phẩm nào
                                    </Flex>
                                }
                                <Row gutter={recommendItems?.length >= 5 ? [10, 20] : [30, 20]} justify={`${recommendItems?.length >= 5 ? 'space-between' : 'start'}`}>
                                    {recommendItems.map((item, idx) => (
                                        <Col key={idx} span={4}>
                                            <OrderItemCart item={item} />
                                        </Col>
                                    ))}
                                </Row>
                            </Row>
                        </div>
                    }

                    {/* View all high rating items */}
                    {!isShowAllRecommendItems && isShowAllHighRatingItems &&
                        <div>
                            <Col style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <span
                                    style={{ fontSize: '18px', fontStyle: 'italic', color: `${colors.primary}`, cursor: 'pointer' }}
                                    onClick={handleViewAllHighRatingItems}
                                >
                                    Quay lại
                                </span>
                            </Col>
                            <Row style={{ marginTop: '15px' }}>
                                {highRatingItems !== undefined && highRatingItems?.length === 0 &&
                                    <Flex align="center" justify="center" style={{ fontSize: '30px' }}>
                                        Không có sản phẩm nào
                                    </Flex>
                                }
                                <Row gutter={highRatingItems?.length >= 5 ? [10, 20] : [30, 20]} justify={`${highRatingItems?.length >= 5 ? 'space-between' : 'start'}`}>
                                    {highRatingItems.map((item, idx) => (
                                        <Col key={idx} span={4}>
                                            <OrderItemCart item={item} />
                                        </Col>
                                    ))}
                                </Row>
                            </Row>
                        </div>
                    }

                    {/* Show 2 list items */}
                    {!isShowAllHighRatingItems && !isShowAllRecommendItems &&
                        <div>
                            {/* Recommend items (only 5 items) */}
                            <Row justify='space-between' align='middle'>
                                <Col style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={itemIcon} alt="item icon" style={{ height: '27px', width: '27px' }} />
                                    <span style={{ marginLeft: '15px', fontSize: '24px' }}>Món ăn gợi ý cho bạn</span>
                                </Col>
                                <Col style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <span
                                        style={{ fontSize: '18px', fontStyle: 'italic', color: `${colors.primary}`, cursor: 'pointer' }}
                                        onClick={handleViewAllRecommendItems}
                                    >
                                        Xem tất cả
                                    </span>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '15px' }}>
                                <div style={{ borderRadius: '40px', border: '1px solid black', padding: '13px', width: '100%' }}>
                                    {recommendItems !== undefined && recommendItems?.length === 0 &&
                                        <Flex align="center" justify="center" style={{ fontSize: '30px' }}>
                                            Không có sản phẩm nào
                                        </Flex>
                                    }
                                    <Row gutter={`${recommendItems?.length >= 5 ? 10 : 30}`} justify={`${recommendItems?.length >= 5 ? 'space-between' : 'start'}`}>
                                        {recommendItems
                                            ? recommendItems.slice(0, 5).map((item, idx) => (
                                                <Col key={idx} span={4}>
                                                    <OrderItemCart item={item} />
                                                </Col>
                                            ))
                                            : Array.from(Array(5).keys()).map((_, idx) => (
                                                <Col key={idx} span={4}>
                                                    <OrderItemCart />
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </div>
                            </Row>
                        </div >
                    }
                    {!isShowAllHighRatingItems && !isShowAllRecommendItems &&
                        <div style={{ marginTop: '22px' }}>
                            {/* High rating items (only 5 items) */}
                            <Row justify='space-between' align='middle'>
                                <Col style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={itemIcon} alt="item icon" style={{ height: '27px', width: '27px' }} />
                                    <span style={{ marginLeft: '15px', fontSize: '24px' }}>Món ăn được đánh giá cao</span>
                                </Col>
                                <Col style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <span
                                        style={{ fontSize: '18px', fontStyle: 'italic', color: `${colors.primary}`, cursor: 'pointer' }}
                                        onClick={handleViewAllHighRatingItems}
                                    >
                                        Xem tất cả
                                    </span>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '15px' }}>
                                <div style={{ borderRadius: '40px', border: '1px solid black', padding: '13px', width: '100%' }}>
                                    {highRatingItems !== undefined && highRatingItems?.length === 0 &&
                                        <Flex align="center" justify="center" style={{ fontSize: '30px' }}>
                                            Không có sản phẩm nào
                                        </Flex>
                                    }
                                    <Row gutter={`${highRatingItems?.length >= 5 ? 10 : 30}`} justify={`${highRatingItems?.length >= 5 ? 'space-between' : 'start'}`}>
                                        {highRatingItems
                                            ? highRatingItems.slice(0, 5).map((item, idx) => (
                                                <Col key={idx} span={4}>
                                                    <OrderItemCart item={item} />
                                                </Col>
                                            ))
                                            : Array.from(Array(5).keys()).map((_, idx) => (
                                                <Col key={idx} span={4}>
                                                    <OrderItemCart />
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </div>
                            </Row>
                        </div >
                    }
                </>
            )}
        </Flex>
    )
}