import React from "react";
import { Link } from "react-router-dom";
import { Button, Paper } from "@material-ui/core";

export default function NotFound() {
  return (
    <Paper
      elevation={2}
      style={{
        width: "60%",
        margin: "auto",
        padding: " 0px",
        paddingBottom: "20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: "3em",
          color: "#2a8fbd",
        }}
      >
        <h2 style={{ margin: 0 }}>Error 404</h2>

        <h4 style={{ margin: 0, fontSize: "0.5em" }}>Page not Found</h4>

        <h4 style={{ marginBottom: 0 }}>Please click here to go home page</h4>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            Home
          </Button>
        </Link>
      </div>
    </Paper>
  );
}
