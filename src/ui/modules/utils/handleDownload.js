export const handleDownload = (text, filename) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename || "scraped_content.txt";
    document.body.appendChild(element);
    element.click();
  };
  