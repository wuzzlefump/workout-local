import * as React from "react"
import useLocalStorage from "react-use-localstorage";
import styles from "./Motivation.module.css"
import showToast from "../../components/showToast/showToast";
import { ToastContainer } from "react-toastify";

const list = require("./motivation.json")
export default function Motivation(){
const [userItem, setUserItem] = useLocalStorage('user', localStorage.getItem("user") ?? undefined);
const [goalItem, setGoalItem] = useLocalStorage('goal', localStorage.getItem("goal") ?? undefined);
const [quoteItem, setQuoteItem] = useLocalStorage('quote', localStorage.getItem("quote") ?? undefined);
const [goal,setGoal] = React.useState<string>("")
const [quote,setQuote] = React.useState<string>("")

const getRandomQuote = (newList:string[])=>{
    const length = newList.length-.1
    let randomInt = (max:number)=> Math.floor(Math.random() * max)
    return newList[randomInt(length)]
}
const [currentQuote,setCurrentQuote]=React.useState(getRandomQuote(list))
const nextQuote =()=>{
    if(quoteItem && quoteItem.length > 0){
        setCurrentQuote(getRandomQuote([...list,...JSON.parse(quoteItem).quoteList]))
    }else{
        setCurrentQuote(getRandomQuote(list))
    }
}
const addQuote = ()=>{
    if(quoteItem && quoteItem.length > 0){
        setQuoteItem(JSON.stringify({quoteList:[...JSON.parse(quoteItem).quoteList,`${quote} -yourself`]}))
        setQuote("")
        showToast("Quote Submitted","success")
    }else{
        setQuoteItem(JSON.stringify({quoteList:[`${quote} -yourself}`]}))
        setQuote("")
        showToast("Quote Submitted","success")
    }
}

const setNewGoal =()=>{
    setGoalItem(goal)
    showToast("Goal Set", "success")
}
    return(
            <div className={styles.container}>
                <ToastContainer/>
                <div className={styles.goalCard}>
                    <h3>Goal</h3>
                    {
                    goalItem && goalItem.length > 0 ? <div><p>{goalItem}</p><button onClick={()=>{setGoalItem("");showToast("Goal Removed","info")}}>clear goal</button></div>:
                    <div className={styles.goalCard2}><input value={goal} onChange={(e)=>{setGoal(e.target.value)}} placeholder="Goal"/>
                    <button className={styles.submit}  onClick={()=> setNewGoal()}>set goal</button></div>
                    }
                </div>
                <div className={styles.quoteCard}>{currentQuote}
                <button className={styles.submit} onClick={()=>nextQuote()}>Next Quote</button></div>
                <div className={styles.addCard}>add Motivation
                    <input value={quote} onChange={(e)=>setQuote(e.target.value)} />
                    <button className={styles.submit}  onClick={()=>addQuote()}> Add Quote</button>
                    <button className={styles.clear} onClick={()=>{setQuoteItem("");showToast("Quotes Removed","info")}}>clear homemade quotes</button>
                </div>
            </div>)
}