// src/Login.tsx
/*
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const auth = getAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Login effettuato', userCredential.user);
            })
            .catch((error) => {
                console.error('Errore durante il login', error);
            });
    };

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log('Login con Google effettuato', result.user);
            })
            .catch((error) => {
                console.error('Errore durante il login di Google', error);
            });
    };

    const handleFacebookLogin = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log('Login con Facebook effettuato', result.user);
            })
            .catch((error) => {
                console.error('Errore durante il login di Facebook', error);
            });
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h2 className="text-center">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Inserisci la tua e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Inserisci la tua password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formRememberMe">
                            <Form.Check
                                type="checkbox"
                                label="Ricordami"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Accedi
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        <p>Hai dimenticato la password?</p>
                        <Button variant="link" onClick={() => {}}>
                            Recupera Password
                        </Button>
                    </div>
                    <div className="text-center mt-3">
                        <Button variant="outline-danger" onClick={handleGoogleLogin}>
                            <FontAwesomeIcon icon={faGoogle} /> Accedi con Google
                        </Button>
                        <Button variant="outline-primary" onClick={handleFacebookLogin} className="mt-2">
                            <FontAwesomeIcon icon={faFacebook} /> Accedi con Facebook
                        </Button>
                    </div>
                    <div className="text-center mt-3">
                        <p>
                            Non hai un account?
                            <Button variant="link" onClick={() => {}}>
                                Registrati
                            </Button>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
*/
