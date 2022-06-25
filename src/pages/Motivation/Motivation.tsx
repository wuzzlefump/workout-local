import * as React from "react"
import Layout from "../../components/Layout/Layout"
import { useCookies } from 'react-cookie';
import styles from "./Motivation.module.css"
import showToast from "../../components/showToast/showToast";
import { ToastContainer } from "react-toastify";
import neverExpire from "../../Tools/NeverExpire";
const list = require("./motivation.json")
export default function Motivation(){
const [cookies, setCookie] = useCookies(['user']);
const [quoteCookies, setQuoteCookie, removeQuoteCookie] = useCookies(['quote']);
const [goalCookies, setGoalCookie, removeGoalCookies] = useCookies(['goal']);
const [goal,setGoal] = React.useState<string>("")
const [quote,setQuote] = React.useState<string>("")

const getRandomQuote = (newList:string[])=>{
    const length = newList.length-.1
    let randomInt = (max:number)=> Math.floor(Math.random() * max)
    return newList[randomInt(length)]
}
const [currentQuote,setCurrentQuote]=React.useState(getRandomQuote(list))
const nextQuote =()=>{
    if(quoteCookies.quote){
        setCurrentQuote(getRandomQuote([...list,...quoteCookies.quote.quoteList]))
    }else{
        setCurrentQuote(getRandomQuote(list))
    }
}
const addQuote = ()=>{
    if(quoteCookies.quote){
        setQuoteCookie("quote",{quoteList:[...quoteCookies.quote.quoteList,`${quote} -yourself`]}, {path:"/",maxAge:neverExpire()})
        setQuote("")
        showToast("Quote Submitted","success")
    }else{
        setQuoteCookie("quote",{quoteList:[`${quote} -yourself}`]},{path:"/",maxAge:neverExpire()})
        setQuote("")
        showToast("Quote Submitted","success")
    }
}

const setNewGoal =()=>{
    setGoalCookie("goal",goal,{path:"/", maxAge:neverExpire()})
    showToast("Goal Set", "success")
}
    return(
            <div className={styles.container}>
                <ToastContainer/>
                <div className={styles.goalCard}>
                    <h3>Goal</h3>
                    {
                    goalCookies.goal ? <div><p>{goalCookies.goal}</p><button onClick={()=>{removeGoalCookies("goal",{path:"/"});showToast("Goal Cookies Removed","info")}}>clear goal</button></div>:
                    <div className={styles.goalCard2}><input value={goal} onChange={(e)=>{setGoal(e.target.value)}} placeholder="Goal"/>
                    <button className={styles.submit}  onClick={()=> setNewGoal()}>set goal</button></div>
                    }
                </div>
                <div className={styles.quoteCard}>{currentQuote}
                <button className={styles.submit} onClick={()=>nextQuote()}>Next Quote</button></div>
                <div className={styles.addCard}>add Motivation
                    <input value={quote} onChange={(e)=>setQuote(e.target.value)} />
                    <button className={styles.submit}  onClick={()=>addQuote()}> Add Quote</button>
                    <button className={styles.clear} onClick={()=>{removeQuoteCookie("quote",{path:"/"});showToast("Quote Cookies Removed","info")}}>clear homemade quotes</button>
                </div>
            </div>)
}