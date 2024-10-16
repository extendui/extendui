import { registryComponents } from "../registry";
import { promises as fs } from "fs";
import { z } from "zod";
import path from "path";
import { registryItemFileSchema } from "@/registry/schema";

const REGISTRY_BASE_PATH = "registry";
const PUBLIC_FOLDER_BASE_PATH = "public/registry";

type File = z.infer<typeof registryItemFileSchema>;
const FolderToComponentTypeMap = {
  block: "registry:block",
  component: "registry:component",
  hooks: "registry:hook",
  ui: "registry:ui",
};

async function writeFileRecursive(filePath: string, data: string) {
  const dir = path.dirname(filePath); // Extract the directory path

  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, data, "utf-8");
    console.log(`File written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing file`);
    console.error(error);
  }
}

const getComponentFiles = async (files: File[]) => {
  const filesArrayPromises = (files ?? []).map(async (file) => {
    if (typeof file === "string") {
      const filePath = `src/${REGISTRY_BASE_PATH}/${file}`;
      const fileContent = await fs.readFile(filePath, "utf-8");
      return {
        type: FolderToComponentTypeMap[
          file.split("/")[1] as keyof typeof FolderToComponentTypeMap
        ],
        content: fileContent,
        path: file,
        target: `${file}`,
      };
    }
  });
  const filesArray = await Promise.all(filesArrayPromises);

  return filesArray;
};

const main = async () => {
  // make a json file and put it in public folder
  for (let i = 0; i < registryComponents.length; i++) {
    const component = registryComponents[i];
    const files = component.files;
    if (!files) throw new Error("No files found for component");

    const filesArray = await getComponentFiles(files);

    const json = JSON.stringify(
      {
        ...component,
        files: filesArray,
      },
      null,
      2
    );
    const jsonPath = `${PUBLIC_FOLDER_BASE_PATH}/${component.name}.json`;
    await writeFileRecursive(jsonPath, json);
    console.log(json);
  }
};

main()
  .then(() => {
    console.log("done");
  })
  .catch((err) => {
    console.error(err);
  });