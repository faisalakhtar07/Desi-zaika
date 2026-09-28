import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../store/authStore';

export default function AddressBook({ onSelectAddress }) {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    label: 'Home',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const token = useAuthStore((state) => state.token);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${API_URL}/addresses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/addresses`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAddresses([...addresses, response.data.address]);
      setFormData({ label: 'Home', fullName: '', phone: '', address: '', city: '', state: '', pincode: '' });
      setShowForm(false);
    } catch (error) {
      alert('Error adding address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(`${API_URL}/addresses/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAddresses(addresses.filter(a => a._id !== addressId));
    } catch (error) {
      alert('Error deleting address');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4">Saved Addresses</h3>

      {addresses.length === 0 ? (
        <p className="text-gray-500 mb-4">No addresses saved</p>
      ) : (
        <div className="space-y-4 mb-6">
          {addresses.map(addr => (
            <div key={addr._id} className="border rounded p-4 cursor-pointer hover:bg-gray-50" onClick={() => onSelectAddress(addr)}>
              <div className="font-bold">{addr.label}</div>
              <div className="text-sm text-gray-600">{addr.fullName} - {addr.phone}</div>
              <div className="text-sm">{addr.address}, {addr.city}, {addr.state} {addr.pincode}</div>
              <button onClick={() => handleDeleteAddress(addr._id)} className="text-red-600 text-sm mt-2">Delete</button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleAddAddress} className="border p-4 rounded bg-gray-50">
          <input type="text" placeholder="Label" value={formData.label} onChange={(e) => setFormData({...formData, label: e.target.value})} className="w-full border p-2 rounded mb-2" />
          <input type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full border p-2 rounded mb-2" required />
          <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border p-2 rounded mb-2" required />
          <textarea placeholder="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full border p-2 rounded mb-2" required />
          <input type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full border p-2 rounded mb-2" required />
          <input type="text" placeholder="State" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full border p-2 rounded mb-2" required />
          <input type="text" placeholder="Pincode" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} className="w-full border p-2 rounded mb-4" required />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Address</button>
        </form>
      )}

      <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {showForm ? 'Cancel' : '+ Add New Address'}
      </button>
    </div>
  );
}
