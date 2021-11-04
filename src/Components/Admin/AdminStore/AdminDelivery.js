import React from 'react'
import AdminDeliveryPrice from './AdminDeliveryPrice'
import AdminDeliveryTime from './AdminDeliveryTime'
import AdminTime from './AdminTime'

const AdminDelivery = () => {
    return (
        <React.Fragment>
            <div style={{ borderBottom: "1px solid black", borderTop: "1px solid black" }}>
            <AdminTime /> 
            </div>
            <div style={{ borderBottom: "1px solid black", borderTop: "1px solid black" }}>
            <AdminDeliveryTime />
            </div>
            <div style={{ borderBottom: "1px solid black", borderTop: "1px solid black" }}>
            <AdminDeliveryPrice />
            </div>
        </React.Fragment>
    )
}

export default AdminDelivery
