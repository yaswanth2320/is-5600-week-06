const CardList = () => {
  return ();
}
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

export default CardList; 
const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState(data); // Store filtered data separately
  const [products, setProducts] = useState(data.slice(0, limit));

  // Function to handle search and filter data based on the search term
  const handleSearch = (searchTerm) => {
    const filteredProducts = data.filter((product) =>
      // Check if any tag title contains the search term (case-insensitive)
      product.tags.some((tag) =>
        tag.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filteredProducts);
    setOffset(0); // Reset pagination when search term changes
  };

  // Pagination function
  const handlePagination = (direction) => {
    if (direction === "prev" && offset > 0) {
      setOffset(offset - limit); // Move to the previous page
    } else if (direction === "next" && offset + limit < filteredData.length) {
      setOffset(offset + limit); // Move to the next page
    }
  };

  useEffect(() => {
    const paginatedProducts = filteredData.slice(offset, offset + limit);
    setProducts(paginatedProducts);
  }, [offset, filteredData]);

  return (
    <div className="cf pa2">
      <Search handleSearch={handleSearch} />
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePagination("prev")}
        />
        <Button
          text="Next"
          handleClick={() => handlePagination("next")}
        />
      </div>
    </div>
  );
};

export default CardList;
