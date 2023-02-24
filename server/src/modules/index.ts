import { Express, Router } from "express";
import { existsSync, readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
/**
 *
 * @returns
 */
const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift();
  return file;
};

export default function (app: Express) {
  readdirSync(PATH_ROUTER).filter((fileName) => {
    const cleanName = cleanFileName(fileName);
    const isFileExists = existsSync(
      `${PATH_ROUTER}/${fileName}/${fileName}.route.ts`
    );
    if (cleanName !== "index" && isFileExists) {
      import(`./${fileName}/${fileName}.route`).then((moduleRouters) => {
        const router = moduleRouters.default as Router;
        if (Object.keys(router).length) {
          console.log({
            module: cleanName,
            paths: router.stack.map((layer) => ({
              path: `/api/${cleanName + layer.route.path}`,
              method: Object.keys(layer.route.methods)[0],
            })),
          });
          app.use(`/api/${cleanName}`, router);
        }
      });
    }
  });
}
