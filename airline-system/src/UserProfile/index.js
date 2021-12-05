import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";

export default function UserProfile() {
  const { state } = useLocation();
  const { userId } = state;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/h/profile/edit", {
      state: {
        id: userId,
      },
    });
  };

  const handleReserve = () => {
    navigate("/h/profile/reservations", {
      state: {
        id: userId,
      },
    });
  };
  return (
    <div>
      <Box
        sx={{
          my: 2,
          bgcolor: "#fa12",
          boxShadow: 1,
          borderRadius: 1,
          p: 2,
          minWidth: 300,
        }}
      >
        <Button
          onClick={handleReserve}
          key="login-user"
          sx={{
            alignItems: "center",
            m: 3,
            minWidth: { md: 350 },
          }}
        >
          View Reservations
        </Button>
      </Box>
      <br></br>
      <Box
        sx={{
          my: 2,
          bgcolor: "#fa12",
          boxShadow: 1,
          borderRadius: 1,
          p: 2,
          minWidth: 300,
        }}
      >
        <Button
          onClick={handleEdit}
          key="login-user"
          sx={{
            alignItems: "center",
            m: 3,
            minWidth: { md: 350 },
          }}
        >
          Edit Profile
        </Button>
      </Box>
    </div>
  );
}
