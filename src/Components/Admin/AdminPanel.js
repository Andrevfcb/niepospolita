import React, {useState} from 'react';
import SideDrawer from '../Header/SideDrawer';
import "./Admin.css"
import AdminNav from './AdminNav';
import AdminAddItem from './AdminStore/AdminAddItem';
import AdminBonus from './AdminStore/AdminBonus';
import AdminCategory from './AdminStore/AdminCategory';
import AdminDeleteItem from './AdminStore/AdminDeleteItem';
import AdminDelivery from './AdminStore/AdminDelivery';
import AdminItems from './AdminStore/AdminItems';
import AdminSpecialReservation from './AdminStore/AdminSpecialReservation';
import AdminUpdateItem from './AdminStore/AdminUpdate';
import AdminValue from './AdminStore/AdminValue';

const AdminPanel = () => {

    const [section, setSection] = useState("0");
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
      };
    
      const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
      };

    const changeSection = (e) => {
        setSection(e.target.id);
    }

    return (
        <React.Fragment>
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
            <div className="admin-navigation half">
                <AdminNav changeSection={changeSection} />
            </div>
            </SideDrawer>
            <div className="admin">
                <div className="admin-navigation full">
                    <AdminNav changeSection={changeSection} />
                </div>
                <div className="admin-side-navigation"
                onClick={openDrawerHandler}>
                    <p>M</p>
                    <p>E</p>
                    <p>N</p>
                    <p>U</p>
                </div>
                <div className="admin-content">
                {section === "0" && <AdminItems />}
                {section === "1" && <AdminAddItem />}
                {/* {section === "2" && <AdminUpdateItem />} */}
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
