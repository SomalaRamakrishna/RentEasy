const mongoose=require('mongoose');
const Property = require('../models/PropertyModel');
const User = require('../models/UserModel');


const addHouse = async (req, res) => {
  //console.log("entered");
  try{
     const {
      title,
      price,
      description,
      propertyType,
      bedrooms,
      bathrooms,
      area,
      city,
      pincode,
      landmark,
      furnished,
      availableFrom,location,
    } = req.body;

     const location1 = {
      lat: location.lat,
      lng: location.lng,
    };
    //console.log("requested:",req.body);
    //console.log("location",location1);
    //console.log("req.user",req.user);
     if (!title || !price || !location.lat || !location.lng || !propertyType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }



     const imageUrls = req.files.map(file => file.path); 
     //const images = req.files.map(file => file.buffer);
    if (imageUrls?.length > 5) {
      return res.status(400).json({ message: 'Only up to 5 images are allowed' });
    }
   // console.log("images :",imageUrls);
    // Check if property already exists (same owner + title + location address)
    const existing = await Property.findOne({
      owner: req.user.id,
      title: title.trim(),
    });
    
    if (existing) {
      return res.status(409).json({ message: 'Property with same title and location already exists for this owner.' });
    } 
    
     const newProperty = new Property({
      title,
      description,
      price,
      advance:'100',
      rooms:"2",
      bathrooms,
      area,
      furnished,
      propertyType,
      floor:'5',
      totalFloors:'7',
      facing:'east',
      /* amenities, */
      location:location1,
      availableFrom,
      images:imageUrls,
      owner: req.user.id,
    });
    

    await newProperty.save(); 

    res.status(201).json({ message: 'Property added successfully', property: newProperty  });
  } catch (error) {
    console.error('Add Property Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const viewHouse = async (req, res) => {
  const houseId = req.params.id;
  //console.log("houseId",houseId);
  try {
      const house = await Property.find({_id: houseId} ).populate('owner', 'name email phone role createdAt') // Include only safe fields

    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }
    
    res.status(200).json(house);
  } catch (error) {
    console.error('Error fetching house details:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


const getOwner = async (req, res) => {
  const ownerId = req.params.id;
  try {
    const owner = await User.findById(ownerId).select('name email phone city profilePic role createdAt'); // Select only safe fields
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    console.log("owner",owner);
    res.status(200).json(owner);
  } catch (error) {
    console.error('Error fetching owner details:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

const getMyHouses = async (req, res) => {
  try {
    const ownerId = req.user.id;

    let properties = await Property.find({ owner: ownerId })
      .populate('owner', 'name email phone')
      .sort({ createdAt: -1 })
      .lean(); // Important: convert Mongoose docs to plain JS objects for mutation

    res.status(200).json(properties);
  } catch (error) {
    console.error('Get My Houses Error:', error.message);
    res.status(500).json({ message: 'Server error while fetching your properties.' });
  }
};


const editHouse = async (req, res) => {
  try {
   // console.log("Editing house with ID:", req.params.id);
    const propertyId = req.params.id;
    const userId = req.user.id; // assuming user info is added via verify middleware
    const updatedData = req.body;
    // console.log("Updated data:", updatedData);
    // console.log(userId, propertyId,req.user.id.toString());
    const property = await Property.findOne({ _id: propertyId, owner: req.user.id.toString() });
    if (!property) {
      return res.status(404).json({ message: 'Property not found or unauthorized' });
    }
     
    if (updatedData.location && typeof updatedData.location === 'string') {
      const [lat, lng] = updatedData.location.split(',').map(coord => parseFloat(coord.trim()));
      updatedData.location = { lat, lng };
    }

    // Only allow editable fields
    const editableFields = [
      'title', 'description', 'price', 'advance', 'images',
      'location', 'availableFrom'
    ];

    editableFields.forEach(field => {
      if (updatedData[field] !== undefined) {
        property[field] = updatedData[field];
      }
    });

    await property.save();

    res.status(200).json({ message: 'Property updated successfully', property });
  } catch (error) {
    console.error('Edit house error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const editOwnerDetails = async (req, res) => {
  try {
    const userId = req.user.id; // assuming user info is added via verify middleware
    console.log(req.body);
    const { name, email, phone, city } = req.body;
     console.log("Editing owner details for user ID:", userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update only the fields that are provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (city) user.city = city;
    if (req.files && req.files.length > 0) {
      user.profilePic = req.files[0].path; // Assuming single file upload for profile pic
    }
    // Save the updated user
    await user.save();
    res.status(200).json({ message: 'Owner details updated successfully', user });
  }
  catch (error) {
    console.error('Edit owner details error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

const deleteHouse = async (req, res) => {
  try {
    console.log("Deleting house with ID:", req.params.id);

    const propertyId = req.params.id;
    const userId = req.user.id; // assuming user info is added via verify middleware

    const property = await Property.findOneAndDelete({ _id: propertyId, owner: req.user.id});
   
    if (!property) {
      return res.status(404).json({ message: 'Property not found or unauthorized' });
    }

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete house error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}


const getBookingsForHouse = async (req, res) => {
  try {
    const houseId = req.params.houseId;
    const userId = req.user._id; // assuming user info is added via verify middleware

    const property = await Property.findOne({ _id: houseId, owner: userId })
      .populate('bookings.user', 'name email phone'); // populate user details

    if (!property) {
      return res.status(404).json({ message: 'Property not found or unauthorized' });
    }

    res.status(200).json(property.bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }

}


const getPayments = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate({
      path: 'payments',
      populate: {
        path: 'house',
        select: 'title location price'
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.payments);
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


module.exports = { addHouse,viewHouse,
     getMyHouses, 
     editHouse, 
     editOwnerDetails,
     deleteHouse,
     getBookingsForHouse,
     getPayments ,
     getOwner
    };
