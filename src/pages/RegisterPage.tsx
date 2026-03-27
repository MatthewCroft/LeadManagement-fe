import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  function validate(): boolean {
    const errors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errors.email = 'Email cannot be empty';
    }
    if (!password) {
      errors.password = 'Password cannot be empty';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await registerUser(email, password);
      auth.login(res.token, res.email);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={5} lg={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h1 className="text-center mb-4 h3">Create Account</h1>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="registerEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: undefined })); }}
                    isInvalid={!!fieldErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {fieldErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setFieldErrors(prev => ({ ...prev, password: undefined })); }}
                    isInvalid={!!fieldErrors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {fieldErrors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Creating account\u2026' : 'Create Account'}
                </Button>
              </Form>
              <p className="text-center text-muted mt-3 mb-0">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
