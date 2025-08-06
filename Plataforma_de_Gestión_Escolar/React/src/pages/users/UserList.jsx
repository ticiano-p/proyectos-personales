import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserFilter from '../../components/users/UserFilter';
import GenderFilter from '../../components/users/GenderFilter';
import FirstNameFilter from '../../components/users/FirstNameFilter';
import SmallDataUser from '../../components/users/SmallDataUser';

const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Cargar todos los usuarios al inicio 
  useEffect(() => {
    fetch(`${DynamicUrl}/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error inicial:', err));
  }, []);

  return (
    <div className='w-full max-w-9/10 mx-auto py-8'>
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      <div className=''>
        <UserFilter apiUrl={DynamicUrl} onResult={setUsers} />
        <GenderFilter apiUrl={DynamicUrl} onResult={setUsers} />
        <FirstNameFilter apiUrl={DynamicUrl} onResult={setUsers} />
      </div>

      <div className="bg-amber-300/70 flex flex-wrap gap-5 justify-center p-4 rounded-2xl">
        {users.length > 0 ? (
          users.map(user => (
            <SmallDataUser user={user} key={user._id} />
          ))
        ) : (
          <p className="text-red-600">No se encontraron usuarios.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
