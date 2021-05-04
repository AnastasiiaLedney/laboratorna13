import { Router } from "express";
import multer from "multer";
import fs from "fs";

const fileRouter = new Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "files/");
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.match(/\.\w+$/)[0];
        const filename = `${Date.now()}${ext}`;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg")
        cb(null, true);
    else
        cb(new Error("Only jpeg images"));
}

const limits = {
    fileSize: 1024 * 1024
};

const imgUpload = multer({
    storage,
    fileFilter,
    limits
});

fileRouter.post("/", imgUpload.single("image"), (req, res) => {
    res.send(req.file);
});


fileRouter.delete("/:filename", async (req, res) => {
    try {        
        fs.unlinkSync(`/${req.params.filename}`);
    }
    catch (e){
        console.error(e);
        res.send(e);
    }
});

export default fileRouter;