import React, { Component } from 'react'

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }

    // To check if the checkbox is checked or not
    handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // If it's a checkbox, use the 'checked' property to determine value
        const updatedValue = type === 'checkbox' ? checked : value;
        this.setState({
            activeItem: { ...this.state.activeItem, [name]: updatedValue }
        });
    };
    
    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle} >
                <ModalHeader toggle={toggle}>
                    Task Item
                </ModalHeader>
                <ModalBody>
                    <Form >
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={this.state.activeItem.title}
                                onChange={this.handleChange}
                                placeholder="Enter Task Title"
                                required
                            />
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="details">Details</Label>
                            <Input
                                type="text"
                                name="details"
                                value={this.state.activeItem.details}
                                onChange={this.handleChange}
                                placeholder="Enter Task Details"
                            />
                        </FormGroup>
                        
                        <FormGroup check>
                            <Label for="complete">
                            <Input
                                type="checkbox"
                                name="complete"
                                value={this.state.activeItem.complete}
                                onChange={this.handleChange}
                            />
                            Completed
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color='success' onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default CustomModal