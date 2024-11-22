"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_routes_1 = require("./routes/index.routes");
const body_parser_1 = __importDefault(require("body-parser"));
const database_services_1 = __importDefault(require("@/services/database.services"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const app = (0, express_1.default)();
const port = 3000;
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'BE API',
            version: '1.0.0',
            description: 'BE API',
            contact: {
                name: 'BE-Test',
                email: 'tranbaoanh@gmail.com'
            }
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerformat: 'JWT'
                }
            }
        },
        servers: [
            {
                url: 'https://tranbaoanh.io.vn'
            }
        ]
    },
    apis: ['./src/routes/*.routes.ts', './src/models/requests/*.requests.ts']
};
const swaggerSpecification = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, index_routes_1.routes)(app);
database_services_1.default.connect().then(() => {
    database_services_1.default.indexUsers();
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpecification));
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
