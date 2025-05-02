import prisma from "../config/db.js";

export const getDashboard = async (req, res) => {
  try {
    const userFolders = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
        parentId: null,
      },
      include: {
        children: true,
        files: false,
      },
    });
    res.render("dashboard", { user: req.user, folders: userFolders });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default getDashboard;
