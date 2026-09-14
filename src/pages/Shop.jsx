import { Col, Container, Row, Form } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState, useEffect } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Shop = () => {
  useWindowScrollToTop();

  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let result = [...products];

    // Category Filter
    if (category !== "all") {
      result = result.filter((item) => item.category === category);
    }

    // Search Query Filter
    if (searchQuery.trim() !== "") {
      result = result.filter((item) =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price Filter
    result = result.filter((item) => item.price <= maxPrice);

    // Rating Filter
    if (minRating > 0) {
      result = result.filter((item) => (item.avgRating || 4.5) >= minRating);
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.productName.localeCompare(b.productName));
    }

    setFilteredProducts(result);
  }, [category, searchQuery, maxPrice, minRating, sortBy]);

  return (
    <Fragment>
      <Banner title="Product Catalog" />
      <section className="filter-bar py-4" style={{ backgroundColor: "#f8f9fa" }}>
        <Container>
          <Row className="g-3 align-items-center mb-3">
            <Col md={3}>
              <FilterSelect onCategoryChange={setCategory} />
            </Col>
            <Col md={6}>
              <SearchBar setFilterList={setFilteredProducts} />
            </Col>
            <Col md={3}>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ height: "40px", backgroundColor: "#0f3460", color: "white", border: "none" }}
              >
                <option value="default">Sort By: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Product Name (A-Z)</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="g-3 align-items-center bg-white p-3 rounded-3 shadow-sm mb-4">
            <Col md={6}>
              <Form.Label className="fw-semibold mb-1">
                Filter by Max Price: <strong>₹{maxPrice}</strong>
              </Form.Label>
              <Form.Range
                min={50}
                max={1500}
                step={25}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </Col>
            <Col md={6}>
              <Form.Label className="fw-semibold mb-1">
                Filter by Minimum Rating:
              </Form.Label>
              <Form.Select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
              >
                <option value={0}>All Ratings</option>
                <option value={4}>4.0 ★ & Above</option>
                <option value={4.5}>4.5 ★ & Above</option>
              </Form.Select>
            </Col>
          </Row>
        </Container>

        <Container>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">No products found matching your filters</h4>
            </div>
          ) : (
            <ShopList productItems={filteredProducts} />
          )}
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;