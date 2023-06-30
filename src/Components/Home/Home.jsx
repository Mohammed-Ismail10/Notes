import React, { useEffect, useState } from 'react'
import Note from '../Note/Note.jsx'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { noteDelete, notePost, notesGet, noteUpdate } from '../../Redux/NoteSlice.js';
import { toast } from 'react-toastify';
import Helmet from 'react-helmet';

export default function Home() {

  const dispatch = useDispatch();
  const { token, userID, myNotes, resultSearch } = useSelector(({ note }) => note);
  const [back, setBack] = useState(false);

  const headers = {
    token,
    userID
  }




  const formik = useFormik({
    initialValues: {
      title: '',
      desc: '',
      userID,
      token
    },
    onSubmit: addNote

  })




  async function addNote(value) {
    let { payload } = await dispatch(notePost(value));
    getNotes(headers);
    toast.success('Note added successfully');
    formik.handleReset();
  }

  async function getNotes(headers) {
    let { payload } = await dispatch(notesGet(headers));
  }

  async function deleteNotes(NoteID, token) {
    let { payload } = await dispatch(noteDelete({ NoteID, token }));
    getNotes(headers);
    toast.success('Note deleted successfully');
  }

  async function updateNote(value) {
    let { payload } = await dispatch(noteUpdate(value));
    getNotes(headers);
    toast.success('Note updated successfully');
  }

  function showBack() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setBack(true);
      }
      else {
        setBack(false);
      }
    })
  }

  useEffect(() => {
    showBack();
    getNotes(headers);
  }, [])




  return (
    <>
    <Helmet>
      <title>Notes - Home</title>
    </Helmet>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <input type="text" onChange={formik.handleChange} value={formik.values.title} className={`form-control`} name="title" placeholder="Title" />
                </div>
                <div className="mb-3">
                  <textarea type="text" onChange={formik.handleChange} value={formik.values.desc} className={`form-control`} name="desc" placeholder="Description" />
                  <p className='fs-6 px-2 text-muted'>If the description is link must be start with 'http'</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Add Note</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>





      <div className='container-fluid py-5 my-5'>
        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className='w-100 btn btn-primary '><i className='fa-solid fa-plus'></i> Add Note</button>

        <div className="row my-3">
          {resultSearch ? resultSearch.map((note) => <Note key={note._id} note={note} deleteNotes={deleteNotes} updateNote={updateNote} />) : myNotes?.map((note) => <Note key={note._id} note={note} deleteNotes={deleteNotes} updateNote={updateNote} />)}
        </div>
      </div>

      {back ? <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-primary border-3 fw-semibold rounded-circle position-fixed start-10 bottom-26 py-3 d-flex align-items-center justify-content-center'>
        <i class="fa-regular fa-note-sticky fs-2 me-1"></i><i class="fa-solid fa-plus"></i>
      </button> : ''}

    </>
  )
}
