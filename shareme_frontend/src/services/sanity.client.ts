import * as sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
import config from "../config";

const { sanityConfig } = config;
console.log(sanityConfig)
export const client: sanityClient.SanityClient = sanityClient.default({
    projectId: sanityConfig.projectId,
    dataset: 'production',
    apiVersion: '2021-11-16',
    useCdn: true,
    token: sanityConfig.token
});

// used default because imagebuilder is exported by default
const builder = ImageUrlBuilder(client);

export const UrlFor = (source:any) => builder.image(source);

export const userQuery = (userId: string) => {
    const query = `*[_type == "user" && _id == '${userId}']`
    return query;
}