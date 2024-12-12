import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectVariants() {
  const [model, setModel] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [dataset, setDataset] = React.useState("");
  const handleDatasetChange = (event) => {
    setDataset(event.target.value);
  };
  const handleModelChange = (event) => {
    setModel(event.target.value);
  };
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Dataset</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={dataset}
          onChange={handleDatasetChange}
          label="Dataset"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"SIB-200"}>SIB-200</MenuItem>
          <MenuItem value={"Taxi-1500"}>Taxi-1500</MenuItem>
          <MenuItem value={"Flores-200"}>Flores-200(Translation)</MenuItem>
          <MenuItem value={"XLSum"}>XLSum(Summarization)</MenuItem>
          <MenuItem value={"Aya"}>Aya(OEG)</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Model</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={model}
          onChange={handleModelChange}
          label="Model"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"bloom-7b1"}>bloom-7b1</MenuItem>
          <MenuItem value={"bloomz-7b1"}>bloomz-7b1</MenuItem>
          <MenuItem value={"CodeLlama-7b-hf"}>CodeLlama-7b-hf</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-zstandard"
          value={language}
          onChange={handleLanguageChange}
          label="Language"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"aah_Latn"}>aah_Latn</MenuItem>
          <MenuItem value={"aai_Latn"}>aai_Latn</MenuItem>
          <MenuItem value={"aak_Latn"}>aak_Latn</MenuItem>
          <MenuItem value={"aak_Latn"}>ace_Arab</MenuItem>
          <MenuItem value={"amh_Ethi"}>amh_Ethi</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
