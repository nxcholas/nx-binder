import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // Input text
          "& .MuiInputBase-input": {
            color: "white",
          },

          // Label
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },

          // Helper and error text
          "& .MuiFormHelperText-root": {
            color: "white",
          },

          // Outlined border color
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiFilledInput-root": {
            backgroundColor: "oklch(27.8% 0.033 256.848) !important", // your custom background
          },
        },
      },
    },
  },
});
export default theme;
