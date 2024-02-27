import { useState } from 'react';
import './App.css';
import From from './components/From';
import Table from './components/Table';

function App() {

  const [openForm,setOpenForm] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <button className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>setOpenForm(true)}>Add User</button>
      <Table openForm={openForm}/>
      {openForm && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                <div className="bg-slate-500 p-8 rounded shadow-lg w-1/2">
                  <From onClose={()=>setOpenForm(false)}/>
                </div>
                </div>
      
      )}
    </div>
  );
}

export default App;
