import { MasterContent } from "../../models";
import { Request as req, Response as res } from "express";

async function getMasterContent(req: req, res: res) {
  try {
    const master_content = await MasterContent.find(
      { },
      { dCreatedAt: 0, dUpdatedAt: 0 },
    ).lean();

    if (!master_content) return res.status(404).json({ message: "Data Not Found" });

    res.json({
      responseMsg: {
        master_content: master_content,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export { getMasterContent };