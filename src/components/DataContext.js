import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [array, setArrayData] = useState([]);
    const [value,setValue]=useState(5000);
    const[totalExpense,setTotal]=useState(0)
    return (
        <DataContext.Provider value={{ array, setArrayData,value,setValue,totalExpense,setTotal }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
