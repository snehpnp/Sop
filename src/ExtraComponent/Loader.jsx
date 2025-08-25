import React, { useEffect, useState } from 'react';
import RiseLoader from 'react-spinners/RiseLoader';

const Loader = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        setIsDarkTheme(storedTheme === "dark");
    }, []);

    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "50vh" }} >
            {
                isDarkTheme ? (
                    <RiseLoader color="#ffffff" />
                ) : (
                    <div className="lds-spinner">
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                )
            }
        </div>
    );
};

export default Loader;
