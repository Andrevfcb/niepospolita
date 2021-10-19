import React, {useState} from 'react';
import "./Admin.css"
import AdminNav from './AdminNav';
import AdminAddItem from './AdminStore/AdminAddItem';
import AdminCategory from './AdminStore/AdminCategory';
import AdminDeleteItem from './AdminStore/AdminDeleteItem';
import AdminTime from './AdminStore/AdminTime';
import AdminUpdateItem from './AdminStore/AdminUpdate';
import AdminValue from './AdminStore/AdminValue';
// import AdminStore from './AdminStore/AdminStore';

const AdminPanel = () => {

    const [section, setSection] = useState("0");

    const changeSection = (e) => {
        console.log(e.target.id);
        
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
                {section === "4" && <AdminTime />}
                {section === "5" && <AdminValue />}
                {/* {section === 1 ? <AdminChar /> : (section === 2 ? <AdminShoop /> : <h2>Witaj, użyj panelu po lewej</h2>)} */}
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminPanel
