import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("gallery", "routes/gallery.tsx"),
  route("recipe/:id", "routes/recipe.$id.tsx"),
] satisfies RouteConfig;
