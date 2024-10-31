import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function CustomerPayment() {
    const { state } = useLocation();
    const { selectedCartIds } = state;
    useEffect(() => {
        console.log('selectedCartIds', selectedCartIds);
    }, [selectedCartIds]);

    return (
        <div>
            <h1>CustomerPayment</h1>
        </div>
    )
}