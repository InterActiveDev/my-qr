import { promises as fs } from "fs";
import path from "path";
import { DateTime } from "luxon";

export default defineEventHandler(async (event) => {
  try {
    const {
      ipAddress,
      publicIp,
      userAgent,
      userAgentData,
      languages,
      platform,
      appVersion,
      lastUpdate,
      url,
      locName,
      table,
    } = await readBody(event);

    const now = DateTime.now().setZone("Asia/Jakarta");
    const yearMonth = now.toISODate().slice(0, 7); // Get the year and month part of the ISO string
    const dateStr = now.toISODate(); // Get the date part of the ISO string
    const fileName = `${dateStr}.txt`;
    const logDir = path.join(process.cwd(), "log", yearMonth);

    // Ensure the log directory exists
    await fs.mkdir(logDir, { recursive: true });

    const filePath = path.join(logDir, fileName);

    const timeStr = now.toFormat("HH:mm:ss"); // Get the time part in HH:mm:ss format
    const content = `${dateStr} ${timeStr} [
  locName: ${locName}
  table: ${table}
  url: ${url}
  ipLocal: ${ipAddress} 
  ipPublic: ${JSON.stringify(publicIp)}
  userAgent: ${userAgent}
  userAgentData: ${JSON.stringify(userAgentData)}
  languages: ${JSON.stringify(languages)}
  platform: ${platform}
  appVersion: ${appVersion}
  lastUpdate: ${lastUpdate}
]\n`;

    // Check if the file exists
    try {
      await fs.access(filePath);
      // If the file exists, append the content
      await fs.appendFile(filePath, content, "utf8");
    } catch (error) {
      // If the file does not exist, create it with the content
      await fs.writeFile(filePath, content, "utf8");
    }

    return {
      message: "File updated successfully",
      fileName,
    };
  } catch (error) {
    console.error("Error creating or updating log file:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create or update log file",
    });
  }
});