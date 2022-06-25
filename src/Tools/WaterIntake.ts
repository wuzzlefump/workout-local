export default function findWaterIntake(age:number,sex:string,exercise?:number){
    let intake = 0

    if(exercise){
        intake = exercise * .5
    }

    if( age < 4 ){
        return 1.3 + intake 
    }else if(age > 3 && age < 9){
        return 1.7 + intake
    }else if(age > 8 && age < 14){
        return sex === "F" ? 2.1 + intake : 2.4  + intake
    }else if(age > 13  && age < 19 ){
        return sex === "F"? 2.3 + intake : 3.3  + intake
    }else{
        return sex === "F" ? 2.7 + intake : 3.7  + intake
    }
}