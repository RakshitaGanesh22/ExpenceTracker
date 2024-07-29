import WalletBalance from "../WalletBalance/walletbalance";
import Piechart from "../Piechart/Piechart.tsx";
import Expences from "../Expenses/Expenses";
import Styles from "./DisplayfM.module.css";
export default function DisplayFM(){
    
    return(
        <div className={Styles.DisplayFM}>
            <div><WalletBalance /></div>
            <div><Expences /></div>
            <div><Piechart /></div>
        </div>
    )
}