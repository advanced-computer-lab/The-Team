import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/h/profile/edit", {
    });
  };
    const handlePassword = () => {
      navigate("/h/profile/password", {
        
      });
    };

  const handleReserve = () => {
    navigate("/h/profile/reservations", {
     
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
          onClick={handlePassword}
          key="edit-pass"
          sx={{
            alignItems: "center",
            m: 3,
            minWidth: { md: 350 },
          }}
        >
        Change Password
        </Button>
      </Box>
    </div>
  );
}
