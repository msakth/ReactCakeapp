import React, { Component } from 'react';
import $ from "jquery";

import Cake from './Cake.js';
import Search from './Search.js';
import CakeModal from './ModalComponents/CakeModal.js';

import './CakeList.css';
import './App.css';

class CakeList extends Component {

    constructor(props) {
        super(props);
        this.state = { cakes : [], filteredCakes: [], showModal: false, editableCake: '', modalTitle: '' };
       
        this.updateCakes = this.updateCakes.bind(this);
        this.getJson = this.getJson.bind(this);
        this.openModal = this.openModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleOnUpsertCake = this.handleOnUpsertCake.bind(this);
        this.editCake = this.editCake.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
    }

    componentDidMount() {
        this.getJson();
    }

    componentWillUnmount() {
        this.jsonRequest.abort();
    }

    openModal() {
        this.setState({ showModal: true, editableCake: '', modalTitle: 'Add' });
    }

    openEditModal(flag) {
        this.setState({ showModal: flag, modalTitle: 'Edit' });
    }

    hideModal() {
        this.setState({ showModal: false });
    }    

    getJson(){
        this.jsonRequest = $.get(this.props.source, function (result) { 

            const cakes = JSON.parse(result);                 
            let filteredCakes = [];

            //Remove duplicate cakes
            cakes.map((cake)=> (
                     filteredCakes.find( c => c.title === cake.title) ? null : filteredCakes.push(cake)                        
                ));                

            this.setState({ cakes: filteredCakes });
            this.setState({ filteredCakes: filteredCakes });

        }.bind(this));
    }

    handleOnUpsertCake(newCake) {

        const action = this.state.cakes.filter((cake) => cake.title === newCake.title).length > 0 ? "edit" : "add";

        if (action === "edit") {

            let editedCakes = this.state.cakes.map(function(cake) { return cake.title === newCake.title ? newCake : cake; });
            this.setState({ cakes: editedCakes , filteredCakes: editedCakes  });
            

        } else {
            this.setState({ cakes: [newCake, ...this.state.cakes] , filteredCakes: [newCake, ...this.state.filteredCakes] });            
        }
    }

    editCake(cake) {
        console.log('cake= '+ cake.title + '  ' + cake.desc + '  ' + cake.image);
        this.setState({ editableCake: cake });
    }
        
    renderCakeList() {         
        return this.state.filteredCakes.map( (cake,index) => (
            <Cake key={index} cake={cake}  editCake={this.editCake.bind(this)} openEditModal={this.openEditModal.bind(this)}/>
        ));
    }

    updateCakes(cakeTitle){       

        const filteredCakes = this.state.cakes.filter(cake => {
            return cake.title.toLowerCase().indexOf(cakeTitle.toLowerCase()) !== -1;
        }); 

        if( !!cakeTitle ) { 
            this.setState({ filteredCakes: filteredCakes }) }
        else{
            this.setState({ filteredCakes: this.state.cakes }) }
    }
    

    render() {

        const { showModal, editableCake, modalTitle} = this.state;
                
        return (
                <div className="col-xs-12 col-sm-12 col-md-8">         
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <span>
                                  <span className="panel-title">List of Cakes</span>
                                  <button type="button" className="btn btn-sm btn-success pull-right" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span>Add Cake</button>
                            </span>
                        </div>
                        <div className="panel-body">
                            <div className="CakeList">                
                                <Search updateCakes={this.updateCakes}/>                                 
                                { this.renderCakeList() }                                
                            </div>  
                            <CakeModal showModal={showModal} hideModal={this.hideModal.bind(this)} handleOnUpsertCake={this.handleOnUpsertCake.bind(this)} cake={editableCake}  modalTitle={modalTitle} ></CakeModal>
                        </div>            
                    </div> 
                </div>  
             );
    }
}

export default CakeList;