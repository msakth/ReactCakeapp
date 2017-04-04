import React, {Component} from 'react';
import '../CakeList.css';

class UpsertCake extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            title: '',
            desc: '',
            image: ''            
        });

        this.setTitle = this.setTitle.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setImageUrl = this.setImageUrl.bind(this);
        this.saveCake = this.saveCake.bind(this);
    }    

    componentDidMount() {
        const { cake } = this.props;

        if (!!cake) {
            this.setState({ title: cake.title });
            this.setState({ desc: cake.desc });
            this.setState({ image: cake.image });
        }
    }

    setTitle(event) {
        this.setState({ title: event.target.value });
    }

    setDescription(event) {
        this.setState({ desc: event.target.value });
    }

    setImageUrl(event){
        this.setState({ image: event.target.value });
    }

    saveCake(event){

        event.preventDefault();

        const cake = { 
            title: this.state.title.trim(),
            desc: this.state.desc.trim(),
            image: this.state.image.trim()
        };

        this.props.handleOnUpsertCake(cake);
        this.props.hideModal();
        
    }
    render() {

        const { modalTitle } = this.props;
        const { title, desc, image } = this.state;
        const disableTitle = (modalTitle === 'Edit');

        return( 
            <form method="post" id="upsertCakeForm" onSubmit={this.saveCake}>
                    <div className="panel panel-default">
                        <div className="panel-body form-horizontal">
                                
                                <div className="form-group">
                                    <label className="col-md-2 col-sm-2">Title*</label>
                                      <div className="col-md-9 col-sm-9">
                                        <input maxLength={150} id="title" onChange={this.setTitle} placeholder="enter cake title" className="form-control" value={title} required disabled={disableTitle}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-md-2 col-sm-2">Description</label>
                                      <div className="col-md-9 col-sm-9">
                                        <input maxLength={250} id="desc" onChange={this.setDescription} placeholder="enter cake description" className="form-control" value={desc}/>
                                    </div>
                                </div>

                                 <div className="form-group">
                                    <label className="col-md-2 col-sm-2">Image Url*</label>
                                      <div className="col-md-9 col-sm-9">
                                        <input id="image" onChange={this.setImageUrl} placeholder="enter image url" className="form-control" required value={image}/>
                                    </div>
                                </div>

                            <div className="form-group">
                                <div className="col-xs-11">
                                    <div className="pull-right">
                                        <button id="addCakeButton" name="addCakeButton" type="submit" className="btn btn-success">
                                            <span className="glyphicon glyphicon-save"/>&nbsp;  <strong>Save</strong>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
        );
    }
}

export default UpsertCake