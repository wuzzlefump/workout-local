import * as React from "react"
import styles from "./Layout.module.css"


export default function Layout(props:{children:any, cheat:any}){
    const{children} = props
    type linkTypes = {label:string;
    path: "home"|"food"|"weight"|"workout"|"motivation"|"metrics"}
    const linkList: linkTypes[] = [
    {label:"Home", path:"home"},
    {label:"Food Journal", path:"food"},
    {label:"Weight Tracker", path:"weight"}, 
    {label:"Workout Tracker", path:"workout"},
    {label:"Motivation", path:"motivation"},
    {label:"Metrics", path:"metrics"}
    ]
    return(
        <div className={styles.body}>
            <nav className={styles.header}>
               Workout Local 1.0
            </nav>
            <div className={styles.container} >
                <nav className={styles.sideNav}>
                    <div className={styles.sideNavContent}>
                        {
                            linkList.map((link, key)=>{
                                return <button key={key} onClick={()=> {props.cheat!.nav(link.path) } }>
                                    {link.label}
                                </button>
                            })
                        }
                    </div>
                </nav>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}