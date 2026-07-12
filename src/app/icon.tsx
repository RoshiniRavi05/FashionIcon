import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  const imagePath = path.join(process.cwd(), 'public', 'arc_opus_logo.jpeg');
  const imageBuffer = fs.readFileSync(imagePath);
  const imageBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#050505', // matches the deep black branding
        }}
      >
        <img
          src={imageBase64}
          alt="ARC OPUS Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
