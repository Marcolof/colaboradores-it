import type { Colaborador } from '../types';

export function generateSignatureHTML(colaborador: Colaborador, qrDataUrl: string, theme: 'light' | 'dark' = 'light'): string {
  if (theme === 'dark') {
    return generateDarkSignatureHTML(colaborador, qrDataUrl);
  }
  return generateLightSignatureHTML(colaborador, qrDataUrl);
}

function generateLightSignatureHTML(colaborador: Colaborador, qrDataUrl: string): string {
  const telefono = colaborador.telefono_numero
    ? `${colaborador.telefono_pais}${colaborador.telefono_numero}`
    : '';
  const fotoUrl = colaborador.foto_url || '';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Firma Digital - ${colaborador.nombre} ${colaborador.apellido}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .signature-wrapper {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 0;
      overflow: hidden;
    }
    .gradient-bar {
      height: 15px;
      background: linear-gradient(90deg, #00d084 0%, #00c9db 25%, #7b68ee 60%, #6941c6 100%);
    }
    .signature-body {
      padding: 35px 40px 40px 40px;
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 35px;
      align-items: start;
    }
    .qr-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
    }
    .qr-code {
      width: 180px;
      height: 180px;
      display: block;
    }
    .social-links {
      display: flex;
      gap: 15px;
      align-items: center;
    }
    .social-links a {
      color: #444;
      font-size: 22px;
      text-decoration: none;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
    }
    .social-links a:hover {
      color: #6941c6;
    }
    .info-section {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding-top: 5px;
    }
    .name {
      font-size: 38px;
      font-weight: 700;
      color: #6941c6;
      line-height: 1.1;
      text-transform: uppercase;
      letter-spacing: -0.5px;
      margin-bottom: 2px;
    }
    .position {
      font-size: 20px;
      color: #666;
      font-weight: 400;
      line-height: 1.3;
      margin-bottom: 12px;
    }
    .contact-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .contact-row {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 17px;
    }
    .contact-icon {
      color: #84cc16;
      font-size: 18px;
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .contact-text {
      color: #333;
      text-decoration: none;
    }
    .contact-text:hover {
      text-decoration: underline;
    }
    .photo-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
    }
    .photo-container {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
      border: 6px solid #84cc16;
      background: #e5e7eb;
    }
    .photo-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .logo-text {
      font-size: 28px;
      font-weight: 700;
      color: #333;
      letter-spacing: 3px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    .logo-text .accent {
      color: #6941c6;
    }
    @media (max-width: 768px) {
      .signature-body {
        grid-template-columns: 1fr;
        gap: 25px;
      }
      .qr-section, .photo-section {
        justify-self: center;
      }
    }
  </style>
</head>
<body>
  <div class="signature-wrapper">
    <div class="gradient-bar"></div>
    <div class="signature-body">
      <div class="qr-section">
        <img src="${qrDataUrl}" alt="QR Code" class="qr-code" />
        <div class="social-links">
          <a href="#" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
          <a href="#" title="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" title="Facebook"><i class="fab fa-facebook"></i></a>
          <a href="#" title="Website"><i class="fas fa-globe"></i></a>
        </div>
      </div>

      <div class="info-section">
        <h1 class="name">${colaborador.nombre} ${colaborador.apellido}</h1>
        <p class="position">${colaborador.cargo}</p>
        <div class="contact-list">
          ${telefono ? `
          <div class="contact-row">
            <span class="contact-icon">📞</span>
            <span class="contact-text">${telefono}</span>
          </div>
          ` : ''}
          <div class="contact-row">
            <span class="contact-icon">✉️</span>
            <a href="mailto:${colaborador.email}" class="contact-text">${colaborador.email}</a>
          </div>
        </div>
      </div>

      ${fotoUrl ? `
      <div class="photo-section">
        <div class="photo-container">
          <img src="${fotoUrl}" alt="${colaborador.nombre} ${colaborador.apellido}" />
        </div>
        <div class="logo-text">VORT<span class="accent">E</span>X.</div>
      </div>
      ` : `
      <div class="photo-section">
        <div class="logo-text">VORT<span class="accent">E</span>X.</div>
      </div>
      `}
    </div>
  </div>
</body>
</html>
  `.trim();
}

function generateDarkSignatureHTML(colaborador: Colaborador, qrDataUrl: string): string {
  const telefono = colaborador.telefono_numero
    ? `${colaborador.telefono_pais}${colaborador.telefono_numero}`
    : '';
  const fotoUrl = colaborador.foto_url || '';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Firma Digital - ${colaborador.nombre} ${colaborador.apellido}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      padding: 20px;
      background-color: #1a1a1a;
    }
    .signature-wrapper {
      max-width: 720px;
      margin: 0 auto;
      background: #000000;
      border-radius: 0;
      overflow: hidden;
    }
    .gradient-bar {
      height: 12px;
      background: linear-gradient(90deg, #00d084 0%, #00c9db 25%, #7b68ee 60%, #6941c6 100%);
    }
    .signature-body {
      padding: 30px 35px;
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 30px;
      align-items: start;
    }
    .qr-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .qr-container {
      position: relative;
      width: 140px;
      height: 140px;
      background: white;
      padding: 10px;
    }
    .qr-container::before,
    .qr-container::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border: 3px solid white;
    }
    .qr-container::before {
      top: -3px;
      left: -3px;
      border-right: none;
      border-bottom: none;
    }
    .qr-container::after {
      top: -3px;
      right: -3px;
      border-left: none;
      border-bottom: none;
    }
    .qr-corners-bottom::before {
      content: '';
      position: absolute;
      bottom: -3px;
      left: -3px;
      width: 20px;
      height: 20px;
      border: 3px solid white;
      border-right: none;
      border-top: none;
    }
    .qr-corners-bottom::after {
      content: '';
      position: absolute;
      bottom: -3px;
      right: -3px;
      width: 20px;
      height: 20px;
      border: 3px solid white;
      border-left: none;
      border-top: none;
    }
    .qr-code {
      width: 120px;
      height: 120px;
      display: block;
    }
    .social-links {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .social-links span {
      color: #999;
      font-size: 16px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .info-section {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-top: 5px;
    }
    .name {
      font-size: 32px;
      font-weight: 700;
      color: #6941c6;
      line-height: 1.1;
      text-transform: uppercase;
      letter-spacing: -0.5px;
      margin-bottom: 2px;
    }
    .position {
      font-size: 18px;
      color: #aaa;
      font-weight: 400;
      line-height: 1.3;
      margin-bottom: 10px;
    }
    .contact-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .contact-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
    }
    .contact-icon {
      color: #999;
      font-size: 16px;
      width: 18px;
    }
    .contact-text {
      color: #999;
      text-decoration: none;
    }
    .photo-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .photo-container {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      overflow: hidden;
      border: 6px solid #84cc16;
      background: #e5e7eb;
    }
    .photo-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .logo-text {
      font-size: 26px;
      font-weight: 700;
      color: #999;
      letter-spacing: 3px;
    }
    .logo-text .accent {
      color: #6941c6;
    }
    @media (max-width: 768px) {
      .signature-body {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      .qr-section, .photo-section {
        justify-self: center;
      }
    }
  </style>
</head>
<body>
  <div class="signature-wrapper">
    <div class="gradient-bar"></div>
    <div class="signature-body">
      <div class="qr-section">
        <div class="qr-container qr-corners-bottom">
          <img src="${qrDataUrl}" alt="QR Code" class="qr-code" />
        </div>
        <div class="social-links">
          <span>in</span>
          <span>ig</span>
          <span>fb</span>
          <span>🌐</span>
        </div>
      </div>

      <div class="info-section">
        <h1 class="name">${colaborador.nombre} ${colaborador.apellido}</h1>
        <p class="position">${colaborador.cargo}</p>
        <div class="contact-list">
          ${telefono ? `
          <div class="contact-row">
            <span class="contact-icon">📞</span>
            <span class="contact-text">${telefono}</span>
          </div>
          ` : ''}
          <div class="contact-row">
            <span class="contact-icon">✉️</span>
            <span class="contact-text">${colaborador.email}</span>
          </div>
        </div>
      </div>

      ${fotoUrl ? `
      <div class="photo-section">
        <div class="photo-container">
          <img src="${fotoUrl}" alt="${colaborador.nombre} ${colaborador.apellido}" />
        </div>
        <div class="logo-text">VORT<span class="accent">E</span>X.</div>
      </div>
      ` : `
      <div class="photo-section">
        <div class="logo-text">VORT<span class="accent">E</span>X.</div>
      </div>
      `}
    </div>
  </div>
</body>
</html>
  `.trim();
}

export function generateSignatureForEmail(
  colaborador: Colaborador,
  qrDataUrl: string,
  theme: 'light' | 'dark' = 'light'
): string {
  if (theme === 'dark') {
    return generateDarkSignatureForEmail(colaborador, qrDataUrl);
  }
  return generateLightSignatureForEmail(colaborador, qrDataUrl);
}

function generateLightSignatureForEmail(
  colaborador: Colaborador,
  qrDataUrl: string
): string {
  const telefono = colaborador.telefono_numero
    ? `${colaborador.telefono_pais}${colaborador.telefono_numero}`
    : '';
  const fotoUrl = colaborador.foto_url || '';

  return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; max-width: 900px; background: white; border-collapse: collapse;">
  <tr>
    <td colspan="3" style="height: 15px; background: linear-gradient(90deg, #00d084 0%, #00c9db 25%, #7b68ee 60%, #6941c6 100%); padding: 0;"></td>
  </tr>
  <tr>
    <td style="padding: 35px 20px 40px 40px; vertical-align: top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="text-align: center; padding-bottom: 18px;">
            <img src="${qrDataUrl}" alt="QR Code" style="width: 180px; height: 180px; display: block;" />
          </td>
        </tr>
        <tr>
          <td style="text-align: center;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
              <tr>
                <td style="padding: 0 7px; font-size: 22px; color: #444;">
                  <a href="#" style="color: #444; text-decoration: none;">in</a>
                </td>
                <td style="padding: 0 7px; font-size: 22px; color: #444;">
                  <a href="#" style="color: #444; text-decoration: none;">ig</a>
                </td>
                <td style="padding: 0 7px; font-size: 22px; color: #444;">
                  <a href="#" style="color: #444; text-decoration: none;">fb</a>
                </td>
                <td style="padding: 0 7px; font-size: 22px; color: #444;">
                  <a href="#" style="color: #444; text-decoration: none;">🌐</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>

    <td style="padding: 40px 20px 40px 0; vertical-align: top;">
      <h1 style="font-size: 38px; font-weight: 700; color: #6941c6; line-height: 1.1; text-transform: uppercase; letter-spacing: -0.5px; margin: 0 0 2px 0;">${colaborador.nombre} ${colaborador.apellido}</h1>
      <p style="font-size: 20px; color: #666; font-weight: 400; line-height: 1.3; margin: 0 0 12px 0;">${colaborador.cargo}</p>
      <table cellpadding="0" cellspacing="0" border="0">
        ${telefono ? `
        <tr>
          <td style="padding: 3px 0; font-size: 17px;">
            <span style="color: #84cc16; font-size: 18px; padding-right: 10px;">📞</span>
            <span style="color: #333;">${telefono}</span>
          </td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 3px 0; font-size: 17px;">
            <span style="color: #84cc16; font-size: 18px; padding-right: 10px;">✉️</span>
            <a href="mailto:${colaborador.email}" style="color: #333; text-decoration: none;">${colaborador.email}</a>
          </td>
        </tr>
      </table>
    </td>

    ${fotoUrl ? `
    <td style="padding: 35px 40px 40px 20px; vertical-align: top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="text-align: center; padding-bottom: 18px;">
            <img src="${fotoUrl}" alt="${colaborador.nombre} ${colaborador.apellido}" style="width: 200px; height: 200px; border-radius: 50%; border: 6px solid #84cc16; display: block; object-fit: cover;" />
          </td>
        </tr>
        <tr>
          <td style="text-align: center; font-size: 28px; font-weight: 700; color: #333; letter-spacing: 3px;">
            VORT<span style="color: #6941c6;">E</span>X.
          </td>
        </tr>
      </table>
    </td>
    ` : `
    <td style="padding: 35px 40px 40px 20px; vertical-align: top; text-align: center;">
      <div style="font-size: 28px; font-weight: 700; color: #333; letter-spacing: 3px;">
        VORT<span style="color: #6941c6;">E</span>X.
      </div>
    </td>
    `}
  </tr>
</table>
  `.trim();
}

function generateDarkSignatureForEmail(
  colaborador: Colaborador,
  qrDataUrl: string
): string {
  const telefono = colaborador.telefono_numero
    ? `${colaborador.telefono_pais}${colaborador.telefono_numero}`
    : '';
  const fotoUrl = colaborador.foto_url || '';

  return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; max-width: 720px; background: #000000; border-collapse: collapse;">
  <tr>
    <td colspan="3" style="height: 12px; background: linear-gradient(90deg, #00d084 0%, #00c9db 25%, #7b68ee 60%, #6941c6 100%); padding: 0;"></td>
  </tr>
  <tr>
    <td style="padding: 30px 20px 30px 35px; vertical-align: top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="text-align: center; padding-bottom: 16px;">
            <table cellpadding="0" cellspacing="0" border="0" style="background: white; width: 140px; height: 140px;">
              <tr>
                <td style="padding: 10px; text-align: center;">
                  <img src="${qrDataUrl}" alt="QR Code" style="width: 120px; height: 120px; display: block;" />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="text-align: center;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
              <tr>
                <td style="padding: 0 6px; font-size: 16px; color: #999;">in</td>
                <td style="padding: 0 6px; font-size: 16px; color: #999;">ig</td>
                <td style="padding: 0 6px; font-size: 16px; color: #999;">fb</td>
                <td style="padding: 0 6px; font-size: 16px; color: #999;">🌐</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>

    <td style="padding: 35px 20px 30px 0; vertical-align: top;">
      <h1 style="font-size: 32px; font-weight: 700; color: #6941c6; line-height: 1.1; text-transform: uppercase; letter-spacing: -0.5px; margin: 0 0 2px 0;">${colaborador.nombre} ${colaborador.apellido}</h1>
      <p style="font-size: 18px; color: #aaa; font-weight: 400; line-height: 1.3; margin: 0 0 10px 0;">${colaborador.cargo}</p>
      <table cellpadding="0" cellspacing="0" border="0">
        ${telefono ? `
        <tr>
          <td style="padding: 2px 0; font-size: 15px;">
            <span style="color: #999; font-size: 16px; padding-right: 8px;">📞</span>
            <span style="color: #999;">${telefono}</span>
          </td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 2px 0; font-size: 15px;">
            <span style="color: #999; font-size: 16px; padding-right: 8px;">✉️</span>
            <span style="color: #999;">${colaborador.email}</span>
          </td>
        </tr>
      </table>
    </td>

    ${fotoUrl ? `
    <td style="padding: 30px 35px 30px 20px; vertical-align: top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="text-align: center; padding-bottom: 16px;">
            <img src="${fotoUrl}" alt="${colaborador.nombre} ${colaborador.apellido}" style="width: 180px; height: 180px; border-radius: 50%; border: 6px solid #84cc16; display: block; object-fit: cover;" />
          </td>
        </tr>
        <tr>
          <td style="text-align: center; font-size: 26px; font-weight: 700; color: #999; letter-spacing: 3px;">
            VORT<span style="color: #6941c6;">E</span>X.
          </td>
        </tr>
      </table>
    </td>
    ` : `
    <td style="padding: 30px 35px 30px 20px; vertical-align: top; text-align: center;">
      <div style="font-size: 26px; font-weight: 700; color: #999; letter-spacing: 3px;">
        VORT<span style="color: #6941c6;">E</span>X.
      </div>
    </td>
    `}
  </tr>
</table>
  `.trim();
}
