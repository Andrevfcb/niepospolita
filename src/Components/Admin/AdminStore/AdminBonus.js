import React from 'react'
import AdminBonusDelivery from './AdminBonusDelivery'
import AdminBonusItems from './AdminBonusItems'

const AdminBonus = () => {
    return (
        <React.Fragment>
            <div style={{ borderBottom: "1px solid black", borderTop: "1px solid black" }}>
            <AdminBonusDelivery /> 
            </div>
            <div style={{ borderBottom: "1px solid black", borderTop: "1px solid black" }}>
            <AdminBonusItems />
            </div>
        </React.Fragment>
    )
}

export default AdminBonus
