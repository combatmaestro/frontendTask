import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardMedia } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";

const _landing = () => {
  const history = useHistory();
  const [userList, setuserList] = useState([]);
  useEffect(() => {
    fetch("https://panorbit.in/api/users.json")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setuserList(response.users);
      }).catch((error)=>{
        console.log(error);
      })
  }, []);

 

  const handleUserClick = (userId) => {
    history.push({
      pathname: `/user/${userId}`,
      state: { userList: userList }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative", // Make the parent container relative
      }}
    >
      {/* Background with clip path */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: "polygon(0 2%, 100% 0%, 100% 53%, 0 42%)",
          backgroundColor: "lavender",
          zIndex: -1, // Set a lower z-index
        }}
      ></div>
      {/* Card */}
      <Card sx={{ height: 500, width: 500 , borderRadius: "15px" }}>
        <CardContent sx={{ height: "100%", overflow: "auto" }}>
          <Typography variant="h6" style={{ textAlign: "center" }}>Select an account</Typography>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }}>
             
              <TableBody>
                {userList.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleUserClick(user.id)}
                  >
                    <TableCell>
                      <Avatar alt={user.name} src={user.profilepicture} />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default _landing;
