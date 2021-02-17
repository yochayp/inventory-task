import React, { useState, useEffect } from 'react';

import './InventoryList.css';

import NewItem from './NewItem';
import {  Row, Table, Container, Navbar, Modal, Form, Button } from 'react-bootstrap';

import { AiOutlineDelete, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { CgEditExposure } from 'react-icons/cg'

export default function InventoryList() {

    const [itemsList, setItemsList] = useState([]);
    const [amount, setAmount] = useState(0);
    const [showUpdate, setShowUpdate] = useState(false);
    const [selectedItem, setSelectedItem] = useState();

    useEffect(() => {

        fetch('http://localhost:8080/api/Items', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {setItemsList(data)})
    }, []);

    const remove = (itemToDelete) => {
        fetch('http://localhost:8080/api/Items', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToDelete.itemId)
        })
            .then(res => {setItemsList(itemsList.filter((item) => item.itemId !== itemToDelete.itemId))})
            .catch(err => console.log(err));

    }


    const addItem = (item) => {
    
        fetch('http://localhost:8080/api/Items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(data => {setItemsList([...itemsList, data])})
            .catch(err => console.log(err));
    }
    

    const update = (e) => {
        e.preventDefault();
        if (selectedItem.amount + amount < 0) alert('Not enough in stock');
        else {
            const url = "http://localhost:8080/api/Items/"+selectedItem.itemId;
            fetch(url , {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(amount)
            })
                .then(() => {
                        setItemsList(
                        itemsList.map(item =>
                            item.itemId === selectedItem.itemId ?{ ...item, amount: item.amount + amount } :item)
                    )}
                )
                .catch(err => console.log(err));
    
        }
    }

    const updateItem = (item) => {
        setShowUpdate(true);
        setSelectedItem(item);
        setAmount(0);
    }
    const handleClose = () => {
        setShowUpdate(false);
    }
    const list = itemsList.map((item) => {
        return (
            <tr key={item.itemId}>
                <td>{item.itemId}</td>
                <td>{item.name}</td>
                <td>{item.inventoryCode}</td>
                <td>{item.amount}</td>
                <td>
                <Row className="utils">
                        <h3 className="plus-minus"> <CgEditExposure onClick={() => updateItem(item)} /></h3>
                        <h3 className="remove"> <AiOutlineDelete onClick={() => remove(item)} /></h3>
                    </Row>
                   
                </td>
            </tr>
        )
    })

    return (
        <>
            <Navbar className="justify-content">
                <h1>Inventory App</h1>
                <NewItem addItem={addItem} />
            </Navbar>

            <Container className="table">
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </Table>
            </Container>
            <Modal show={showUpdate} onHide={handleClose}>
                <Form onSubmit={update}>
                    <Modal.Header closeButton>
                        <Modal.Title>Withdrawal/Deposit</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row className="amount-cell">
                            <h3 className="plus"><AiOutlinePlusCircle onClick={() => setAmount(amount + 1)} /></h3>
                            {amount}
                            <h3 className="minus"> <AiOutlineMinusCircle onClick={() => setAmount(amount - 1)} /></h3>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type='submit' variant="primary" onClick={handleClose}>
                            update
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}