import React, { useEffect, useState } from "react";
import { Navbar } from "../comp/navbar.component";
import axios from "axios";
import "./../../styles/mainPage.css";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "timeago.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const MainComponent = () => {
  const [userData, setUserData] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function getUserData() {
      let url = "http://localhost:4000/user/userdata";

      const user = await axios.get(url, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      setUserData(user.data);
      setUserName(user.data.username[0].toUpperCase());
    }
    getUserData();
  });

  return (
    <>
      <Navbar name={userName} username={userData.username} firstName={userData.firstName} lastName={userData.lastName} email={userData.email} age={userData.age} />
      <div className="container">
        <div className="branding">
          <p>Hello</p>
        </div>
        <div className="addNew">
          <Link to="/addNewReading">
            <div className="button">
              <p>Add New Reading</p>
            </div>
          </Link>
          <div className="container"></div>
          {userData && (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="right">srno.</StyledTableCell>
                      <StyledTableCell>type</StyledTableCell>
                      <StyledTableCell align="right">
                        Level (mg dl)
                      </StyledTableCell>
                      <StyledTableCell align="right">Time</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData.readings.map((reading, index) => (
                      <>
                        <StyledTableRow key={reading.level}>
                          <StyledTableCell align="right">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {reading.type}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {reading.level}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {new Date(reading.at).toLocaleString()}, {format(reading.at)}
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </div>
      </div>
    </>
  );
};
