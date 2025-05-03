import prisma from "../config/db.js";
import { upload } from "../middlewares/multer.js";
import path from "path";
import fs from "fs";

export const uploadFileGet = async (req, res) => {
  const { id } = req.params;
  try {
    const folder = await prisma.folder.findUnique({
      where: { id: parseInt(id) },
    });

    if (!folder) {
      return res.status(404).send("Folder not found");
    }

    res.render("fileUpload", { folder });
  } catch (error) {
    console.error("Error in uploadFileGet: ", error);
    res.status(500).send("Server error");
  }
};

export const uploadFilePost = [
  upload.single("file"),
  async (req, res) => {
    try {
      const { folderId } = req.body;
      const { originalname, path: filePath, mimetype, size } = req.file;

      await prisma.file.create({
        data: {
          name: originalname,
          path: filePath,
          size: size,
          mimetype: mimetype,
          userId: req.user.id,
          folderId: folderId ? parseInt(folderId) : null,
        },
      });

      res.redirect(folderId ? `/folder/${folderId}` : "/dashboard");
    } catch (error) {
      console.error("Error in uploadFilePost: ", error);
      res.status(500).send("Upload failed.");
    }
  },
];

export const fileInfoGet = async (req, res) => {
  const { id } = req.params;

  try {
    const file = await prisma.file.findUnique({
      where: { id: parseInt(id) },
      include: {
        folder: true,
      },
    });

    if (!file) {
      return res.status(404).redirect("/dashboard");
    }

    if (file.userId !== req.user.id) {
      return res.status(403).redirect("/dashboard");
    }

    res.render("viewFile", { file });
  } catch (error) {
    console.error("Error in fileInfoGet: ", error);
    res.status(500).redirect("/dashboard");
  }
};

export const downloadFile = async (req, res) => {
  try {
    const fileId = parseInt(req.params.id);
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return res.status(404).send("File not found");
    }

    if (!fs.existsSync(file.path)) {
      return res.status(404).send("File not found on disk");
    }

    res.download(file.path, file.name);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).send("Server error during file download");
  }
};
