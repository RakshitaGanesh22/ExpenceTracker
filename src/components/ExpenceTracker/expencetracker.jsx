import DisplayFM from "../DisplayfM/DisplayfM"
import DisplaySM from "../DisplaysM/DisplaysM"  
import Styles from "./expencetracker.module.css"
import { DataProvider } from "../DataContext.js";
export default function ExpenceTracker(){
    return(
        <DataProvider>
        <div className={Styles.ExpenceTracker}>
            <div className={Styles.Expence}>Expense Tracker</div>
            <DisplayFM />
            <DisplaySM />
        </div>
        </DataProvider>
    )
}