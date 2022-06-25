import * as React from "react"
import { useCookies } from 'react-cookie';
import DatePicker from "react-datepicker";
import styles from "./Workout.module.css"
import "react-datepicker/dist/react-datepicker.css";
import showToast from "../../components/showToast/showToast";
import { ToastContainer } from "react-toastify";
import neverExpire from "../../Tools/NeverExpire";


export default function Workout(){
    const [exerciseCookies, setExerciseCookie,removeExerciseCookies] = useCookies(['exercise']);
    const [startDate,setStartDate] = React.useState<any>(new Date())
    const [exerciseText, setExerciseText] = React.useState<string>("")
    const [duration, setDuration] = React.useState<string>("0")
    const submitExercise = ()=>{
        let exerciseObj = {date:startDate.toLocaleDateString(undefined,{}), exercise:exerciseText, duration:duration? parseInt(duration): 0 }
        if(exerciseCookies.exercise){
            setExerciseCookie("exercise",{...exerciseObj, exerciseList:[...exerciseCookies.exercise.exerciseList,exerciseObj]},{path:"/",maxAge:neverExpire()})
            showToast("Exercise Submitted","success")
        }else{
            setExerciseCookie("exercise",{...exerciseObj, exerciseList:[exerciseObj]},{path:"/",maxAge:neverExpire()})
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
                    
                    { exerciseCookies.exercise ?
                    <div className={styles.listCard}>
                        <h3>Exercise List</h3>
                        {
                            exerciseCookies.exercise.exerciseList.length > 0 ?
                            exerciseCookies.exercise.exerciseList.filter((item:any) => item.date === startDate.toLocaleDateString(undefined,{})).map((item:any) => (
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
                            <button className={styles.clear} onClick={()=>{removeExerciseCookies("exercise",{path:"/"}); showToast("Exercise Cookies Removed","info")}}>Remove Cookies</button>
                        </div>
                    </div>
                </div>)
}