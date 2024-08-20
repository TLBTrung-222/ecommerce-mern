import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface InputSearchProps {
    label: string;
    size: "small" | "medium";
    width?: string;
}

function InputSearch({ size, label, width = "400px" }: InputSearchProps) {
    const [searchValue, setSearchValue] = React.useState<string>("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSearchValue(e.target.value);
    };
    const handleClear = () => {
        setSearchValue("");
    };
    return (
        <TextField
            id="outlined-search"
            label={label}
            type="text"
            size={size}
            value={searchValue}
            onChange={handleChange}
            sx={{
                width: { width },
                "& label": { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" }, // Targets the fieldset element inside the OutlinedInput.
                    "&:hover fieldset": { borderColor: "white" }, // Changes the border color when the TextField is hovered.
                    "&.Mui-focused fieldset": { borderColor: "white" }, // Changes the border color when the TextField is focused.
                    "& input": { color: "white" }, // Ensures the input text color is white.
                    "& .MuiInputAdornment-root svg": { color: "white" }, // Ensures the icons are white.
                },
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                    <IconButton onClick={handleClear}>
                        <ClearIcon
                            sx={{
                                color: searchValue ? "white" : "transparent",
                            }}
                        />
                    </IconButton>
                ),
            }}
        />
    );
}

export default InputSearch;
