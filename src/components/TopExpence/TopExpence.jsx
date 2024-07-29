
import Styles from "./TopExpence.module.css"
import React, { useState } from "react";
import { useData } from "../DataContext";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area
} from "recharts";


export default function TopExpense() {
  
    const borderRadius = '50px 50px 50px 50px';
    const {array} =useData();
    const data = array.map((ele) => {
      return { name: ele.Category, value: Number(ele.Price) };
  });
   const redefinedData=[{name:"Entertainment" ,value:0},{name:"Food" ,value:0},{name:"Travel" ,value:0}];
   for(let i=0;i<data.length;i++){
    for(let j=0;j<redefinedData.length;j++){
      if(redefinedData[j].name===data[i].name){
        redefinedData[j].value=redefinedData[j].value+data[i].value;
      }
    }
   }  
  return (
    <div className={Styles.main}>
    <div className={Styles.TopName}>Top Expenses</div>
    <div className={Styles.BarChart}>
    <ComposedChart
      layout="vertical"
      width={450}
      height={400}
      data={redefinedData}
      margin={{
        top: 10,
        right: 10,
        bottom: 10
      }}
      className={Styles.component}
    >
      <CartesianGrid stroke={false}/>
      <XAxis type="number" axisLine={false} tick={false} className={Styles.name} />
      <YAxis dataKey="name" type="category"  axisLine={false} tickLine={false} className={Styles.name} />
      <Tooltip className={Styles.component}/>
      <Legend className={Styles.Bar}/>
      <Bar dataKey="value" barSize={21} fill="#8784D2"  className={Styles.Bar} rx={borderRadius}/>
    </ComposedChart>
    </div>
    </div>
  );
}
