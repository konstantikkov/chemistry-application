import React, {useState, useEffect} from 'react'
import './App.css';
import LIGHT_THEME from './components/theme'
import Workflow from "./pages/workflow";
import {Provider} from "react-redux";
import {store} from "./__data__";
import {Initial} from "./pages/initial";

function App() {
    const [intro, toggleIntro] = useState(true)
    useEffect(()=>{
        setTimeout(() => toggleIntro(false), 5200)
    }, [])
  return (
    <div className="App">
        <Provider store={store}>
            {
                intro && <Initial/>
            }
            {
                !intro && <Workflow/>
            }
        </Provider>
    </div>
  );
}
export default App;
