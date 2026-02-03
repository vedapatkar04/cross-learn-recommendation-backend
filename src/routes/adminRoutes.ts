import { Router } from "express";
import { authMiddleware } from "../authorization/auth";
import { adminMiddleware } from "../authorization/authAdmin";
import * as contentAdmin from "../controllers/admin/adminContent";
import * as discussionAdmin from "../controllers/admin/adminDiscussion";
import * as communityAdmin from "../controllers/admin/adminCommunity";
import * as statsAdmin from "../controllers/admin/adminStats";

const router = Router();

router.use(authMiddleware, adminMiddleware);

// Content
router.post("/content", contentAdmin.create);
router.put("/content/:id", contentAdmin.update);
router.delete("/content/:id", contentAdmin.remove);

// Discussions
router.get("/discussions/reported", discussionAdmin.listReported);
router.delete("/discussions/:id", discussionAdmin.softDelete);

// Community recommendations
router.get("/community/reported", communityAdmin.listFlagged);
router.delete("/community/:id", communityAdmin.remove);

// Stats
router.get("/stats", statsAdmin.overview);

export default router;
