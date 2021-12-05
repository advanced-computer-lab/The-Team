import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import axios from "axios";

export default function Login() {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setOpen(true);
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        var id = res.data[0]["_id"];
        var data = {
          userId: id,
          isLogged: true,
        };
        navigate("/h", { state: data });
      })

      .catch((err) => {
        console.log(err);
      });
  };
  const handleGuest = () => {
    navigate("/h", {
      state: {
        userId: "",
        isLogged: false,
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
          onClick={handleLogin}
          key="login-user"
          sx={{
            alignItems: "center",
            m: 3,
            minWidth: { md: 350 },
          }}
        >
          Log in as existing user
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
          onClick={handleGuest}
          key="login-user"
          sx={{
            alignItems: "center",
            m: 3,
            minWidth: { md: 350 },
          }}
        >
          Log in as guest user
        </Button>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      ></Backdrop>
    </div>
  );
}
