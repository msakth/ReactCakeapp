import React from 'react';
import './App.css';
import CakeList from './CakeList.js';

const App = () => {

    const jsonSource = 'https://gist.githubusercontent.com/hart88/198f29ec5114a3ec3460/raw/8dd19a88f9b8d24c23d9960f3300d0c917a4f07c/cake.json';

    return( 
            <div className="App">
                <CakeList source={jsonSource} />
            </div>
        );
};

export default App;
