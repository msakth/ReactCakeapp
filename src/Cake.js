import React, { Component } from 'react';
import './Cake.css'

class Cake extends Component {

    constructor(props) {
        super(props);
        this.handleOnEdit = this.handleOnEdit.bind(this);
    }

    handleOnEdit() {        

        const cake = {
            title: this.props.cake.title,
            desc: this.props.cake.desc,
            image: this.props.cake.image
        }

        this.props.editCake(cake);

        this.props.openEditModal(true);
    }

    render(){
        const { cake } = this.props;
       
        return(               
           
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <span>
                            <span className="panel-title"> { cake.title } </span>
                            <button className="btn btn-sm btn-primary pull-right"  onClick={this.handleOnEdit}> <span className="glyphicon glyphicon-pencil"></span>&nbsp;&nbsp;Edit </button>
                        </span>
                    </div>
                    <div className="Cake">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <div className="col-xs-12 col-sm-8 col-md-9">
                                    <div className='well well-lg'>                                        
                                        <label className="control-label">{cake.title}</label>
                                    </div>
                                    
                                    <div className='well well-lg'>                                        
                                        <label>{cake.desc}</label>
                                    </div>
                                </div>
                                    <div className="col-xs-12 col-sm-4 col-md-3">
                                         <img className="img-responsive img-rounded" src={cake.image} alt={cake.title}/>
                                    </div>
                                    <hr/>
                            </div>
                        </div>                    
                    </div>
                </div>
            );        
        }
    }

export default Cake;