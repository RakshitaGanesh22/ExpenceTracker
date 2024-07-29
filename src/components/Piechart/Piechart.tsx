import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./Piechart.css";
import { useData } from "../DataContext";


export default function Piechart() {
  const[foodv,setFoodV]=useState(10);
  const[entertainv,entertainvSet]=useState(0);
  const[travelv,TravelsetV]=useState(0);
  const {array} =useData();
    const data = array.map((ele) => {
      return { name: ele.Category, value: Number(ele.Price) };
  });
   const redefinedData=[{name:"Food" ,value:0},{name:"Entertainment" ,value:0},{name:"Travel" ,value:0}];
   for(let i=0;i<data.length;i++){
    for(let j=0;j<redefinedData.length;j++){
      if(redefinedData[j].name===data[i].name){
        redefinedData[j].value=redefinedData[j].value+data[i].value;
      }
    }
   } 
console.log(data);
  const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
  
  const COLORS = ["#A000FF", "#FF9304", "#FDF006"];
  return (
    <div className="mainbox">
    <PieChart width={200} height={200} className="Piechart">
      <Pie
        data={redefinedData}
        cx={100}
        cy={100}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {redefinedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    <div className="MainClass">
        <div style={{display:"flex", width:"58px"}}><span className="Food"></span><span className="Foodl">Food</span></div>
        <div style={{display:"flex", width:"111px"}}><span className="Entertainment"></span><span className="Entertainmentl">Entertainment</span></div>
        <div style={{display:"flex", width:"64px"}}><span className="Travel"></span><span className="Travell">Travel</span></div>
    </div>
    </div>
  );
}
