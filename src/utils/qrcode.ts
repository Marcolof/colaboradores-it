import QRCode from 'qrcode';

export async function generateVCardQRCode(
  nombre: string,
  apellido: string,
  cargo: string,
  telefono: string,
  email: string,
  organizacion: string = 'Vortex IT',
  url: string = 'https://vortex-it.com/',
  size: number = 140
): Promise<string> {
  const vCard = `BEGIN:VCARD
VERSION:3.0
N:${apellido};${nombre};;;
FN:${nombre} ${apellido}
TITLE:${cargo}
TEL;TYPE=CELL:${telefono}
EMAIL:${email}
ORG:${organizacion}
URL:${url}
END:VCARD`;

  try {
    const qrDataUrl = await QRCode.toDataURL(vCard, {
      width: size,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    });
    return qrDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return '';
  }
}

export async function generateQRCodeFromText(
  text: string,
  size: number = 140
): Promise<string> {
  try {
    const qrDataUrl = await QRCode.toDataURL(text, {
      width: size,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    });
    return qrDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return '';
  }
}
