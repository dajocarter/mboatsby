import React from "react";
import { auth } from "../../firebase";
import { Button } from "react-bootstrap";

const SignOutButton = () => <Button onClick={auth.doSignOut}>Sign Out</Button>;

export default SignOutButton;
