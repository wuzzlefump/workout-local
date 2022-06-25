export default function BMI(weight:number,height:number){
    return weight/height/height*703
}

export function BMIRisk(weight:number,height:number){
    let bmi = BMI(weight,height)
    if(bmi < 18.5){
        return "Underweight"
    }else if(bmi > 18.4 && bmi< 25){
        return "Normal"
    }else if(bmi>24.9 && bmi < 29.9){
        return "Overweight"
    }else{
        return "Obese"
    }

}