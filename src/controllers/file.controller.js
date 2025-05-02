import prisma from "../config/db.js";
import { upload } from "../middlewares/multer.js";

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
