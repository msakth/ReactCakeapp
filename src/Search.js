import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);       

        this.updateCake = this.updateCake.bind(this);
    }

    updateCake(event) {        
        this.props.updateCakes(event.target.value);        
    }

    render() {
        return (
                <div className='form-group'>
                    <input type='text' id='inputSearch' placeholder='search by cake title' className='form-control' onChange={this.updateCake}/>
                </div>
            );
    }
}

 export default Search
