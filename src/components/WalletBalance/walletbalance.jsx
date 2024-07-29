import { useState,useEffect } from "react";
import Styles from "./walletBalance.module.css";
import { useData } from '../DataContext';
export default function WalletBalance(){
    const {array, setArrayData,setValue,value,totalExpense,setTotal} = useData();
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("expensesData")) || [];
        const storeValue=JSON.parse(localStorage.getItem("remaining")) || 5000;
        const storeExpense=JSON.parse(localStorage.getItem("payed"))||0;
        setValue(Number(storeValue));
        setTotal(Number(storeExpense))
        setArrayData(storedData);
        const total = storedData.reduce((acc, item) => acc + Number(item.Price), 0);
        setTotal(total);
      }, [setArrayData,setValue,setTotal]);
    
      useEffect(() => {
        localStorage.setItem("expensesData", JSON.stringify(array));
        localStorage.setItem("remaining", JSON.stringify(value));
        localStorage.setItem("payed",JSON.stringify(totalExpense));
      }, [array,value,totalExpense]);
    const[inputVlue,setInput]=useState(0);
    const[isModalOpen,setModalOpen]=useState(false);
    const handleSubmit=()=>{
        setValue((prev)=>{return Number(prev)+Number(inputVlue)});
        setInput(0);
        setModalOpen(false);
    }
    return(
        <div>
            <div className={Styles.Wallet}>
            <div className={Styles.walletb}>Wallet Balance: <span className={Styles.walleteBalance}>₹{value}</span></div>
            <button className={Styles.AddInc} onClick={()=>{setModalOpen(true)}}>+ Add Income</button></div>
            {!isModalOpen?<div></div>:<div className={Styles.MainDiv}><div className={Styles.form}>
                <div className={Styles.balance}>Add Balance</div>
        <input type="number" onChange={(e)=>{setInput(e.target.value)}}className={Styles.input} required/>
        <button className={Styles.addBalance} onClick={handleSubmit}>Add Balance</button>
        <button onClick={()=>{setModalOpen(false)}} className={Styles.CloseButton}>Cancel</button>
    </div></div>}
    </div>
    )       
        
}