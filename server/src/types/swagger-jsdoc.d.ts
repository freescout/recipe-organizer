/* // src/types/swagger-jsdoc.d.ts
declare module "swagger-jsdoc" {
  import { OpenAPIObject } from "openapi3-ts";
  interface Options {
    definition: OpenAPIObject;
    apis: string[];
  }

  export default function swaggerJSDoc(options: Options): OpenAPIObject;
}
 */

declare module "swagger-jsdoc" {
  const swaggerJSDoc: any;
  export default swaggerJSDoc;
}
