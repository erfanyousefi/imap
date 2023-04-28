import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
export function SwaggerConfigInit(app: any): void {
    const swaggerConfig = new DocumentBuilder()
    .setTitle("MailServer")
    .setDescription(`Test project for "Yeganeh Ertebatet Pishroo"`)
    .setVersion("v0.0.1")
    .addTag("NestJs Application")
    .addBearerAuth(SwaggerAuthConfig(), 'Authorization')
    .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("/", app, swaggerDocument);
}

function SwaggerAuthConfig(): SecuritySchemeObject {
    return {
        type: "http",
        bearerFormat: "JWT",
        in: "header",
        scheme: "bearer"
    }
}