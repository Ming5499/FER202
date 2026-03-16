import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const FilterBar = ({ filters, setFilters }) => {
  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value });
  };

  const handleRoleChange = (e) => {
    setFilters({ ...filters, role: e.target.value });
  };

  const handleSortChange = (e) => {
    const [sortBy, sortOrder] = e.target.value.split('-');
    setFilters({ ...filters, sortBy, sortOrder });
  };

  return (
    <div className="bg-light p-3 rounded mb-4">
      <Row>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by username or email"
              value={filters.search || ''}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select value={filters.status || 'all'} onChange={handleStatusChange}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="locked">Locked</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Select value={filters.role || 'all'} onChange={handleRoleChange}>
              <option value="all">All</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Select value={`${filters.sortBy || 'username'}-${filters.sortOrder || 'asc'}`} onChange={handleSortChange}>
              <option value="username-asc">Username (A → Z)</option>
              <option value="username-desc">Username (Z → A)</option>
              <option value="role-asc">Role (Admin → User)</option>
              <option value="role-desc">Role (User → Admin)</option>
              <option value="status-asc">Status (Active → Locked)</option>
              <option value="status-desc">Status (Locked → Active)</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;