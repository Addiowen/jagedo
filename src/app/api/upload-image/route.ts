import { NextResponse } from 'next/server';
import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getServerSession } from 'next-auth';

// Initialize the S3 client
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId'); // Extract the userId from the form data

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: 'No user ID provided.' }, { status: 400 });
    }

    const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!;
    const folderKey = `${userId}/`; // This is the "folder" key
    const fileKey = `${folderKey}${file.name}`; // The file key within the user's folder

    // Check if the folder exists by checking for any object with the user's prefix
    try {
      await s3Client.send(new HeadObjectCommand({ Bucket: bucketName, Key: folderKey }));
      // If it succeeds, the "folder" already exists (i.e., objects with this prefix exist)
    } catch (error: any) {
      if (error.name !== 'NotFound') {
        // If the error is not a 404, something else went wrong
        throw error;
      }
      // If a 404 is caught, no folder exists with that prefix
      console.log(`Creating a new folder for user ${userId}`);
    }

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: bucketName,
        Key: fileKey, // Use the fileKey which includes the userId folder path
        Body: file.stream(),
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
