import * as React from "react"
import styles from "./Weight.module.css"
import Graph from "../../components/Graph/Graph";
import showToast from "../../components/showToast/showToast";
import { ToastContainer } from "react-toastify";
import useLocalStorage from "react-use-localstorage";

const moment = require("moment")

export default function Weight(){

    const [userItem, setUserItem] = useLocalStorage('user', localStorage.getItem("user") ?? undefined);
    const [weightItem, setWeightItem] = useLocalStorage('weight', localStorage.getItem("weight") ?? undefined);


const [weight,setWeight]=React.useState<string>("")
const submitWeight =()=>{
    if(weightItem && weightItem.length > 0){
        let newWeight = weight ?? 0
        let weightObj = {date: new Date().toLocaleDateString(), weight:parseFloat(newWeight) }
        setWeightItem(JSON.stringify({...weightObj, all:[...JSON.parse(weightItem).all,weightObj]}))
        showToast("Weight Submitted","success")
    }else{
        let newWeight = weight ?? 0
        let weightObj = {date: new Date().toLocaleDateString(), weight:parseFloat(newWeight) }
        setWeightItem(JSON.stringify({...weightObj, all:[weightObj]}))
        showToast("Weight Submitted","success")
    }
}
const labels = weightItem && weightItem.length > 0 ? JSON.parse(weightItem).all.map((time: any, key:number)=>time.date + "("+(key + 1).toString()+")"):[]
const datasets = weightItem && weightItem.length > 0  ? [{label: "Weight (lbs)",data:JSON.parse(weightItem).all.map((item:any)=>item.weight), borderColor:"green", backgroundColor:"green" }]:[]
const graphData = {labels:labels, datasets:datasets} 
const clearWeightCookies = ()=>{
    setWeightItem("")
    showToast("Weigh Ins Removed","info")
}

    return(
            <div className={styles.container}>
                <ToastContainer/>
                {
                    userItem && userItem.length > 0  ? <div className={styles.currentUserCard}>
                        <h1>Track Your Weight</h1>
                    <div>
                        {weightItem && weightItem.length > 0 ? <Graph
                         options={{plugins:{legend:{position:"bottom" as const},title:{display:true, text:"Weight"}}, responsive:true}}
                         data={graphData}
                          />: "Enter your weight to track it on the graph"}
                          </div>                                    
                        <input placeholder="weight" type={"number"} value={weight} onChange={(e)=> setWeight(e.target.value)} ></input>
                        <div className={styles.actionContainer}>
                            <button onClick={()=>clearWeightCookies()} className={styles.clear}>
                                Clear Weight Cookies
                            </button>
                            <button onClick={()=> submitWeight()} className={styles.submittwo}>
                                Submit
                            </button>
                        </div>
                    </div>
                    : <div className={styles.newUserCard}>Enter Your User information on the home page first</div>
                }
            </div>)
}