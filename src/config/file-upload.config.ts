import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";

export const STORAGE_OPTIONS = {
  storage: diskStorage({
    destination: "./uploads", // or any path where you want to store the files
    filename: (req, file, callback) => {
      const fileExtName = path.extname(file.originalname);
      const filename = `${uuidv4()}${fileExtName}`;
      callback(null, filename);
    },
  }),
};
