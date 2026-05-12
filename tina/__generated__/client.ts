import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4010/graphql', token: 'eb490d21583cbffb0423f5fa9d878fd343246fb7', queries,  });
export default client;
  