import Button from "@mui/material/Button";
import XLSX from "sheetjs-style";
import DownloadIcon from '@mui/icons-material/Download';

export default function ExcelFileDownloader({ fileName, excelData }) {
  const fileExtension = '.xlsx';

  async function handleDownload(event) {
    event.preventDefault();
    const worksheet = XLSX.utils.json_to_sheet(excelData, { skipHeader: true });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName.toString());
    XLSX.writeFile(workbook, fileName + fileExtension);
  }

  return (
    <Button
      variant="contained"
      startIcon={<DownloadIcon />}
      onClick={handleDownload}
    >
      Изтегли Excel файл
    </Button>
  )
}
