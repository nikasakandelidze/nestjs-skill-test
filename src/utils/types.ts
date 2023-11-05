export type UploadFiles = {
  photos?: Express.Multer.File[];
};

export const FILE_TYPE_MAPPINGS: Record<string, string> = {
  "text/plain": "txt",
};
