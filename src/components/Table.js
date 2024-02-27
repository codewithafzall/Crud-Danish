import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils'
import axios from 'axios';
import From from './From';

const Table = ({openForm}) => {

    const [data,setData] = useState([]);
    const [rowId,setRowId] = useState("");
    const [dataForId,setDataForId] = useState([]);
    
    const [editForm, setEditForm] = useState(false);

    const fetchData = async()=>{
        try {
            const response = await axios.get(BASE_URL);
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onRowClick = (id)=>{
       setRowId(id);
       setEditForm(true);
    };

    const fetchDatawithID = async()=>{
        try {
            const response = await axios.get(`${BASE_URL}/${rowId}`);
            setDataForId(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async(id)=>{
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        fetchDatawithID();
    },[rowId]);

    useEffect(()=>{
        fetchData();
    },[openForm]);

  return (
    <div>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                   Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Password
                </th>
                <th scope="col" class="px-6 py-3">
                   Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {data.map((i)=>{
                return(
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
               
                <td class="px-6 py-4">
                    {i.email}
                </td>
                <td class="px-6 py-4">
                    {i.pass}
                </td>
                <td class="px-6 py-4">
                <button onClick={()=>onRowClick(i.id)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>                
                <button onClick={()=>handleDelete(i.id)} type="button" class="text-white bg-red-500 hover:bg-red-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Delete</button>                
                </td>
            </tr>
                )
            })}
        </tbody>
    </table>
    {editForm && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                <div className="bg-slate-500 p-8 rounded shadow-lg w-1/2">
                  <From rowId={rowId} dataForId={dataForId} onClose={()=>setEditForm(false)}/>
                </div>
                </div>
      
      )}
</div>

    </div>
  )
}

export default Table