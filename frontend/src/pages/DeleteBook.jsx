import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'


const DeleteBook = () => {
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  const handleDeleteBook=()=>{
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(()=>{
        setLoading(false)
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
        navigate('/')
        
      })
      .catch((error)=>{
        setLoading(false)
        enqueueSnackbar('an error happened ')
        console.log(error)
      })}
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Button</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col  items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto '>
        <h3>Are you sure you want to delete book </h3>
        <button className='p-4 bg-red-600 text-white m-4 w-full ' onClick={handleDeleteBook}>
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook
