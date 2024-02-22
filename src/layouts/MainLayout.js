import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Fab, Stack } from "@mui/material";
import { MainFooter } from "./MainFooter";
import { MainHeader } from "./MainHeader";
import PokemonModal from "../components/PokemonModal";
import { useState } from "react";
import EggIcon from "@mui/icons-material/Egg";
import PokemonModalUpdate from "../components/PokemonModalUpdate";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deletePokemon } from "../features/pokemons/pokemonSlice";

function MainLayout() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
      <PokemonModal open={open} setOpen={setOpen} />
      <PokemonModalUpdate open={openUpdate} setOpen={setOpenUpdate} />
      {location.pathname !== "/" ? (
        <>
          <Box
            sx={{
              position: "fixed",
              bottom: "13rem",
              right: "1rem",
              color: "white",
              borderRadius: "50%",
              "& > :not(style)": { m: 1 },
            }}
            onClick={() => {
              const id = location.pathname.slice(10, location.pathname.length);
              dispatch(deletePokemon({ id }));
              navigate("/");
            }}
          >
            <Fab color="primary" aria-label="add">
              <DeleteIcon className="create-btn" />
            </Fab>
          </Box>
          <Box
            sx={{
              position: "fixed",
              bottom: "8rem",
              right: "1rem",
              color: "white",
              borderRadius: "50%",
              "& > :not(style)": { m: 1 },
            }}
            onClick={handleOpenUpdate}
          >
            <Fab color="primary" aria-label="add">
              <UpdateIcon className="create-btn" />
            </Fab>
          </Box>
        </>
      ) : (
        ""
      )}

      <Box
        sx={{
          position: "fixed",
          bottom: "3rem",
          right: "1rem",
          color: "white",
          borderRadius: "50%",
          "& > :not(style)": { m: 1 },
        }}
        onClick={handleOpen}
      >
        <Fab color="primary" aria-label="add">
          <EggIcon className="create-btn" />
        </Fab>
      </Box>
    </Stack>
  );
}

export default MainLayout;
