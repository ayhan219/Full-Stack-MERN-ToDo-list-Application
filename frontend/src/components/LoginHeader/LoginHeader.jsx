import React from 'react';
import './LoginHeader.css';
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const LoginHeader = () => {
  return (
    <div className="login-header">
      <div className="main-container">
        <div className="todolist-container">
          <h2 className="todolist-title">Todo Başlığı</h2>
          <p className="todolist-content">Burada todo içeriği yer alacak.</p>
          <div className="tools">
            <MdDelete />
            <MdModeEdit />
        </div>
        </div>
       
      </div>
    </div>
  );
};

export default LoginHeader;
