import { createOperation, z } from '../../generated/wundergraph.factory';
import {readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), 'operations/users/db.json');
const defaultBio = 'This is a default bio.'
const defaultName = 'This is a default name.'
export default createOperation.mutation({
 input: z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string(),
 }),
 handler: async ({ input }) => {
  let json = JSON.parse(await readFile(filePath, 'utf8'));
  json = json || {users: {}};
  const user = {
   id: input.id,
   name: defaultName,
   bio: defaultBio,
   ...input,
  };
  json[input.id] = user;
  await writeFile(filePath, JSON.stringify(json));
  return {
   message: 'User updated.',
   user: user,
  }
 },
});