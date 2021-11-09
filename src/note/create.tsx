import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CompactPicker } from 'react-color';
const CreateNote = (props: any) => {
  const [background, setBackground] = useState('white');
  const [colorObject, setColorObject] = useState(Object);
  const [note, setNote] = useState(props.noteDetail.title);

  useEffect(() => {
    setBackground(props.noteDetail.bgColor);
}, []);

  const handleClose = () => {
    props.close(false);
  }

  const handleChange = (e: any) => {
    setNote(e.target.value);
  }

  const submit = () => {
    const noteObject = {
      id: props.noteDetail.id ? props.noteDetail.id : null,
      title: note,
      bgColor: colorObject.hex ? colorObject.hex : background,
      createdAt: new Date(),
      isStar: false
    };
    props.submitNote(noteObject);
  }

  const handleChangeComplete = (color: any) => {
    setBackground(color.hex);
    setColorObject(color);
  };

  return (
    <Modal size="sm" show={props.show} backdrop='static' onHide={handleClose} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{props.noteDetail.id ? 'Update Note' : 'Add Note'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <textarea className="form-control" value={note} onChange={handleChange} placeholder="Enter Note" ></textarea>
            {!note && <span style={{ color: "red" }}>Note is Required</span>}
          </Form.Group>
          <Form.Group
          >
            <CompactPicker
              color={background}
              onChangeComplete={handleChangeComplete}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>Close</Button>
        <Button type="button" disabled={!note} onClick={submit}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateNote;