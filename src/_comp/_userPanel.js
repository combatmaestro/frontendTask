import React from "react";
import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ComingSoonPage from "./_comingSoon";
const _userPanel = () => {
  const { userId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showComingSoon, setComingSoon] = useState(false);
  const [pageTitle,setTitlepage] = useState("");
  const userList = location.state.userList;
  const user = userList.find((user) => user.id === parseInt(userId, 10));
  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0.1!2d${user.address.geo.lng}!3d${user.address.geo.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM1zNDjCsDE0JzQxLjciTiAzN8KwNDcnMzguMCJF!5e0!3m2!1sen!2sus!4v1628653721979!5m2!1sen!2sus`;
  if (!user) {
    return <Typography variant="h6">User not found</Typography>;
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handlesClick = (page) => { 
    setTitlepage(page)
    setComingSoon(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  const handleUserClick = (userId) => {
    setComingSoon(false);
    history.push({
      pathname: `/user/${userId}`,
      state: { userList: userList },
    });
  };

  const handleSignOut = () =>{
    history.push("/");
  }
  return (
    <Box m={0} p={0} height="100vh" display="flex">
      {/* Sidebar */}
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "purple",
          borderRadius: "25px",
          width: "20%",
          marginLeft: "3%",
          marginTop: "3%",
          marginBottom: "3%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <List>
          <ListItem button selected>
            <ListItemText primary="Profile" sx={{ color: "white" }}  onClick={()=>handleUserClick(userId)}/>
            {userId === user.id && (
              <ListItemIcon sx={{ minWidth: "auto", marginLeft: "auto" }}>
                <ArrowForwardIcon />
              </ListItemIcon>
            )}
          </ListItem>
          <Divider sx={{ backgroundColor: "lightgray" }} />
          <ListItem button  onClick={()=>handlesClick("Posts")}>
            <ListItemText primary="Posts" sx={{ color: "white" }} />
          </ListItem>
          <Divider sx={{ backgroundColor: "lightgray" }} />
          <ListItem button  onClick={()=>handlesClick("Gallery")}>
            <ListItemText primary="Gallery" sx={{ color: "white" }} />
          </ListItem>
          <Divider sx={{ backgroundColor: "lightgray" }} />
          <ListItem button  onClick={()=>handlesClick("Todo")}>
            <ListItemText primary="Todo" sx={{ color: "white" }} />
          </ListItem>
        </List>
      </Paper>
      {/* Main Content */}
      
      <Grid
        item
        xs={12}
        md={9}
        sx={{
          flexGrow: 1,
          marginTop: "3%",
          marginBottom: "5.2%",
          marginRight: "3%",
        }}
      >
        <Paper
          elevation={3}
          sx={{ height: "100%", padding: 2, transition: "margin-left 0.3s" }}
        >
          <Box
            display="flex"
            alignItems="center"
            style={{ marginBottom: "2%" }}
          >
            <Typography variant="h5" style={{ flexGrow: 1 }}>
              {showComingSoon ? pageTitle :  "User Details"}
            </Typography>
            <div
              id="hyper"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
                cursor: "pointer",
              }}
              onClick={handleDialogOpen}
            >
              <Typography variant="h6" mr={2}>
                {user.name}
              </Typography>
              <Avatar
                alt={user.name}
                src={user.profilepicture}
                sx={{ marginLeft: 1 }}
              />
            </div>
          </Box>
          <div style={{ marginBottom: "2%" }}>
            {/* Dialog content */}
            <Dialog
              PaperProps={{
                style: {
                  position: "absolute",
                  top: "60px", // Adjust this value as needed
                  right: "20px", // Adjust this value as needed
                  maxWidth: "300px",
                  borderRadius: "8px",
                },
              }}
              open={isDialogOpen}
              maxWidth="sm"
              onClose={handleDialogClose}
            >
              <DialogContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: 300,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 2,
                    borderBottom: "1px solid lightgray",
                  }}
                >
                  <Avatar alt={user.name} src={user.profilepicture} />
                  <Typography variant="h6" sx={{ marginTop: 1 }}>
                    {user.name}
                  </Typography>
                  <Typography>Email: {user.email}</Typography>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginTop: 2 }}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </Box>
                <Box
                  sx={{
                    maxHeight: 300,
                    overflowY: "auto",
                    padding: 2,
                  }}
                >
                  <Paper sx={{ padding: 2 }}>
                    <Divider sx={{ marginBottom: 2 }} />

                    {userList.map((u) => (
                      <Box
                        key={u.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 1,
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#f1f1f1",
                          },
                        }}
                        onClick={() => handleUserClick(u.id)}
                      >
                        <Avatar alt={u.name} src={u.profilepicture} />
                        <Typography sx={{ marginLeft: 1 }}>{u.name}</Typography>
                      </Box>
                    ))}
                  </Paper>
                </Box>
              </DialogContent>
            </Dialog>
          </div>
          <div style={{ borderBottom: "1px solid lightgray" }}></div>
          <Box display="flex" alignItems="center" mt={2} mb={4}></Box>
          {/* Placeholder for user details */}
          {showComingSoon ? (
            <ComingSoonPage />
          ) : (
          <Box style={{ display: "flex" }}>
            <div
              style={{
                flex: 1,
                borderRight: "1px solid lightgray",
                padding: "8px",
                display: "flex",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Profile picture */}
                <img
                  src={user.profilepicture}
                  alt={user.name}
                  style={{
                    width: "30%",
                    height: "45%",
                    borderRadius: "50%",
                    marginBottom: "8px",
                  }}
                />
                <br></br>
                <br></br>
                {/* User and Company Information */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <br></br>
                    <Typography>
                      <strong>Username:</strong> {user.username}
                    </Typography>
                    <Typography>
                      <strong>Email:</strong> {user.email}
                    </Typography>
                    <Typography>
                      <strong>Phone:</strong> {user.phone}
                    </Typography>
                    <Typography>
                      <strong>Website:</strong> {user.website}
                    </Typography>
                  </div>
                  <div
                    style={{
                      width: "1px",
                      backgroundColor: "lightgray",
                      margin: "0 8px",
                    }}
                  ></div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h6">Company </Typography>
                    <Typography>
                      <strong>Name:</strong> {user.company.name}
                    </Typography>
                    <Typography>
                      <strong>Catch Phrase:</strong> {user.company.catchPhrase}
                    </Typography>
                    <Typography>
                      <strong>Business:</strong> {user.company.bs}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ flex: 1, padding: "8px" }}>
              <Typography variant="h6">Address</Typography>
              <Typography>
                <strong>Street:</strong> {user.address.street}
              </Typography>
              <Typography>
                <strong>Suite:</strong> {user.address.suite}
              </Typography>
              <Typography>
                <strong>City:</strong> {user.address.city}
              </Typography>
              <Typography>
                <strong>Zipcode:</strong> {user.address.zipcode}
              </Typography>
              <div
                style={{
                  height: 200,
                  width: "80%",
                  backgroundColor: "lightgray",
                  marginTop: "16px",
                }}
              >
                {/* Display the map using latitude and longitude */}
                <iframe
                  title="Google Map"
                  src={googleMapsUrl}
                  width="500"
                  height="200"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
                <p>
                  Latitude: {user.address.geo.lat}, Longitude:{" "}
                  {user.address.geo.lng}
                </p>
              </div>
            </div>
          </Box> )}

          {/* Placeholder for other users list */}
          <List>{/* ...other users */}</List>
        </Paper>
      </Grid>
    </Box>
  );
};

export default _userPanel;
