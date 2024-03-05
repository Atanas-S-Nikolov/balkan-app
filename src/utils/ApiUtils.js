export function handleServerErrors(error, res) {
  const { status } = error;
  if (status >= 500) {
    if (status === 503) {
      res.status(503).json({ message: "Сървърът е недостъпен или е в процес на поддръжка." });
    } else if (status === 504) {
      res.status(504).json({ message: "Сървърът не успя да обработи заявката. Тя може да е твърде голяма или интернет връзката да е нестабилна." });
    } else {
      res.status(500).json({ message: "Възникна грешка. Моля опитайте отново." });
    }
  }
}
