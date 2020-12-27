import React, { useState, useRef, RefObject } from "react";
import axios from "axios";
import { Alert, Form, Button } from "react-bootstrap";

export default function MyForm() {
  const [alert, setAlert] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const linkRef: RefObject<HTMLInputElement> = useRef(null);
  const lowerBoundRef: RefObject<HTMLInputElement> = useRef(null);
  const emailRef: RefObject<HTMLInputElement> = useRef(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      link: linkRef.current?.value,
      lowerBound: lowerBoundRef.current?.value,
      email: emailRef.current?.value,
    };

    await axios
      .post("/api/data", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        res.status === 404
          ? setError("Unusual Error Occurred!!!")
          : setAlert("You will recieve an email when the price drops!!!");
        setTimeout(() => {
          setError(null);
          setAlert(null);
        }, 5000);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Form className="form" onSubmit={(e) => handleSubmit(e)}>
      {alert && (
        <Alert className="alert" variant="success">
          <Alert.Heading>Request Recorded : Status Code 200</Alert.Heading>
          <p>{alert}</p>
        </Alert>
      )}
      {error && (
        <Alert className="alert" variant="danger">
          <Alert.Heading>Error Code : Status Code 404</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
      <Form.Group controlId="ProductLinkInput">
        <Form.Label>The Direct Link to the Product</Form.Label>
        <Form.Control
          ref={linkRef}
          type="text"
          placeholder="https://amazon.in/<your product>"
        />
      </Form.Group>
      <Form.Group controlId="LowerBoundInput">
        <Form.Label>
          The Lowest price which you want to be notifed at...
        </Form.Label>
        <Form.Control ref={lowerBoundRef} type="text" placeholder="5000" />
      </Form.Group>
      <Form.Group controlId="EmailInput">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          ref={emailRef}
          type="email"
          placeholder="name@example.com"
        />
      </Form.Group>
      <Button variant="danger" type="submit">
        Submit
      </Button>
    </Form>
  );
}
