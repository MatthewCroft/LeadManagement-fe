import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export function DashboardPage() {
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <Container className="mt-4" style={{ maxWidth: 600 }}>
      <h1>Dashboard</h1>
      <p>Welcome, {email}</p>
      <Button variant="secondary" onClick={handleLogout}>Sign Out</Button>
    </Container>
  );
}
