import * as React from "react"
import styles from "./Home.module.css"
import useLocalStorage from 'react-use-localstorage';
import Select from "react-select"; 
import { ToastContainer } from "react-toastify";
import showToast from "../../components/showToast/showToast";

export default function Home(){
type SelectOption = {label:string; value:string}
const [userItem, setUserItem] = useLocalStorage('user', localStorage.getItem("user") ?? undefined);
const [name, setName] = React.useState<string>("")
const [height, setHeight] = React.useState<string>("0")
const [age, setAge] = React.useState<string>("0")
const [sex, setSex] = React.useState<SelectOption>({label:"",value:""})

const submitUser=()=>{
let payload = {
    name,
    height,
    sex:sex.value,
    age
}
setUserItem(JSON.stringify(payload))
showToast("Info Submitted","success")
}
const clearCookies=()=>{
setUserItem("")
showToast("User Storage Removed", "info")
}

    return(
            <div className={styles.container}>
                <ToastContainer/>
                {userItem && userItem.length > 0  ?
                 <div className={styles.currentUserCard}>
                    <h2>{JSON.parse(userItem).name}</h2>
                    <h3>Height: {JSON.parse(userItem).height} inches</h3>
                    <h3>Age: {JSON.parse(userItem).age} years</h3>
                    <h3>Sex: {JSON.parse(userItem).sex}</h3>
                    <h4>Welcome to Workout Cookies!</h4>
                    <button className={styles.submit} onClick={()=>clearCookies()} > Clear Storage</button>
                    
                </div>
                  :
                <div className={styles.newUserCard}>
                    <h2>New user form</h2>
                        <label style={{textAlign:"start"}}>Name</label>
                        <input onChange={(e)=>{setName(e.target.value)}} value={name} placeholder="Name..."/>
                        <label style={{textAlign:"start"}} >Height</label>
                        <input onChange={(e)=>setHeight(e.target.value)} value={height} placeholder="Height in inches.." type={"number"}/>
                        <label style={{textAlign:"start"}}>Age</label>
                        <input onChange={(e)=>setAge(e.target.value)} value={age} placeholder="Age.." type={"number"}/>
                        <label style={{textAlign:"start"}}>Sex</label>
                        <Select placeholder="Sex..."  onChange={(e)=>{setSex(e!)}} value={sex} options={[
                            {label:"M",value:"M"},
                            {label:"F",value:"F"},
                            {label:"Other",value:"Other"}
                            ]}/>
                        <button className={styles.submit} onClick={()=>submitUser()}>Submit</button>
                </div>}
            </div>)
}