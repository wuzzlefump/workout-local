import * as React from "react"
import { useCookies } from 'react-cookie';
import DatePicker from "react-datepicker";
import styles from "./Food.module.css"
import "react-datepicker/dist/react-datepicker.css";
import showToast from "../../components/showToast/showToast";
import { ToastContainer } from "react-toastify";
import neverExpire from "../../Tools/NeverExpire";


export default function Food(){
const [foodCookies, setFoodCookie,removeFoodCookies] = useCookies(['food']);
const [startDate,setStartDate] = React.useState<any>(new Date())
const [foodText, setFoodText] = React.useState<string>("")
const submitFood = ()=>{
    let foodObj = {date:startDate.toLocaleDateString(undefined,{}), food:foodText}
    if(foodCookies.food){
        setFoodCookie("food",{...foodObj, foodList:[...foodCookies.food.foodList,foodObj]},{path:"/", maxAge:neverExpire()})
        showToast("Food Submitted","success")
    }else{
        
        setFoodCookie("food",{...foodObj, foodList:[foodObj]},{path:"/", maxAge:neverExpire()})
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
                
                { foodCookies.food ?
                <div className={styles.listCard}>
                    <h3>Food List</h3>
                    {
                        foodCookies.food.foodList.length > 0 ?
                        foodCookies.food.foodList.filter((item:any) => item.date === startDate.toLocaleDateString(undefined,{})).map((item:any) => (
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
                        <button className={styles.clear} onClick={()=>{removeFoodCookies("food",{path:"/"});showToast("Cookies Removed","info")}}>Remove Food Cookies</button>
                    </div>
                </div>
            </div>)
}