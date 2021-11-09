import React, { useState, useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';
import CreateNote from './create';
import { Note } from './noteModel';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

let notes: any = [];
let noteFilterData: any = [];

const NoteList = () => {
    const [showModal, setShow] = useState(false);
    const [loadPage, setLoadPage] = useState(false);
    const [noteDetail, setNoteDetail] = useState(Object);

    const openModal = () => {
        setNoteDetail(new Object());
        setShow(true);
    }

    useEffect(() => {
        const retrievedObject = localStorage.getItem('notes');
        if (retrievedObject) {
            notes = JSON.parse(retrievedObject);
        }
        setLoadPage(true);
    }, []);

    const openUpdateModal = (id: number) => {
        const detail = notes.find((p: any) => p.id == id);
        setNoteDetail(detail);
        setShow(true);
    }

    const changeStarRating = (id: number) => {
        localStorage.removeItem('notes');
        const detail = notes.find((p: any) => p.id == id);
        if (detail) {
            detail.isStar = !detail.isStar ? true : false;
        }
        loadPage ? setLoadPage(false) : setLoadPage(true);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    const closeModal = () => {
        setShow(false);
    }

    const handleChange = (e: any) => {
        const retrievedObject = localStorage.getItem('notes');
        let storageData = [];
        if (retrievedObject) {
            storageData = JSON.parse(retrievedObject);
        }
        if (e.target.checked) {
            notes = storageData.filter((p: any) => p.isStar == true);
        }
        else {
            notes = storageData;
        }
        loadPage ? setLoadPage(false) : setLoadPage(true);
    }


    const createNote = (note: any) => {
        localStorage.removeItem('notes');
        if (note.id && note.id > 0) {
            let detail = notes.find((p: any) => p.id == note.id);
            if (detail) {
                detail.title = note.title;
                detail.bgColor = note.bgColor;
            }
        }
        else {
            note.id = notes.length + 1;
            notes.push(note);
        }
        localStorage.setItem('notes', JSON.stringify(notes));
        setNoteDetail(null);
        setShow(false);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3 text-left">
                    <h2>Sticky Notes</h2>
                </div>
                <div className="col-md-9 text-right">
                    <button type="button" className="btn btn-primary btn-sm" onClick={openModal}>Add Note</button>
                </div>
            </div>
            <div className="row col-md-3">
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" onChange={handleChange} label="Only Starred" />
                </Form.Group>
            </div>
            <div className="row">
                {notes && notes.map((element: any) => {
                    return (<div className="col-md-3" key={element.id}>
                        <Card
                            draggable={true}
                            text={'dark'}
                            style={{ height: '250px', background: element.bgColor }}>
                            <Card.Body>
                                <Card.Text>
                                    <span className="row">
                                        <span className="col-md-9"> {element.title}</span>
                                        <a href="javascript:void(0)" onClick={() => changeStarRating(element.id)} className="col-md-3">
                                            <i className={element.isStar ? "fa fa-star" : "fa fa-star-o"} style={{ fontSize: '36px' }}></i>
                                        </a>
                                    </span>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <span className="row">
                                    <span className="col-md-9"> {element.createdAt ? Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(element.createdAt)) : ''}</span>
                                    <a href="javascript:void(0)" onClick={() => openUpdateModal(element.id)} className="col-md-3"><i className="fa fa-edit" style={{ fontSize: '36px' }}></i></a>
                                </span>
                            </Card.Footer>
                        </Card>
                        <br/>
                    </div>)
                })}
            </div>
            { showModal && <CreateNote show={showModal} close={closeModal} submitNote={createNote} noteDetail={noteDetail} />}
        </div >
    )
}

export default NoteList;