/**
 * Single place to point the whole site at a WordPress instance.
 * To deploy against a different WordPress site (staging, production, a
 * client's real domain), change WORDPRESS_URL below, nothing else.
 */
export const WORDPRESS_URL = "https://backend.peoplepulsemediallc.com";

/** Derived automatically — leave as-is unless the GraphQL endpoint is at a non-standard path. */
export const WORDPRESS_GRAPHQL_URL = `${WORDPRESS_URL}/graphql`;

/** Only needed if the WordPress GraphQL endpoint requires an auth token to read. Leave blank otherwise. */
export const WORDPRESS_API_TOKEN = "";
