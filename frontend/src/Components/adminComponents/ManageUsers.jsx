import React, { useEffect, useState } from 'react';
import './ManageUsers.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const deleteUser = async (userId) => {
    try {
      const response=await axios.delete(`http://localhost:5000/api/admin/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('User deleted successfully');
      setUsers(users.filter((user) => user._id !== userId));

    } catch (err) {
      console.error('Error deleting user:', err);
    }   
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-users">
      <h2>Manage Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="delete-btn" onClick={()=>deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
