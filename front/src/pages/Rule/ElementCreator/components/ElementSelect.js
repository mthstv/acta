import React, {useState} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const ElementSelect = props => {

  const [selected, setSelected] = useState("");

  const handleChange = (value) => {
    setSelected(value);
    props.onElementChange(value);
  };

  return (
    <FormControl 
      fullWidth={true}
    >
      <InputLabel htmlFor="Element">Elemento</InputLabel>
      <Select
        value={selected ? selected : ""}
        onChange={(e) => handleChange(e.target.value)}
      >
        <MenuItem value="">
          <em>Nenhum</em>
        </MenuItem>
        <MenuItem value={"part"}> Parte </MenuItem>
        <MenuItem value={"book"}> Livro </MenuItem>
        <MenuItem value={"title"}> Título </MenuItem>
        <MenuItem value={"chapter"}> Capítulo </MenuItem>
        <MenuItem value={"section"}> Seção</MenuItem>
        <MenuItem value={"subsection"}> Subseção </MenuItem>
        <MenuItem value={"article"}> Artigo </MenuItem>
        <MenuItem value={"paragraph"}> Parágrafo </MenuItem>
        <MenuItem value={"incise"}> Inciso </MenuItem>
        <MenuItem value={"line"}> Alínea </MenuItem>
        <MenuItem value={"item"}> Item </MenuItem>
      </Select>
    </FormControl>
  );
};

export default ElementSelect;