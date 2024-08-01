import { promises as fs } from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const { yearMonth, date } = getQuery(event);

  if (!yearMonth || !date) {
    throw createError({
      statusCode: 400,
      statusMessage: "Year-Month and Date parameters are required",
    });
  }

  const logDir = path.join(process.cwd(), "public", "logs", yearMonth);
  const fileName = `${date}.log`;
  const filePath = path.join(logDir, fileName);

  try {
    // Check if the file exists
    await fs.access(filePath);

    // Read the file content
    const fileContent = await fs.readFile(filePath, "utf8");

    // Set the response headers for file download
    setHeaders(event, {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename=${fileName}`,
    });

    // Return the file content
    return fileContent;
  } catch (error) {
    console.error("Error downloading log file:", error);
    throw createError({
      statusCode: 404,
      statusMessage: "Log file not found",
    });
  }
});
