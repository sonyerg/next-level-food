import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error("Loading meals failed.");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  // const date = new Date().toISOString().split("T")[0];
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  //we want to store the uploaded image to the public/images file
  //fs or file system - allows working within the files of the project
  const stream = fs.createWriteStream(`public/images/${fileName}`); //write data to a certain file
  const bufferedImage = await meal.image.arrayBuffer();

  //write on the stream. Write the meal.image on the target file(stream)
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed to save image");
    }
  });

  //do not store image on db.
  //override the image, and store the path instead.
  //so when this is read by a component,
  //it will follow the path on the meal.image to be displayed.
  //see: image key on dummyMeals array of objects in initdb.js
  meal.image = `/images/${fileName}`;
  //all requests for images will be sent to public folder.
  //so no need to include public on the path

  db.prepare(
    `
  INSERT INTO meals
  (title, summary, instructions, creator, creator_email, image, slug)
  VALUES (
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @image,
    @slug
  )
  `
  ).run(meal);
}
