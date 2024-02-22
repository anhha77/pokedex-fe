import Box from "@mui/material/Box";
import { FormProvider, FTextField } from "./form";
import Modal from "@mui/material/Modal";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { alpha, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { addPokemon, editPokemon } from "../features/pokemons/pokemonSlice";
import { useNavigate, useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const defaultValues = {
  name: "",
  id: "",
  url: "",
  type1: "",
  type2: "",
};

export default function PokemonModalUpdate({ open, setOpen }) {
  const navigate = useNavigate();
  const methods = useForm(defaultValues);
  const params = useParams();
  const id = params.id;
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const { name, url, type1, type2 } = data;
    console.log(data);
    console.log(id);
    dispatch(
      editPokemon({ name, id, imgUrl: url, types: [type1, type2] })
    ).then(() => {
      reset();
      navigate(`/pokemons/${id}`);
    });
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FTextField
                name="name"
                fullWidth
                rows={4}
                placeholder="Name"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />
              {/* <FTextField
                name="id"
                fullWidth
                rows={4}
                placeholder="Id"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              /> */}
              <FTextField
                name="url"
                fullWidth
                // rows={4}
                placeholder="Image Url"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />
              <FTextField
                name="type1"
                fullWidth
                rows={4}
                placeholder="Type 1"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />
              <FTextField
                name="type2"
                fullWidth
                rows={4}
                placeholder="Type 2"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="small"
                  loading={
                    isSubmitting
                    // || isLoading
                  }
                >
                  Update Pokemon
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}
