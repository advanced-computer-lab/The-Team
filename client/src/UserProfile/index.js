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
          bgcolor: "#1976d2",
          boxShadow: 1,
          borderRadius: 100,
          p: 2,
          maxWidth: '500px',
          marginLeft:"500px"
        }}
      >
        <Button
          onClick={handleReserve}
          key="login-user"
          sx={{
            color:"white",
            alignItems: "center",
            m: 3,
            minWidth: { md: 350 },
          }}
        >
          View Registration
        </Button>
      </Box>
      <br></br>
      <Box
        sx={{
          my: 3,
          bgcolor: "#1976d2",
          boxShadow: 1,
          borderRadius: 100,
          p: 2,
          maxWidth: '500px',
          marginLeft:"500px"
        }}
      >
        <Button
          onClick={handleEdit}
          key="login-user"
          sx={{
            color:"white",
            alignItems: "center",
            m: 3,
            minWidth: { md: 350 },
          }}
        >
          Edit Profile
        </Button>
      </Box>
      <Box
        sx={{
          my: 6,
          bgcolor: "#1976d2",
          boxShadow: 1,
          borderRadius: 100,
          p: 2,
          maxWidth: '500px',
          marginLeft:"500px"
        }}
      >
        <Button
          onClick={handlePassword}
          key="login-user"
          sx={{
            color:"white",
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
