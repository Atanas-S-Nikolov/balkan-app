'use client';

import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import readXlsxFile from "read-excel-file";

export default function Init() {
  function handleChange(event) {
    event.preventDefault();
    readXlsxFile(event.target.files[0]).then(rows => rows.slice(2).map(row => {
      console.log(row);
    }))
  };
  
  return (
    <>
      <InputLabel htmlFor='read-excel'>Choose file</InputLabel>
      <Input
        id='read-excel'
        type="file"
        onChange={handleChange}
        inputProps={{
          accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        }}
      />
    </>
  )
}
