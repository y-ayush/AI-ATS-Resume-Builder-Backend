// src/controllers/print.controller.js

import puppeteer from "puppeteer";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const printResume = async (req, res) => {
    const { id } = req.query;
    console.log(id);

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    //    If dev:  http://localhost:3000/print/${id}
    //    If prod: http://<my‑domain>/print/${id}
    const printUrl =
        process.env.NODE_ENV === "Dev"
            ? `${process.env.ALLOWED_SITE}/print/${id}`
            : `${process.env.ProductionUrl}/print/${id}`;

    console.log(printUrl);

    await page.goto(printUrl, { waitUntil: "networkidle0" });

    const tempDir = path.join(__dirname, "..", "temp");
    const tempFilename = `resume-${uuidv4()}.pdf`;
    const tempPath = path.join(tempDir, tempFilename);

    await fs.ensureDir(tempDir);
    await page.pdf({
        path: tempPath,
        format: "A4",
        printBackground: true,
    });
    await browser.close();

    res.download(tempPath, `resume-${id}.pdf`, async (err) => {
        await fs.remove(tempPath);
        if (err) {
            console.error("Download error:", err);
            res.status(500).send("Failed to download PDF");
        }
    });
};
