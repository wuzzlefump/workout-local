import * as React from "react"
import DatePicker from "react-datepicker";
import styles from "./Workout.module.css"
import "react-datepicker/dist/react-datepicker.css";
import showToast from "../../components/showToast/showToast";
import { ToastContainer } from "react-toastify";
import useLocalStorage from "react-use-localstorage";

export default function Workout(){
    const [exerciseItem, setExerciseItem] = useLocalStorage('exercise', localStorage.getItem("exercise") ?? undefined);
    const [startDate,setStartDate] = React.useState<any>(new Date())
    const [exerciseText, setExerciseText] = React.useState<string>("")
    const [duration, setDuration] = React.useState<string>("0")
    const submitExercise = ()=>{
        let exerciseObj = {date:startDate.toLocaleDateString(undefined,{}), exercise:exerciseText, duration:duration? parseInt(duration): 0 }
        if(exerciseItem  && exerciseItem.length > 0 ){
            setExerciseItem(JSON.stringify({...exerciseObj, exerciseList:[...JSON.parse(exerciseItem).exercise.exerciseList,exerciseObj]}))
            showToast("Exercise Submitted","success")
        }else{
            setExerciseItem(JSON.stringify({...exerciseObj, exerciseList:[exerciseObj]}))
            showToast("Exercise Submitted","success")
        }
    }
    
        return(
                <div className={styles.container}>
                    <ToastContainer/>
                    <div className={styles.headerCard}>
                    <h3 style={{marginBottom:"40px"}}>Choose Day to look at : {startDate.toLocaleDateString()}</h3>
                    <DatePicker value={startDate} onChange={(date:any)=>{ setStartDate(date)}}></DatePicker>
                    </div>
                    
                    { exerciseItem && exerciseItem.length > 0 ?
                    <div className={styles.listCard}>
                        <h3>Exercise List</h3>
                        {
                            JSON.parse(exerciseItem).exerciseList.length > 0 ?
                            JSON.parse(exerciseItem).exerciseList.filter((item:any) => item.date === startDate.toLocaleDateString(undefined,{})).map((item:any) => (
                             <p>{item.exercise + ":   "} <span>{item.duration + "hour(s)"}</span></p>
                            )) :
                            "no exercises"
                        }
                    </div>: null}
                   
                    <div className={styles.addCard}>
                        Add exercise to Day
                        <label>Duration (in hours)</label>
                        <input value={duration} onChange={(e)=>{setDuration(e.target.value)}} type={"number"}/>
                        <label>Exercise</label>
                        <textarea value={exerciseText} onChange={(e)=>setExerciseText(e.target.value)}/>
                        <div className={styles.actionContainer}>
                            <button className={styles.submit} onClick={()=>{submitExercise()}} >Submit</button>
                            <button className={styles.clear} onClick={()=>{setExerciseItem(""); showToast("Exercises Removed","info")}}>Remove Cookies</button>
                        </div>
                    </div>
                </div>)
}