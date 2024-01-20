
import React from 'react';

const Spinner = () => {
    return (
        <div className=' fixed top-0 backdrop-blur-md  w-full h-[100vh]  flex items-center justify-center'>
            <div className=' animate-spin h-[70px] w-[70px]  rounded-full border-[10px] border-dashed  border-indigo-500    ' ></div>
        </div>
    );
};

export default Spinner;
