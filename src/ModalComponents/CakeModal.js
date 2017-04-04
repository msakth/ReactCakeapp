import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap'

import UpsertCake from './UpsertCake.js';

class CakeModal extends Component {

    handleCakeModalOnClose = (): void => {
       this.props.hideModal();
    }

    render() {

        const { showModal, hideModal, handleOnUpsertCake, cake , modalTitle } = this.props;

        return (
               <Modal show={showModal} onHide={hideModal} dialogClassName="custom-modal" bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">{ modalTitle + ' Cake' }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UpsertCake handleOnUpsertCake={ handleOnUpsertCake } hideModal={ this.handleCakeModalOnClose } cake={ cake }  modalTitle={ modalTitle }/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.hideModal }>Close</Button>
                    </Modal.Footer>
              </Modal>
            );
    }
}

export default CakeModal