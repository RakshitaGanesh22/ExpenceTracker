
import React, { useState, useEffect } from 'react';
import Styles from "./Expenses/Expenses.module.css";
import { useData } from './DataContext';
export default function HandleEdit() {
    const [totalExpense, setTotal] = useState(0);
    const [price, setPrice] = useState();
    const [title, setTitle] = useState();
    const [category, setCategory] = useState();
    const [date, setDate] = useState();
    const [openModal, setOpenModal] = useState(false);
    const {array, setArrayData,setValue,value} = useData();
    useEffect(() => {
        console.log("Array updated:", array);
    }, [array]);

    function HandleSubmit(event) {
        event.preventDefault();
        let formData = {
            Title: title,
            Price: price,
            Category: category,
            Date: date
        };
        
        if(value-Number(price)<0){
            alert("You Don't Have enough Wallet Balance");
            setTitle();
            setPrice();
            setCategory();
            setDate();
            setOpenModal(false);
            
        }
        else{
            setTotal((prev)=>{return prev+Number(price)});
            setArrayData(prev => [...prev, formData]);
            setValue((prev)=>{return prev-price});
            setTitle();
            setPrice();
            setCategory();
            setDate();
            setOpenModal(false);
        }
        
    }

    function CancelModal() {
        setTitle();
        setPrice();
        setCategory();
        setDate();
        setOpenModal(false); 
    }

    function HandlePrice(event) {
        let pric = event.target.value;
        setPrice(pric);
    }

    function HandleTitle(event) {
        let titl = event.target.value;
        setTitle(titl);
    }

    function HandleCategory(event) {
        let catego = event.target.value;
        setCategory(catego);
    }

    function HandleDate(event) {
        let date = event.target.value;
        setDate(date);
    }
    function ShowModal(){setOpenModal(true)}
    return (
        <div>
            <div className={Styles.Expense}>
                <div className={Styles.Expenseb}>Expenses: <span className={Styles.ExpenseBalance}>₹{totalExpense}</span></div>
                <button className={Styles.AddInc} onClick={ShowModal}>+ Add Expense</button>
                {!openModal? <div></div>: 
            <div className={Styles.modalOpen}>
                <form onSubmit={HandleSubmit} className={Styles.form}>
                    <div className={Styles.addExpense}>Add Expenses</div>
                    <div>
                        <input
                            placeholder="Title"
                            type="text"
                            value={title}
                            onChange={HandleTitle}
                            className={Styles.addTitle}
                            required
                        />
                        <input
                            placeholder="Price"
                            type="number" 
                            value={price}
                            onChange={HandlePrice}
                            className={Styles.addPrice}
                            required
                        />
                    </div>
                    <div>
                        <select value={category} onChange={HandleCategory} className={Styles.addCategory} required>
                            <option value="">Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                        <input
                            placeholder="dd/mm/yyyy"
                            type="date"
                            value={date}
                            onChange={HandleDate}
                            className={Styles.addData}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className={Styles.AddButton}>Add Expense</button>
                        <button type="button" className={Styles.CancelButton} onClick={CancelModal}>Cancel</button>
                    </div>
                </form>
            </div>}
            </div>
            
        </div>
    );
}
