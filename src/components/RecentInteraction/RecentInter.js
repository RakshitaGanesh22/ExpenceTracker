import { useState, useEffect } from "react";
import Styles from "./RecentInter.module.css";
import { useData } from "../DataContext";
import { PiPizzaDuotone } from "react-icons/pi";
import { IoIosGift } from "react-icons/io";
import { CiRollingSuitcase, CiCircleRemove } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";

export default function RecentInt() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const { array, setArrayData, setValue, value ,totalExpense,setTotal} = useData();
  
  const totalPages = Math.ceil(array.length / itemsPerPage);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date1, setDate] = useState("");
  const [editElement, setEditElement] = useState(null);
  const [openModal, setOpenModal] = useState(false);
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

  useEffect(() => {
    setDisablePrev(page === 1);
    setDisableNext(page === totalPages);
  }, [page, totalPages]);

  const [disablePrev, setDisablePrev] = useState(page === 1);
  const [disableNext, setDisableNext] = useState(page === totalPages);

  const handleDelete = (element) => {
    setValue((prev)=>{return Number(prev)+Number(element.Price)})
    setTotal((prev)=>{return Number(prev)-Number(element.Price)});
    setArrayData((prev) => prev.filter((item) => item.Title !== element.Title));

  };

  const handleEdit = (element) => {
    
    setEditElement(element);
    setTitle(element.Title);
    setPrice(element.Price);
    setCategory(element.Category);
    setDate(element.Date);
    setOpenModal(true);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = {
      Title: title,
      Price: price,
      Category: category,
      Date: date1,
    };
    
    if (value - Number(price) < 0) {
      alert("You Don't Have enough Wallet Balance");
    } else {
      if (editElement) {
        setArrayData((prev) =>
          prev.map((item) =>
            item.Title === editElement.Title ? formData : item
          )
        );
      } else {
        setArrayData((prev) => [...prev, formData]);
      }
      setValue((prev)=>{return Number(prev)+Number(editElement.Price)})
      setValue((prev)=>{return Number(prev)-Number(formData.Price)})
      setTotal((prev)=>{return Number(prev)-Number(editElement.Price)});
      setTotal((prev)=>{return Number(prev)+Number(formData.Price)});
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");
    setEditElement(null);
    setOpenModal(false);
  };

  const TableData = ({ element }) => {
    const date = new Date(element.Date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const modifiedDate = date.toLocaleDateString("en-US", options);

    const categoryIcons = {
      Food: <PiPizzaDuotone className={Styles.Icons} />,
      Entertainment: <IoIosGift className={Styles.Icons} />,
      Travel: <CiRollingSuitcase className={Styles.Icons} />,
    };

    return (
      <tr className={Styles.tabledata}>
        <td className={Styles.flexItems}>
          <div className={Styles.samosa}>
            {categoryIcons[element.Category]}
          </div>
          <div className={Styles.titleDate}>
            <div className={Styles.flexStart}>{element.Title}</div>
            <div className={Styles.DateStyle}>{modifiedDate}</div>
          </div>
        </td>
        <td className={Styles.ItemArrangement}>
          <div className={Styles.price}>₹{element.Price}</div>
          <button
            className={Styles.button}
            onClick={() => handleDelete(element)}
          >
            <div className={Styles.removeIcon}>
              <CiCircleRemove className={Styles.remove} />
            </div>
          </button>
          <button className={Styles.button} onClick={() => handleEdit(element)}>
            <div className={Styles.editt}>
              <MdOutlineEdit className={Styles.Edit} />
            </div>
          </button>
        </td>
      </tr>
    );
  };

  const currentData = array.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className={Styles.main}>
      <div className={Styles.transaction}>Recent Transactions</div>
      <div className={Styles.table}>
        <table className={Styles.mainTabl}>
          {currentData.map((ele, index) => (
            <TableData key={index} element={ele} />
          ))}
        </table>
        <div className={Styles.divi}>
          <ul className={Styles.list}>
            <li>
              <button
                onClick={handlePrev}
                disabled={disablePrev}
                className={Styles.list1}
              >
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5L0.646447 4.64645L0.292893 5L0.646447 5.35355L1 5ZM13 5.5C13.2761 5.5 13.5 5.27614 13.5 5C13.5 4.72386 13.2761 4.5 13 4.5V5.5ZM4.64645 0.646447L0.646447 4.64645L1.35355 5.35355L5.35355 1.35355L4.64645 0.646447ZM0.646447 5.35355L4.64645 9.35355L5.35355 8.64645L1.35355 4.64645L0.646447 5.35355ZM1 5.5H13V4.5H1V5.5Z"
                    fill="#222222"
                  />
                </svg>
              </button>
            </li>
            <li className={Styles.list2}>{page}</li>
            <li>
              <button
                onClick={handleNext}
                disabled={disableNext}
                className={Styles.list1}
              >
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 5L13.3536 4.64645L13.7071 5L13.3536 5.35355L13 5ZM1 5.5C0.723858 5.5 0.5 5.27614 0.5 5C0.5 4.72386 0.723858 4.5 1 4.5V5.5ZM9.35355 0.646447L13.3536 4.64645L12.6464 5.35355L8.64645 1.35355L9.35355 0.646447ZM13.3536 5.35355L9.35355 9.35355L8.64645 8.64645L12.6464 4.64645L13.3536 5.35355ZM13 5.5H1V4.5H13V5.5Z"
                    fill="#222222"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
      {openModal && (
        <div className={Styles.modalOpen}>
          <form onSubmit={handleSubmit} className={Styles.form}>
            <div className={Styles.addExpense}>Edit Expense</div>
            <div>
              <input
                placeholder="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={Styles.addTitle}
                required
              />
              <input
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={Styles.addPrice}
                required
              />
            </div>
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={Styles.addCategory}
                required
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Entertainment">Entertainment</option>
              </select>
              <input
                placeholder="Date"
                type="date"
                value={date1}
                onChange={(e) => setDate(e.target.value)}
                className={Styles.addData}
                required
              />
            </div>
            <div>
              <button type="submit" className={Styles.AddButton}>
                Add Expense
              </button>
              <button type="button" className={Styles.CancelButton} onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
