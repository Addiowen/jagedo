import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

// Initialize the S3 client
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!;
    const fileKey = file.name; // The key for the file in S3

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: bucketName,
        Key: fileKey,
        Body: file,
        ContentType: file.type,
      },
    });

    await upload.done();

    // Construct the URL to the uploaded file
    const fileUrl = `https://${bucketName}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileKey}`;

    return NextResponse.json({ message: 'File uploaded successfully.', url: fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

