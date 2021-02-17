import React, { useState } from 'react';

import './NewItem.css';

import { v4 as uuidv4 } from 'uuid';

import { Modal, Button, Form, InputGroup, FormControl, Col } from 'react-bootstrap';

export default function NewItem(props) {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState();
    const [inventoryCode, setInventoryCode] = useState('');
    const [show, setShow] = useState(false);

    const saveItem = (e) => {
        e.preventDefault();
      /*  if (inventoryCode === undefined)
            alert('Item must have inventory code!')
        else console.log(name + inventoryCode)*/
        if (validInput()) {
            props.addItem({
                name: name,
                amount: amount,
                inventoryCode: inventoryCode
            });
            console.log('fdsfsfgfsgfs')
        }

    }

    const validInput = () => {
        //check if amount is a number
        if (!(!isNaN(amount) &&
            parseInt(Number(amount)) == amount &&
            !isNaN(parseInt(amount, 10)))) {
            alert('Invalid Amount!');
            return false;
        }
        //check if name is not empty
        if (name === '') {
            alert('Item must have a name!');
            return false;
        }
        //check if inventory code is not empty
        if (inventoryCode === undefined) {
            alert('Item must have inventory code!')
            return false;
        }
        return true;
    }


    const handleShow = () => {
        setName('');
        setAmount();
        setInventoryCode();
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    return (
        <>
            <Col className="d-flex  flex-column align-items-end">
                <Button className="new-item" variant="dark" onClick={handleShow}>
                    New Item
            </Button>
            </Col>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={saveItem}>
                    <Modal.Header closeButton>
                        <Modal.Title>new Item</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <InputGroup >
                            <FormControl id='add-item' placeholder="enter item name..."
                                value={name || ''} onChange={(e) => setName(e.target.value)} />
                        </InputGroup>

                        <InputGroup >
                            <FormControl id='add-amount' placeholder="enter item amount..."
                                value={amount || ''} onChange={(e) => setAmount(e.target.value)} />
                        </InputGroup>
                        <InputGroup >
                            <FormControl id='add-inventory' placeholder="enter inventory code..."
                                value={inventoryCode || ''} onChange={(e) => setInventoryCode(e.target.value)} />
                        </InputGroup>


                    </Modal.Body>

                    <Modal.Footer>
                        <Button type='submit' variant="primary" onClick={handleClose}>
                            Save
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}