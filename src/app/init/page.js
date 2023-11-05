'use client';

import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import readXlsxFile from "read-excel-file";

export default function Init() {
  async function handleChange(event) {
    event.preventDefault();
    const productConstraints = await readXlsxFile(event.target.files[0]).then(rows => rows.slice(2).map(row => {
      const constraint = {
        productId: row[0],
        quantityPerPallet: row[1],
        palletType: row[2]
      };
      return constraint;
    }))
    console.log(productConstraints);
    await fetch('/api/productConstraints', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify([...productConstraints])
    });
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
