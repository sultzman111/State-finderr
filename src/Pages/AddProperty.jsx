import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProperty = ({ onAddProperty }) => {
  const navigate = useNavigate();

  // --- FORM STATE HUBS ---
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [image, setImage] = useState('');
  const [isRental, setIsRental] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent accidental double submissions
    if (!title || !location || !basePrice) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Structure the payload exactly how App.js and Firebase expect it
    const newPropertyData = {
      title: title.trim(),
      location: location.trim(),
      basePrice: Number(basePrice), // Strictly forced to a number for calculation consistency
      isRental: isRental,
      tag: isRental ? 'FOR RENT' : 'FOR SALE',
      // Fallback placeholder image if the seller leaves the input blank
      image: image.trim() || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    };

    try {
      // Fire the global controller which pipes data straight to Firebase
      await onAddProperty(newPropertyData);
      
      // Send the seller right to their workspace to check out their active asset listings
      navigate('/mylistening');
    } catch (error) {
      console.error("Failed to list property:", error);
      alert("Something went wrong while uploading your listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
      <div className="w-full bg-white border border-gray-100 shadow-xl rounded-3xl p-6 md:p-10">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-950 mb-1">List a New Property</h1>
          <p className="text-sm text-gray-400">Fill out the details below to launch your property live to the global network.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* TITLE INPUT */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Property Title *</label>
            <input 
              type="text"
              placeholder="e.g. Modern Luxury Penthouse Studio"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950 focus:bg-white transition-all text-gray-900"
              required
            />
          </div>

          {/* LOCATION INPUT */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Location / Address *</label>
            <input 
              type="text"
              placeholder="e.g. Ikoyi, Lagos"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950 focus:bg-white transition-all text-gray-900"
              required
            />
          </div>

          {/* PRICE & TYPE ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Base Price (₦) *</label>
              <input 
                type="number"
                placeholder="e.g. 15000000"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950 focus:bg-white transition-all text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Listing Intent</label>
              <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1 border border-gray-200 rounded-xl h-[46px] items-center">
                <button
                  type="button"
                  onClick={() => setIsRental(false)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${!isRental ? 'bg-neutral-950 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  For Sale
                </button>
                <button
                  type="button"
                  onClick={() => setIsRental(true)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${isRental ? 'bg-neutral-950 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  For Rent
                </button>
              </div>
            </div>
          </div>

          {/* IMAGE URL INPUT */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Property Image URL</label>
            <input 
              type="url"
              placeholder="https://images.unsplash.com/... (or leave blank for placeholder)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950 focus:bg-white transition-all text-gray-900"
            />
          </div>

          {/* SUBMIT ACTION BUTTON */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 text-sm font-bold text-white rounded-xl transition-all shadow-md ${
                isSubmitting 
                  ? 'bg-neutral-400 cursor-not-allowed' 
                  : 'bg-neutral-950 hover:bg-neutral-900 active:scale-[0.99]'
              }`}
            >
              {isSubmitting ? 'Publishing to Cloud Database...' : 'Go Live & Publish Listing'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProperty;