import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import * as multer from "multer";

export const DISK_STORAGE_OPTIONS = {
  storage: diskStorage({
    destination: "./uploads", // or any path where you want to store the files
    filename: (req, file, callback) => {
      const fileExtName = path.extname(file.originalname);
      const filename = `${uuidv4()}${fileExtName}`;
      callback(null, filename);
    },
  }),
};

export const S3_STORAGE_OPTIONS = {
  storage: multer.memoryStorage(),
};
