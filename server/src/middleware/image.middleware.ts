// import type { Request } from "express";
// import multer from "multer";

// const storage = multer.diskStorage({
//   destination(req: Request, file: Express.Multer.File, callback) {
//     callback(null, "./public/temp/");
//   },
//   filename(req: Request, file: Express.Multer.File, callback) {
//     const fileName = file.originalname.split(".");

//     const ext = fileName[fileName.length - 1];
//     callback(
//       null,
//       `${file.originalname}-${Math.round(Math.random() * 81837234)}.${ext}`
//     );
//   },
// });

// const uploadFile = (extensionArray: Array<string>, fileSize: number) => {
//   return multer({
//     storage: storage,
//     limits: {
//       fileSize: 1024 * 1024 * fileSize,
//     },
//     fileFilter(req: Request, file: Express.Multer.File, callback) {
//       const ext = file?.originalname?.split(".").pop()?.toLowerCase();

//       if (ext && extensionArray.includes(ext)) {
//         callback(null, true);
//       } else {
//         callback(null, false);
//         throw new Error("File type not supported");
//       }
//     },
//   });
// };

// const upload = () => {
//   return multer({
//     storage: storage,
//   });
// };

// export { uploadFile, upload };

import multer from "multer";
import type { Request } from "express";

const uploadFile = (extensionArray: Array<string>, fileSize: number) => {
  return multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 1024 * 1024 * fileSize, // in bytes
    },
    fileFilter(req: Request, file, cb) {
      const ext = file.originalname.split(".").pop()?.toLowerCase();
      if (ext && extensionArray.includes(ext)) {
        cb(null, true);
      } else {
        const error = new Error("File type not supported");
        cb(error as unknown as null, false);
      }
    },
  });
};

export { uploadFile };
