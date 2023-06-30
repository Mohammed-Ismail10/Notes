import { useFormik } from 'formik';
import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Note({ note, deleteNotes, updateNote }) {

  const [block, setBlock] = useState(false);
  const handleHide = () => setBlock(false);
  const handleBlock = () => setBlock(true);



  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { token } = useSelector(({ note }) => note);




  let formik = useFormik({
    initialValues: {
      title: note.title,
      desc: note.desc,
      NoteID: note._id,
      token: token
    },
    onSubmit: updateNote
  })

  function goToLink() {
    window.open(`${note.desc}`, '_blank');
  }


  return (
    <>
      <Modal className='modal-dialo text-center mt-5' show={block} onHide={handleHide}>
        <Modal.Body className='text-muted'>
          <div className='w-25 border border-4 border-warning rounded-circle py-2 mx-auto my-2'>
            <div className='fs-60 fw-bold text-warning'>!</div>
          </div>
          <h1 className="modal-title fs-2 fw-bold mx-auto" id="staticBackdropLabel">Are you sure?</h1>
          <p className='mt-3 mb-0 fs-5'>You won't be able to revert this!</p>
        </Modal.Body>
        <Modal.Footer className='justify-content-center border-0'>
          <Button className="btn btn-danger" onClick={handleHide}>
            No, cancel!
          </Button>
          <Button className="btn btn-success" onClick={() => { deleteNotes(note._id, token); handleHide() }}>
            Yes, delete it!
          </Button>
        </Modal.Footer>
      </Modal>




      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input onChange={formik.handleChange} type="text" defaultValue={note.title} className={`form-control`} name="title" placeholder="Title" />
            </div>
            <div className="mb-3">
              <textarea onChange={formik.handleChange} type="text" defaultValue={note.desc} className={`form-control`} name="desc" placeholder="Description" />
              <p className='fs-6 px-2 text-muted'>If the description is link must be start with 'http'</p>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { formik.handleSubmit(); handleClose() }}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>









      <div className="col-md-4">
        <div className="p-4 bg-warning-subtle m-2 rounded-2 shadow-sm borde border-black overflow-hidden">
          <h3 className='text-secondary fw-bold'>{note.title}</h3>
          <p className=' wrap'>{note.desc}</p>
          <div>
            <button className='btn btn-danger mx-1' onClick={handleBlock}>
              <i className="fa-solid fa-trash-can"></i> Delete
            </button>
            <button className='btn btn-success mx-1' onClick={handleShow}>
              <i className="fa-solid fa-pen-to-square"></i> Edit
            </button>
            {note.desc.trim().startsWith('http') ? <a className='btn btn-primary mx-1' onClick={goToLink} >
              <i class="fa-solid fa-globe"></i> Go
            </a> : null}
          </div>
        </div>
      </div>
    </>
  )
}
