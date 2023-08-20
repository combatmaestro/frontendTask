import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    marginBottom: "16px",
  },
  message: {
    fontSize: 24,
    color: "#555",
    marginBottom: "32px",
  },
  countdown: {
    fontSize: 18,
    color: "#777",
  },
};

const ComingSoonPage = () => {
  const [timeLeft, setTimeLeft] = useState("");

  const launchDate = new Date("2023-09-01 00:00:00").getTime();

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = launchDate - now;

      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        setTimeLeft("Website launched!");
      } else {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "50vh" }} // Adjust as needed
    >
      <div style={styles.container}>
        <Typography style={styles.logo}>Coming Soon</Typography>
        <Typography style={styles.message}>
          Stay tuned! Our website is under construction.
        </Typography>
        <Typography style={styles.countdown}>Website launching in: {timeLeft}</Typography>
      </div>
    </Grid>
  );
};

export default ComingSoonPage;
