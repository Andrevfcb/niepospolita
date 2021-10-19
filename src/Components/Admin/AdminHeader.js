import React from 'react';
import "./AdminHeader.css";
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    return (
        <div className="admin-header">
            <Link to="/">Wróć na stronę główną</Link>
        </div>
    )
}

export default AdminHeader
