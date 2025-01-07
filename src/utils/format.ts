const formatDate = (date?: Date): string => {
  // yyyy-MM-dd
  const offset = new Date().getTimezoneOffset() * 60000;
  return date ? new Date(date.getTime() - offset).toISOString().split("T")[0] : "";
};

const unescapeHtml = (html: string): string | null => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent;
};

export { formatDate, unescapeHtml };
