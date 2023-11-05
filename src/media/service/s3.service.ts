import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { Upload } from "@aws-sdk/lib-storage";

@Injectable()
export class S3Service {
  private s3: S3;
  private bucketName: string;
  private region: string;
  private logger: Logger = new Logger(S3Service.name);

  constructor(configService: ConfigService) {
    const AWS_SECRET_KEY = configService.get<string>("AWS_SECRET_KEY");
    const AWS_ACCESS_ID = configService.get<string>("AWS_ACCESS_ID");
    const AWS_BUCKET_REGION = configService.get<string>("AWS_BUCKET_REGION");
    this.region = AWS_BUCKET_REGION;
    this.bucketName = configService.get<string>("AWS_BUCKET_NAME");
    this.s3 = new S3({
      credentials: {
        accessKeyId: AWS_ACCESS_ID,
        secretAccessKey: AWS_SECRET_KEY,
      },
      region: AWS_BUCKET_REGION,
    });
  }

  async uploadFile(
    fileStream: Readable,
    fileName: string,
  ): Promise<{ url: string }> {
    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: this.bucketName,
        Key: fileName,
        Body: fileStream,
      },
    });

    try {
      const result: any = await upload.done();
      const fileUrl = result.Location; // The URL of the uploaded file
      return { url: fileUrl };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Error uploading file");
    }
  }
}
