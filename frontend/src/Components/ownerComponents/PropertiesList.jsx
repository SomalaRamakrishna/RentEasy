import React, { useState ,useNavigate} from 'react';
import './PropertiesList.css';
import EditHouseForm from './EditHouseForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import ViewHouseModal from './ViewHouseModal';

const PropertiesList = ({ properties,fetchProperties }) => {
  const [selectedHouseId, setSelectedHouseId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedViewHouseId, setSelectedViewHouseId] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  
 


  const handleEditClick = (houseId) => {
    setSelectedHouseId(houseId);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedHouseId(null);
  };

  const handleUpdate = () => {
    fetchProperties(); // Triggers a re-fetch
    handleCloseModal();
  };

  const handleDelete = async (houseId) => {
    try {
        const response =axios.delete(`http://localhost:5000/api/owner/delete-house/${houseId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        } 
        );

         toast.success('Property deleted successfully');
        fetchProperties(); // Refresh the property list
        
    } catch (error) {
        console.error('Error deleting property:', error);
        toast.error('An error occurred while deleting the property'); 
    }
  }
  
  const viewProperty = (id) => {
    setSelectedViewHouseId(id);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedViewHouseId(null);
  };
  
  return (
    <div className="listings-container">
      <h2>My Properties</h2>
      <div className="property-grid">
        {properties?.map((property) => (
          <div className="property-card" key={property._id}>
            {/* Use the first image if available */}
            {property.images && property.images.length > 0 ? (
              <img
                src={property.images[0]}
                alt={property.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                onClick={() => viewProperty(property._id)}
              />
            ) : (
              <div style={{ width: '100%', height: '200px', background: '#ccc' }}>
                No Image
              </div>
            )}
            <div className="property-info">
              <h3>{property.title}</h3>
              <p className="location">
                 {property.location?.lat}, {property.location?.lng}
              </p>
              <p className="price">₹{property.price}</p>
              <p className="desc">{property.description}</p>
              <div className="actions">
                <button onClick={() => handleEditClick(property._id)} className="edit-btn">
                  Edit Property
                </button>
                <button className="delete-btn" onClick={()=>{handleDelete(property._id)}}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditHouseForm
              houseId={selectedHouseId}
              onClose={handleCloseModal}
              onUpdated={handleUpdate}
            />
          {/*   <button className="close-btn" onClick={onClose}>×</button> */ }
          </div>
        </div>
      )}

      {showViewModal && (
          <div className="modal-overlay">
            <ViewHouseModal houseId={selectedViewHouseId} onClose={handleCloseViewModal} />
          </div>
      )}
    </div>
  );
};



export default PropertiesList;
