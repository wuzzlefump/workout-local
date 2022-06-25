import * as React from "react"
import useLocalStorage from 'react-use-localstorage';
import DatePicker from "react-datepicker";
import styles from "./Food.module.css"
import "react-datepicker/dist/react-datepicker.css";
import showToast from "../../components/showToast/showToast";
import { ToastContainer } from "react-toastify";


export default function Food(){
const [foodItem, setFoodItem] = useLocalStorage("food", localStorage.getItem("food") ?? undefined)
const [startDate,setStartDate] = React.useState<any>(new Date())
const [foodText, setFoodText] = React.useState<string>("")
const submitFood = ()=>{
    let foodObj = {date:startDate.toLocaleDateString(undefined,{}), food:foodText}
    if(foodItem && foodItem.length > 0){
        setFoodItem(JSON.stringify({...foodObj, foodList:[...JSON.parse(foodItem).food.foodList,foodObj]}))
        showToast("Food Submitted","success")
    }else{
        
        setFoodItem(JSON.stringify({...foodObj, foodList:[foodObj]}))
        showToast("Food Submitted","success")
    }
}

    return(
            <div className={styles.container}>
                <ToastContainer/>
                <div className={styles.headerCard}>
                <h3 style={{marginBottom:"40px"}}>Choose Day to look at : {startDate.toLocaleDateString()}</h3>
                <DatePicker value={startDate} onChange={(date:any)=>{ setStartDate(date)}}></DatePicker>
                </div>
                
                { foodItem && foodItem.length > 0 ?
                <div className={styles.listCard}>
                    <h3>Food List</h3>
                    {
                        JSON.parse(foodItem).foodList.length > 0 ?
                        JSON.parse(foodItem).foodList.filter((item:any) => item.date === startDate.toLocaleDateString(undefined,{})).map((item:any) => (
                         <p>{item.food}</p>
                        )) :
                        "no food"
                    }
                </div>: null}
               
                <div className={styles.addCard}>
                    Add Food to Day
                    <textarea value={foodText} onChange={(e)=>setFoodText(e.target.value)}/>
                    <div className={styles.actionContainer}>
                        <button className={styles.submit} onClick={()=>{submitFood()}} >Submit</button>
                        <button className={styles.clear} onClick={()=>{setFoodItem(""); showToast("Food Removed","info")}}>Remove Food</button>
                    </div>
                </div>
            </div>)
}