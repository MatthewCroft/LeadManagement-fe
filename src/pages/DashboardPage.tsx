import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function DashboardPage() {
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome, {email}</p>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
}
