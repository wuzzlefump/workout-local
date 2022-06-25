import * as React from "react";
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Food from './pages/Food/Food';
import Weight from './pages/Weight/Weight';
import Workout from './pages/Workout/Workout';
import Metrics from "./pages/Metrics/Metrics";
import Motivation from './pages/Motivation/Motivation';
import Model, {Provider} from "@expressive/mvc"

type PossibleLocations = "home"|"food"|"weight"|"workout"|"motivation";

function App() {

  const possibleLocations = {
    home:<Home/>,
    food:<Food/>,
    weight:<Weight/>,
    workout:<Workout/>,
    motivation:<Motivation/>,
    metrics:<Metrics/>
  }
  const [state, setState] =React.useState<PossibleLocations>("home")
  return (
        <Layout cheat={{nav:(x:PossibleLocations)=>setState(x)}} >
          {
            possibleLocations[state]
          }
        </Layout>
  );
}

export default App;
