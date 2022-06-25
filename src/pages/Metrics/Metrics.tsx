import * as React from "react"
import useLocalStorage from 'react-use-localstorage';
import styles from "./Metrics.module.css"
import BMI,{BMIRisk} from "../../Tools/BMI";
import findWaterIntake from "../../Tools/WaterIntake";

export default function Metrics(){
const [userItem, setUserItem] = useLocalStorage('user', localStorage.getItem("user") ?? undefined);
const [exerciseItem, setExerciseItem] = useLocalStorage('exercise', localStorage.getItem("exercise") ?? undefined);
const [weightItem, setWeightItem] = useLocalStorage('weight', localStorage.getItem("weight") ?? undefined);

const todaysExercises = exerciseItem && exerciseItem.length > 0 ? JSON.parse(exerciseItem).exerciseList.filter((item:any)=>  item.date === new Date().toLocaleDateString()) : [];
const durationArr = todaysExercises.map((item:any)=>item.duration)
const todaysDuration = durationArr.length > 0 ? durationArr.reduce((partialSum:any, a:any) => partialSum + a, 0) : 0

    return(
            <div className={styles.container}>
                
                <div className={styles.card}>
                <h2 style={{textAlign:"center"}}>Metrics</h2>
                    {
                        userItem && userItem.length > 0 ? 
                        <Section label={"Max HR"} value={(220 - parseInt(JSON.parse(userItem).age)).toString()}>
                           Max Heart Rate is Estimated by taking 220 and subtracting your age 
                        </Section>:
                        null
                    }
                    {
                        userItem && userItem.length > 0 && weightItem && weightItem.length > 0 ?
                        <Section label={"BMI"} value={BMI(parseInt(JSON.parse(weightItem).weight),parseInt(JSON.parse(userItem).height)).toString()}>
                            Body mass index is away of using height and weight to calculate health risk.
                            <br/>
                            <br/>
                            <p>Your Current risk is 
                            <span style={{fontWeight:"bolder"}}>
                                {" "+BMIRisk(parseInt(JSON.parse(weightItem).weight),parseInt(JSON.parse(userItem).height))}
                            </span></p>
                            <br/>
                            <br/>
                            ** Note BMI doesnt take into account large amounts of muscle, young children or old age
                        </Section> : null
                    }
                    {
                        userItem && userItem.length > 0 ?
                        <Section label={"Recommended Water Intake (in Liters)"} value={findWaterIntake(JSON.parse(userItem).age, JSON.parse(userItem).sex,todaysDuration )}>
                            Daily water intake changes based off of age, sex, even heat of the day based on the information given we'd recommend drinking this amount (including water from food) today
                            <br></br>
                            <a href="https://www.omnicalculator.com/health/water-intake">based off information here</a>
                        </Section>:null
                    }
                    {
                        weightItem && weightItem.length > 0 ? 
                       <Section label={"Recommended Protein Intake"} value={(JSON.parse(weightItem).weight * .36).toString() + "grams" }>
                           The Recomended Protein intake for a sedentary adult is .36 times your weight
                           <br/>
                           <a href="https://www.health.harvard.edu/blog/how-much-protein-do-you-need-every-day-201506188096">based off information here</a>

                       </Section> :null
                    }
                </div>
            </div>)
}

const Section = (props:{value:any, label:any, children:any})=>{
const {label,value,children} = props
    return(<div className={styles.section}>
      <h4>{label}: <span> {value}</span></h4>
                        <p>{children}</p>
    </div>)

}