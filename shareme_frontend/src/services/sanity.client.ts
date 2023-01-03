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
};

export const searchQuery = (searchTerm: string) => {
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image {
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id, 
            userName, 
            image
        },
        save[] {
            _key, 
            postedBy -> {
                _id, 
                userName, 
                image
            },
        },
    }`
    return query;
};

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image {
        asset -> {
            url
        }
    },
    _id,
    destination,
    postedBy -> {
        _id, 
        userName, 
        image
    },
    save[] {
        _key, 
        postedBy -> {
            _id, 
            userName, 
            image
        },
    },
}`