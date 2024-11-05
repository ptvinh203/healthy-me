// import { useState } from "react";
// import { Col, Flex, Row } from "antd";
// import ItemSearchHeader from "./ItemSearchHeader";

// export default function SearchableList({ data, renderItems, searchFunction, children }) {
//     const [query, setQuery] = useState("");
//     const [isSearching, setIsSearching] = useState(false);
//     const [searchResults, setSearchResults] = useState([]);

//     const handleSearch = async () => {
//         const results = await searchFunction(query);
//         setSearchResults(results);
//         setIsSearching(true);
//     };

//     const handleBackToItems = () => {
//         setIsSearching(false);
//         setSearchResults([]);
//     };

//     return (
//         <Flex
//             vertical
//             gap={22}
//             style={{
//                 overflowY: 'auto',
//                 height: '100%',
//                 width: '100%',
//                 padding: '20px'
//             }}
//         >
//             <ItemSearchHeader
//                 onItemSearch={handleSearch}
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//             />

//             {isSearching ? (
//                 <div>
//                     <Col style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
//                         <span
//                             style={{ fontSize: '18px', fontStyle: 'italic', color: "#1890ff", cursor: 'pointer' }}
//                             onClick={handleBackToItems}
//                         >
//                             Quay lại
//                         </span>
//                     </Col>
//                     <Row style={{ marginTop: '15px' }}>
//                         {searchResults.length === 0 ? (
//                             <Flex align="center" justify="center" style={{ fontSize: '30px' }}>
//                                 Không có sản phẩm nào
//                             </Flex>
//                         ) : (
//                             renderItems(searchResults)
//                         )}
//                     </Row>
//                 </div>
//             ) : (
//                 <>{children}</>
//             )}
//         </Flex>
//     );
// }
