import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


export default function Graph(props:{options:{responsive:boolean,plugins:{legend:{position:"left"|"top"|"right"|"bottom"},title:{display:boolean,text:string}}},
data:{labels:string[], datasets:{label:string,data:number,borderColor:string, backgroundColor:string }[] }}){

    return(<Line
        options={props.options}
        data={props.data}
    />)
}