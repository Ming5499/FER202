import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAccounts, updateAccount } from '../services/api';
import FilterBar from '../components/FilterBar';
import ConfirmationModal from '../components/ConfirmationModal';

const AccountListPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all',
    sortBy: 'username',
    sortOrder: 'asc'
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [actionType, setActionType] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    filterAndSortAccounts();
  }, [accounts, filters]);

  const fetchAccounts = async () => {
    try {
      const response = await getAccounts();
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const filterAndSortAccounts = () => {
    let result = [...accounts];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(acc => 
        acc.username.toLowerCase().includes(searchLower) ||
        acc.email.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status !== 'all') {
      result = result.filter(acc => acc.status === filters.status);
    }

    if (filters.role !== 'all') {
      result = result.filter(acc => acc.role === filters.role);
    }

    result.sort((a, b) => {
      let aValue = a[filters.sortBy];
      let bValue = b[filters.sortBy];
      
      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredAccounts(result);
  };

  const handleViewDetails = (accountId) => {
    navigate(`/account/${accountId}`);
  };

  const handleLockUnlock = (account) => {
    setSelectedAccount(account);
    setActionType(account.status === 'active' ? 'lock' : 'unlock');
    setShowConfirmModal(true);
  };

  const confirmAction = async () => {
    if (!selectedAccount) return;

    const newStatus = actionType === 'lock' ? 'locked' : 'active';
    const updatedAccount = { ...selectedAccount, status: newStatus };

    try {
      await updateAccount(selectedAccount.id, updatedAccount);
      setAccounts(accounts.map(acc => 
        acc.id === selectedAccount.id ? updatedAccount : acc
      ));
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Action failed');
    }

    setShowConfirmModal(false);
    setSelectedAccount(null);
  };

  const getStatusBadge = (status) => {
    return <Badge bg={status === 'active' ? 'success' : 'danger'}>{status}</Badge>;
  };

  const getRoleBadge = (role) => {
    return <Badge bg={role === 'admin' ? 'primary' : 'secondary'}>{role}</Badge>;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Account Management</h2>
      
      <FilterBar filters={filters} setFilters={setFilters} />
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map(account => (
            <tr key={account.id}>
              <td>
                <Image 
                  src={account.avatar || 'https://via.placeholder.com/40'} 
                  roundedCircle 
                  width="40" 
                  height="40"
                />
              </td>
              <td>{account.username}</td>
              <td>{account.email}</td>
              <td>{getRoleBadge(account.role)}</td>
              <td>{getStatusBadge(account.status)}</td>
              <td>
                <Button 
                  variant="info" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleViewDetails(account.id)}
                >
                  View Details
                </Button>
                <Button 
                  variant={account.status === 'active' ? 'warning' : 'success'}
                  size="sm"
                  onClick={() => handleLockUnlock(account)}
                >
                  {account.status === 'active' ? 'Lock' : 'Unlock'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmationModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmAction}
        title={actionType === 'lock' ? 'Lock Account' : 'Unlock Account'}
        message={actionType === 'lock' 
          ? `Lock account ${selectedAccount?.username}? The user cannot log in after this.`
          : `Unlock account ${selectedAccount?.username}?`
        }
      />
    </div>
  );
};

export default AccountListPage;