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
      where: { id: folderId },
      include: {
        children: true,
        files: true,
        parent: true,
      },
    });

    if (!folder) {
      return res.status(404).redirect("/dashboard");
    }

    res.render("openFolder", { folder });
  } catch (error) {
    console.error("Error in openFolder: ", error);
    res.status(500).render("dashboard", {
      errors: [{ msg: "Something went wrong. Please try again." }],
    });
  }
};
