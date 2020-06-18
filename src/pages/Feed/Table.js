import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ClientTable({ onLeave, page, token, setFalseAdmin }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/clients/?page=" + page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          setFalseAdmin();
          throw new Error("Failed to fetch status");
        }
        return res.json();
      })
      .then((resData) => {
        setRows(resData.clients);
      })
      .catch((err) => {
        setFalseAdmin();
        console.log(err);
      });
  }, [page]);

  if (rows.length == 0) return null;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow style={{ background: "purple" }}>
            <TableCell style={{ color: "white" }} align="center"></TableCell>
            <TableCell style={{ color: "white" }} align="center">
              E- mail
            </TableCell>
            <TableCell style={{ color: "white" }} align="center">
              Username
            </TableCell>
            <TableCell style={{ color: "white" }} align="center">
              OS Version
            </TableCell>
            <TableCell style={{ color: "white" }} align="center">
              App Version
            </TableCell>
            <TableCell style={{ color: "white" }} align="center">
              Status
            </TableCell>
            <TableCell style={{ color: "white" }} align="center">
              Device Language
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.email}>
              <TableCell align="center">
                {" "}
                <Button
                  variant="contained"
                  onClick={() => onLeave(row._id)}
                  color="primary"
                  style={{ margin: 20 }}
                >
                  Chat
                </Button>
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">{row.osname}</TableCell>
              <TableCell align="center">{row.appversion}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.language}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
