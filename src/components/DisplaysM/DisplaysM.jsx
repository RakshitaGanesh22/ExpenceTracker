import RecentInt from "../RecentInteraction/RecentInter.js";
import TopExpense from "../TopExpence/TopExpence";
import Styles from "./DisplaysM.module.css"
export default function DisplaySM(){
    
    return(
        <div className={Styles.Dmain}>
            <div><RecentInt /></div>
            <div><TopExpense /></div>
        </div>
    )
}