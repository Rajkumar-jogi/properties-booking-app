import { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import propertiesData from '../data/propertiesData.json'; // Import your JSON data
import '../styles/properties.css';



const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(12); // Set properties per page

  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    bedrooms: '',
    amenities: []
  });

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setProperties(propertiesData);
      setFilteredProperties(propertiesData); // Initially, show all properties
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleAmenityChange = (e) => {
    const { value } = e.target;
    const updatedAmenities = filters.amenities.includes(value)
      ? filters.amenities.filter(amenity => amenity !== value)
      : [...filters.amenities, value];
    setFilters({ ...filters, amenities: updatedAmenities });
    setCurrentPage(1); // Reset to first page on filter change
  };

  useEffect(() => {
    // Apply filters
    const filtered = properties.filter(property => {
      const matchesLocation = !filters.location || property.location.includes(filters.location);
      const matchesPrice = !filters.priceRange || 
        (filters.priceRange === "low" && property.price <= 100000) ||
        (filters.priceRange === "medium" && property.price > 100000 && property.price <= 300000) ||
        (filters.priceRange === "high" && property.price > 300000);
      const matchesBedrooms = !filters.bedrooms || property.bedrooms === parseInt(filters.bedrooms);
      const matchesAmenities = filters.amenities.every(amenity => property.amenities.includes(amenity));
      
      return matchesLocation && matchesPrice && matchesBedrooms && matchesAmenities;
    });

    setFilteredProperties(filtered);
  }, [filters, properties]);

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className='loading-container'>
        <Circles
          height="80"
          width="80"
          color="#6B66F3"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="properties-container">
      <div className="filters">
        <div className="filter">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="Enter location"
          />
        </div>

        <div className="filter">
          <label htmlFor="priceRange">Price Range:</label>
          <select
            id="priceRange"
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
          >
            <option value="">Select Price Range</option>
            <option value="low">Below ₹100,000</option>
            <option value="medium">₹100,000 - ₹300,000</option>
            <option value="high">Above ₹300,000</option>
          </select>
        </div>

        <div className="filter">
          <label htmlFor="bedrooms">Bedrooms:</label>
          <select
            id="bedrooms"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
          >
            <option value="">Select Bedrooms</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </div>

        <div className="filter">
          <label>Amenities:</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="Pool"
                checked={filters.amenities.includes("Pool")}
                onChange={handleAmenityChange}
              />
              Pool
            </label>
            <label>
              <input
                type="checkbox"
                value="Garden"
                checked={filters.amenities.includes("Garden")}
                onChange={handleAmenityChange}
              />
              Garden
            </label>
            <label>
              <input
                type="checkbox"
                value="Garage"
                checked={filters.amenities.includes("Garage")}
                onChange={handleAmenityChange}
              />
              Garage
            </label>
          </div>
        </div>
      </div>
     
      <div className="properties-list">
        {currentProperties.length > 0 ? (
          currentProperties.map(property => (
            <div key={property.id} className="property-card">
              <img src={require(`../assets/${property.image}`)} alt={property.title} />
              <div className="property-details">
                <h3>{property.title}</h3>
                <p>{property.description}</p>
                <p><strong>Price: </strong>₹{property.price}/-</p>
                <p><strong>Location: </strong>{property.location}</p>
                <p><strong>Bedrooms: </strong>{property.bedrooms}</p>
                <p><strong>Amenities: </strong>{property.amenities.join(', ')}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No properties match your filters.</p>
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Properties;
