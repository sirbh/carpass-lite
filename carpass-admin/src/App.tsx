import "./App.css";
import { AppBar, Box, Button, Modal, Toolbar, Typography } from "@mui/material";
import phone from "./assets/phone.png";
import logo from "./assets/logo.png";
import { Android } from "@mui/icons-material";
import { useState } from "react";
import logo2 from "./assets/logo2.png";

function App() {
  const [open, setOpen] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <video autoPlay loop controls style={{ width: "50%", height: "50%", border: "2px solid grey", backgroundColor: "black" }}>
          <source src="/demo.mp4" type="video/mp4" />
        </video>
      </Modal>
      <Modal open={showContactUs} onClose={() => setShowContactUs(false)} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Box sx={{ width: { xs: "90%", sm: "60%" }, height: { xs: "40%", sm: "60%" }, backgroundColor: "black", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", padding: { xs: "20px 10px", sm: "20px 40px" }, border: "1px solid grey" }}>
          <Typography variant="h2" sx={{ color: "white", marginBottom: "40px", fontSize: { xs: "1.75rem", sm: "3.75rem" } }}>
            Contact Us
          </Typography>
          <Typography variant="h4" sx={{ color: "white", fontSize: { xs: "1.125rem", sm: "2.125rem" } }}>
            Name: Sami Seppälä
          </Typography>
          <Typography variant="h4" sx={{ color: "white", fontSize: { xs: "1.125rem", sm: "2.125rem" } }}>
            Phone: +358 45 6703822
          </Typography>
        </Box>
      </Modal>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          // backgroundImage: `url("${logo}")`,
          // backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
          // backgroundSize: "contain",
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar
          position="static"
          sx={{ backgroundColor: "transparent", width: "100%" }}
        >
          <Toolbar>
            <img src={logo2} alt="logo" style={{ width: "50px", height: "50px" }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CarPass
            </Typography>
            <Button color="info" sx={{ marginRight: { xs: "0px", sm: "20px" } }} onClick={() => { setOpen(true) }}>
              Demo
            </Button>
            <Button onClick={() => { setShowContactUs(true) }} color="info">Contact Us</Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Box sx={{
            width: { xs: "90%", sm: "65%" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
            padding: { xs: "5px", sm: "0px 40px" },
          }}>
            <Typography variant="h2" sx={{ color: "white", fontWeight: "100", marginBottom: "40px" }}>
              The Ultimate Car Inspection Solution
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              CarPass is a mobile app that allows you to inspect your car with ease.
            </Typography>
            <Typography variant="body1" sx={{ color: "white", marginBottom: "40px" }}>
              Get the app now and start inspecting your car like a pro.
            </Typography>
            <a href="https://carpass-images.s3.eu-north-1.amazonaws.com/public/carpass-lite.apk?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCmV1LW5vcnRoLTEiRzBFAiEA7nCyYP38m6HCNDvXYRM8WQcJZaCqGX0nzcK943jRjxwCICWI5REnRzDhMa6lRUhJybAlD%2FknBpfQWGFUmUNtTAs1KtADCLn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMDM0MzYyMDQyMTQ1IgzZ9jMDsOrNGvMPryUqpAPdhHFuU8NuqvzGj1YdVmioa5HwWJSKSw33etJhxzsHwJBPLsgqymINJmiFtlUB8sDnf2jNPPVjI2C%2B5rzihNBo7FUIfWurG8QgZ%2BFauodlaHAXpZjLjZSy%2BSHUx5Dgzfap7TVAqdzSA3TDMq%2FyQL6mNw10PFoybz%2BpEy1Zseaha%2F9TA7691hpn%2BVcn1o%2B72eFyvMa4xvmVTjzG3hHlIFH8cPKnL9GUEcA1mRCodQoY8x5w%2Fz124kbpXoILjnxKkJNnWi0i3NFsoX2nq9bLPNwK9NZsUNWyxYZEgH5vn4PHZcAVtVuFM%2BwniEqfh%2FBd3Qb%2FPH3xKMLk%2FbF%2FpsQ0qkcPgtUC7HWE1ILH1OpS7OJMwUDzl5K%2FKoAFaP8kjnRUAUIJcyuvxNvUg24zv9SxO4XDpp3UVuEv4QzEZAusmSSmSp19MovZ8WxZ9oQSwvnWr9RJsJJ3tEOtw9mq8T0yNMItf2belbWX0P0%2BqQDP03YQCTIXp3Nq9eqUgyPWZR7lFmnXs3Pgq%2BPlyC0DHwjVvk0wm22bi1dCmcIefgt5oT5PR947hcMw1vT%2BuQY65AKWf7TfvmsrvHmv2tQM4%2FYAF%2FO5a3HDz6jA%2B8t%2FdtwsvZK7Tn%2BnD4ZneKbIor7kUW5T4kgHq0JIhVBsbaD6f8FkpETPL7h%2BGwHPKh%2BaPTXGgW3t3bpyClv70qj2nOTy3VMmiq6s3ZHaylB0ChLAA%2BGyqQccz1KspEFDnZZWQD2Y4pKvKd0fUfxv5XVDrZeW23Px8rN4DJHRhXibgPKEXA83KrAc9BIWYI5rQh23zmC1nO5kWlxTn5el0P9YfcPRjrW5H6OgJQyqfDpL9SlLja8kEPp5DEI65UIljiRfz3grhtWHfGI8EQUJo4%2Fg3KaUZ%2BHU6unaToA%2FQYphsORdmFQF8rj20dImqHDJmCfwIb4lRJeg7eAM1XYL0FyxOcW%2B%2FEK3%2Fovrv5UFQdR%2Bo2R8lN8PlafJGbgrFZBjxVP8hoqoZCLrjG5j2mqNJM9bSRmkkWi1MwyALRMXfK%2Fv8POkE9cfZ6PNsA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAQQABDE4Q7KUAEHMT%2F20241122%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20241122T072332Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=5b8b3b4f2a8d2b476606e62be739aa87075b4ee5846141953e700ed60078e41c" target="_blank" rel="noreferrer">
              <Button color="info" sx={{ backgroundColor: "#222222" }} startIcon={<Android sx={{ color: "greenyellow" }} />}>
                Get Android App
              </Button>
            </a>
          </Box>
          <Box
            sx={{
              width: "35%",
              height: "100%",
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={phone}
              alt="phone"
              style={{
                backgroundImage: `url("${logo}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
