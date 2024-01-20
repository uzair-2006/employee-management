'use client'
import React from 'react';
const LogoutButton = (props) => {
    return (
        <button onClick={props.onClick} className='py-[10px]  rounded  shadow-md font-semibold text-sm text-white  px-[15px] bg-red-500 hover:bg-red-400'>Logout</button>
    );
}

const AddEmployeeButtton = (props) => {
    return (
        <button onClick={props.onClick} className='py-[10px]  rounded  shadow-md font-semibold text-sm text-white  px-[15px] bg-green-500 hover:bg-green-400'>Add Employee</button>
    );
}



export { LogoutButton, AddEmployeeButtton };
