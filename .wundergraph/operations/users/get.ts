import { createOperation, z } from '../../generated/wundergraph.factory';
import { readFile } from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'operations/users/db.json');
const defaultUser = (id) => ({
 id,
 name: 'Default user',
 bio: 'Default user return if user does not exist.'
});

export default createOperation.query({
	input: z.object({
		id: z.string(),
	}),
	handler: async ({ input }) => {
		const json = JSON.parse(await readFile(filePath, 'utf8'));
			return json[input.id] || defaultUser(input.id);
	}
});
