import React from 'react';
import './App.css';
import CakeList from './CakeList.js';

const App = () => {

    const jsonSource = 'https://gist.githubusercontent.com/msakth/7056928ef7456ffb60c0f25d1cc35e48/raw/e09011c7a487d018e0772488974d3da3b33e0849/cake.json';

    return( 
            <div className="App">
                <CakeList source={jsonSource} />
            </div>
        );
};

export default App;
