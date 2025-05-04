import { body, validationResult } from "express-validator";
import prisma from "../config/db.js";

export const createFolder = [
  body("name").trim().notEmpty().withMessage("A name is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createFolder", {
        errors: errors.array(),
        parentId: req.body.parentId,
      });
    }

    try {
      const { name, parentId } = req.body;
      await prisma.folder.create({
        data: {
          name,
          userId: parseInt(req.user.id),
          parentId: parentId ? parseInt(parentId) : null,
        },
      });

      if (parentId) {
        return res.redirect(`/folder/${parentId}`);
      }
      res.redirect("/dashboard");
    } catch (error) {
      console.error("Error in createFolder: ", error);
      res.status(500).render("createFolder", {
        errors: [{ msg: "Something went wrong. Please try again." }],
        parentId: req.body.parentId,
      });
    }
  },
];

export const openFolder = async (req, res) => {
  try {
    const folderId = parseInt(req.params.id);

    const folder = await prisma.folder.findUnique({
      where: {
        id: folderId,
      },
      include: {
        children: true,
        files: true,
        parent: true,
      },
    });

    if (!folder) {
      return res.status(404).redirect("/dashboard");
    }

    res.render("openFolder", {
      folder,
      user: req.user,
    });
  } catch (error) {
    console.error("Error in openFolder: ", error);
    res.status(500).render("dashboard", {
      errors: [{ msg: "Something went wrong. Please try again." }],
      user: req.user,
      folders: [],
    });
  }
};

export const updateFolderGet = async (req, res) => {
  try {
    const folderId = parseInt(req.params.id);
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
    });

    if (!folder) {
      return res.status(404).send("Folder not found");
    }

    res.render("updateFolder", { folder });
  } catch (error) {
    console.error("Error in updateFolderGet: ", error);
    return res.status(500).send("Something went wrong. Please try again.");
  }
};

export const updateFolderPost = [
  body("name").trim().notEmpty().withMessage("A name is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateFolder", {
        errors: errors.array(),
      });
    }

    try {
      const folderId = parseInt(req.params.id);
      const { name } = req.body;

      const folder = await prisma.folder.update({
        data: { name },
        where: { id: folderId },
      });

      if (folder.parentId) {
        return res.redirect(`/folder/${folder.parentId}`);
      }

      res.redirect("/dashboard");
    } catch (error) {
      console.error("Error in updateFolderPost: ", error);
      return res.status(500).render("updateFolder", {
        errors: [{ msg: "Something went wrong. Please try again." }],
      });
    }
  },
];

export const deleteFolder = async (req, res) => {
  try {
    const folderId = parseInt(req.params.id);

    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      select: { parentId: true },
    });

    if (!folder) return res.status(404).redirect("/dashboard");

    await prisma.folder.delete({
      where: { id: folderId },
    });

    if (folder.parentId) {
      return res.redirect(`/folder/${folder.parentId}`);
    }

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error deleting folder:", error);
    res.status(500).send("Error deleting folder");
  }
};
