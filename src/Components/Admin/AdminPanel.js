import React, {useState} from 'react';
import "./Admin.css"
import AdminNav from './AdminNav';
import AdminAddItem from './AdminStore/AdminAddItem';
import AdminBonus from './AdminStore/AdminBonus';
import AdminCategory from './AdminStore/AdminCategory';
import AdminDeleteItem from './AdminStore/AdminDeleteItem';
import AdminDelivery from './AdminStore/AdminDelivery';
import AdminSpecialReservation from './AdminStore/AdminSpecialReservation';
import AdminUpdateItem from './AdminStore/AdminUpdate';
import AdminValue from './AdminStore/AdminValue';

const AdminPanel = () => {

    const [section, setSection] = useState("0");

    const changeSection = (e) => {
        setSection(e.target.id);
    }

    return (
        <React.Fragment>
            <div className="admin">
                <div className="admin-navigation">
                    <AdminNav changeSection={changeSection} />
                </div>
                <div className="admin-content">
                {section === "0" && <AdminAddItem />}
                {section === "1" && <AdminUpdateItem />}
                {section === "2" && <AdminDeleteItem />}
                {section === "3" && <AdminCategory />}
                {section === "4" && <AdminValue />}
                {section === "5" && <AdminDelivery />}
                {section === "6" && <AdminBonus />}
                {section === "7" && <AdminSpecialReservation />}
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminPanel
