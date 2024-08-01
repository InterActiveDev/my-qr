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
    const yearMonth = now.toISODate().slice(0, 7);
    const dateStr = now.toISODate();
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

    // Try to append to the file; if it doesn't exist, create it
    try {
      await fs.access(filePath);
      await fs.appendFile(filePath, content, "utf8");
    } catch (error) {
      if (error.code === "ENOENT") {
        // File does not exist, create it
        await fs.writeFile(filePath, content, "utf8");
      } else {
        throw error;
      }
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
