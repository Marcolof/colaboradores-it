import type { Colaborador } from '../types';

export function generatePixelPerfectSignatureHTML(colaborador: Colaborador, qrDataUrl: string): string {
  const telefono = colaborador.telefono_numero
    ? `${colaborador.telefono_pais}${colaborador.telefono_numero}`
    : '';
  const fotoUrl = colaborador.foto_url || '';
  const nombreCompleto = `${colaborador.nombre.toUpperCase()} ${colaborador.apellido.toUpperCase()}`;
  
  // Colores para futuras implementaciones en la firma
  // const colorPrincipal = colaborador.color_principal || '#7028e4';
  // const colorAccent = '#17c964';
  // const colorContact = '#A0D332';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Firma Digital - ${colaborador.nombre} ${colaborador.apellido}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Montserrat);
  </style>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .signature-wrapper {
      max-width: 460px;
      margin: 0 auto;
      background: white;
      border-radius: 0;
      overflow: hidden;
      position: relative;
    }
    .gradient-top {
      height: 8px;
      background: linear-gradient(90deg, rgb(106,58,199) 32%, rgb(55,199,130) 67%, rgb(160,211,50) 100%) 0% 0% repeat;
      font-family: -webkit-standard;
    }
    .gradient-bottom {
      height: 8px;
      background: linear-gradient(90deg, rgb(160,211,50) 32%, rgb(55,199,130) 67%, rgb(106,58,199) 100%) 0% 0% repeat;
      font-family: -webkit-standard;
    }
    .signature-body {
      padding: 15px 20px;
      position: relative;
    }
    .qr-section {
      display: inline-block;
      vertical-align: top;
      margin-right: 8px;
    }
    .qr-code {
      width: 70px;
      height: 70px;
      display: block;
      margin-bottom: 8px;
    }
    .social-icons {
      display: flex;
      gap: 0;
      align-items: center;
    }
    .social-icon {
      width: 25px;
      height: 20px;
      color: #555;
      text-decoration: none;
      font-size: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .social-icon:hover {
      opacity: 0.7;
    }
    .social-icon.disabled {
      opacity: 0.3;
      cursor: default;
    }
    .social-icon.disabled:hover {
      opacity: 0.3;
    }
    .social-icon img {
      width: 20px;
      height: 20px;
    }
    .main-content {
      display: inline-block;
      vertical-align: top;
      max-width: 220px;
    }
    .name {
      font-size: 18px;
      font-weight: 900;
      color: #6A3AC7;
      line-height: 15px;
      margin-bottom: 8px;
      padding-top: 0;
    }
    .position {
      font-size: 12px;
      color: #505050;
      font-weight: 600;
      line-height: 12px;
      margin-bottom: 8px;
    }
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .contact-row {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      line-height: 12px;
    }
    .contact-icon {
      width: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
    }
    .contact-icon img {
      width: 10px;
      height: 10px;
    }
    .contact-text {
      color: #505050;
      text-decoration: none;
      font-weight: normal;
    }
    .photo-section {
      display: inline-block;
      vertical-align: top;
      text-align: center;
      padding-top: 0;
    }
    .photo-container {
      width: 105px;
      height: 105px;
      margin: 0 auto 0;
    }
    .photo-container img {
      width: 105px;
      height: 105px;
      display: block;
    }
    .logo-container {
      margin-top: 0;
      text-align: center;
    }
    .logo-container img {
      width: 68px;
      height: auto;
    }
  </style>
</head>
<body>
  <div class="signature-wrapper">
    <div class="gradient-top"></div>
    <div class="signature-body">
      <table border="0" cellspacing="0" cellpadding="0" width="420" bgcolor="#FFFFFF" style="border-collapse: collapse; background: #fff;">
        <tr>
          <td width="340" style="vertical-align: top; background: #fff;">
            <table border="0" cellspacing="0" cellpadding="0" bgcolor="white" style="background: #fff;">
              <tr>
                <td style="line-height: 15px; padding-top: 15px;" colspan="2">
                  <span style="font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: bold; color: #6A3AC7;">${nombreCompleto}</span>
                </td>
              </tr>
              <tr>
                <td style="padding-top: 10px; vertical-align: top;">
                  <img src="${qrDataUrl}" alt="QR" width="90" />
                </td>
                <td style="padding-top: 15px; padding-left: 10px; vertical-align: top;">
                  <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="line-height: 12px; padding-bottom: 8px;" colspan="2">
                        <span style="font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 600; color: #505050;">${colaborador.cargo}</span>
                      </td>
                    </tr>
                    ${telefono ? `
                    <tr>
                      <td width="12" style="vertical-align: middle;">
                        <i class="fas fa-phone" style="color: #A0D332; font-size: 10px;"></i>
                      </td>
                      <td style="vertical-align: middle;">
                        <a href="https://wa.me/${telefono.replace(/\s/g, '')}" target="_blank" style="font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: normal; color: #505050; text-decoration: none;">${telefono}</a>
                      </td>
                    </tr>
                    ` : ''}
                    <tr>
                      <td width="12" style="vertical-align: middle;">
                        <i class="fas fa-envelope" style="color: #A0D332; font-size: 10px;"></i>
                      </td>
                      <td style="line-height: 12px; padding-left: 5px; padding-bottom: 0px; vertical-align: middle;">
                        <a href="mailto:${colaborador.email}" style="font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: normal; color: #505050; text-decoration: none;">${colaborador.email}</a>
                      </td>
                    </tr>
                    ${colaborador.personal_linkedin_url ? `
                    <tr>
                      <td width="12" style="vertical-align: middle;">
                        <i class="fab fa-linkedin-in" style="color: #505050; font-size: 10px;"></i>
                      </td>
                      <td style="line-height: 12px; padding-left: 5px; vertical-align: middle;">
                        <a href="${colaborador.personal_linkedin_url}" target="_blank" style="font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: normal; color: #505050; text-decoration: none;">Connect with me on LinkedIn</a>
                      </td>
                    </tr>
                    ` : ''}
                  </table>
                </td>
              </tr>
            </table>
          </td>
          <td style="vertical-align: top; padding-top: 12px; padding-right: 0px; text-align: right;">
            ${fotoUrl ? `
            <div style="width: 120px; height: 120px; border-radius: 50%; border: 2px solid transparent; background: linear-gradient(135deg, rgb(112, 40, 228) 0%, rgb(23, 201, 100) 100%); padding: 3px; margin: 0 auto; display: inline-block;">
              <img src="${fotoUrl}" alt="${nombreCompleto}" width="100%" height="100%" style="border-radius: 50%; display: block; object-fit: cover;" />
            </div>
            ` : ''}
          </td>
        </tr>
        <tr>
          <td cellspacing="0" cellpadding="0" bgcolor="white" width="300" style="background: #fff;">
            <table border="0" cellspacing="0" width="100" cellpadding="0" bgcolor="white" style="background: #fff;">
              <tr>
                <td width="15px" style="text-align: left;">
                  ${colaborador.linkedin_url ? `<a href="${colaborador.linkedin_url}" target="_blank" style="color: #505050; text-decoration: none;"><i class="fab fa-linkedin-in" style="font-size: 14px;"></i></a>` : '<i class="fab fa-linkedin-in" style="font-size: 14px; color: #505050; opacity: 0.8;"></i>'}
                </td>
                <td width="15px" style="text-align: left;">
                  ${colaborador.instagram_url ? `<a href="${colaborador.instagram_url}" target="_blank" style="color: #505050; text-decoration: none;"><i class="fab fa-instagram" style="font-size: 14px;"></i></a>` : '<i class="fab fa-instagram" style="font-size: 14px; color: #505050; opacity: 0.8;"></i>'}
                </td>
                <td width="15px" style="text-align: left;">
                  ${colaborador.facebook_url ? `<a href="${colaborador.facebook_url}" target="_blank" style="color: #505050; text-decoration: none;"><i class="fab fa-facebook-f" style="font-size: 14px;"></i></a>` : '<i class="fab fa-facebook-f" style="font-size: 14px; color: #505050; opacity: 0.8;"></i>'}
                </td>
                <td width="15px" style="text-align: left;">
                  ${colaborador.website_url ? `<a href="${colaborador.website_url}" target="_blank" style="color: #505050; text-decoration: none;"><i class="fas fa-globe" style="font-size: 14px;"></i></a>` : '<i class="fas fa-globe" style="font-size: 14px; color: #505050; opacity: 0.8;"></i>'}
                </td>
              </tr>
            </table>
          </td>
          <td style="text-align: right; background: #fff; vertical-align: top; padding-top: 12px; padding-right: 20px;">
            <img src="https://ci3.googleusercontent.com/meips/ADKq_NamqidSGn8CZ-YPtqv2RJKTAEcqJQvOfUpQGwRfLkZnKUgiTR1fl3jbw0PlutsB6a6yBNgZeIMP-GxrfQfgpqz-XBPMppF1vetsHvHjxF5jvnW6c9Kx=s0-d-e1-ft#https://vortex-it.com/wp-content/uploads/2022/05/vortex-logo.png" width="68" alt="Vortex" />
          </td>
        </tr>
      </table>
    </div>
    <div class="gradient-bottom"></div>
  </div>
</body>
</html>
  `.trim();
}

export function generatePixelPerfectSignatureForEmail(
  colaborador: Colaborador,
  qrDataUrl: string
): string {
  const telefono = colaborador.telefono_numero
    ? `${colaborador.telefono_pais}${colaborador.telefono_numero}`
    : '';
  const fotoUrl = colaborador.foto_url || '';
  const nombreCompleto = `${colaborador.nombre.toUpperCase()} ${colaborador.apellido.toUpperCase()}`;

  const phoneIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 512 512" fill="#A0D332"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>';
  const emailIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 512 512" fill="#A0D332"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>';
  const linkedinIcon = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADlSURBVHgB5VTRDYIwFDyM/zoCG+gG6gSygTiBOAEyghOIG3QDcQLdQNyADfQaH6FpIJFSv7zk0ncv5drXRxtEUZQCSMgphuMQ0PAFjxjBM2zDktySGRwxtvRRKZXrgEcRctigJ+wdmo2ZwAFtTVFivIQD7JJLNLusJC5E63guCz7JWduitmFmnOGFQ0i9Eq0/rqjv9WTmYg4n0+Dr34ZGha5AmlXncqOCfoaCG/mgaWLkzk6GUnIoct017+c35Q8M7ZuSk1eJd/g0YS9ax6nEJZoHZEHGXYaDoUuu4BHa0Pnta0H2BobDOYbHWQu4AAAAAElFTkSuQmCC" width="10" height="10" style="display: inline-block; vertical-align: middle;" />';
  const linkedinIconSocial = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADlSURBVHgB5VTRDYIwFDyM/zoCG+gG6gSygTiBOAEyghOIG3QDcQLdQNyADfQaH6FpIJFSv7zk0ncv5drXRxtEUZQCSMgphuMQ0PAFjxjBM2zDktySGRwxtvRRKZXrgEcRctigJ+wdmo2ZwAFtTVFivIQD7JJLNLusJC5E63guCz7JWduitmFmnOGFQ0i9Eq0/rqjv9WTmYg4n0+Dr34ZGha5AmlXncqOCfoaCG/mgaWLkzk6GUnIoct017+c35Q8M7ZuSk1eJd/g0YS9ax6nEJZoHZEHGXYaDoUuu4BHa0Pnta0H2BobDOYbHWQu4AAAAAElFTkSuQmCC" width="16" height="16" style="display: inline-block; vertical-align: middle;" />';
  const instagramIcon = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF4SURBVHgBnZTvUYNAEMU3mXw3HYgdkAqEDrCCJBUYKwhUEDqQVCBUEDowJdCBsQPf896NGMl4sDPLMXu3v3u392dmsizLlmie4Rt4ZGF2hlfwpq7rjoGZYBGak0AXeB0Ao4BYOR08JXR2BXtBsLQRhvwdmoOgqwVjU2AAUR1LVChE6G6Oz5r0scpgr+bqvVcuS7WmQs7U3FCRMEFjWLMWfgSgYqthTa/9BtI+BmAE5Zq5tZ9NSNB3DyiX+mdVcxtWthGMx+IByU/wFP8rxXKptyCgubrSCLr4oM5aKtX7McAE3vrD2jdN0JpbfjCQSZ9225byYCDr9Kjr+Mt0EWKpDAYWUnASwMMYe1PfcShxMRREnVokE8rCv+OfilmGRLBCZzFYIaE5mq255Sdy/qfqu7Y7r7Azd5+3A9DK3PMUYqzrmQpZi6VejUmGXD4SEVkEllJ5mAIVzDPqoQeWHX4T/uWZ2yTmuAe2N1OkAbx2sYVZZ65kpb+iX/Hak1D7lEC0AAAAAElFTkSuQmCC" width="16" height="16" style="display: inline-block; vertical-align: middle;" />';
  const facebookIcon = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFPSURBVHgBpVTBVYNAEB0wB48pgdy4JXaAFYgdQAVqBSEVqDdvSgWuFYgdcOS4dkAH+icZ3hvXzULIf++/hZ2ZvzPDLBF5kOf5khfwBtyAiZha0IIfxpg3X2zkEWOhV3BJYVhw5wpfOGJbLC/gJY1jX0WaptR13dc/QRGrJgj1zoGZFo1ErKBDmcdgwRLlNSqBJyx3yucWdhPLy3ZE7FqLqUw1HvljLiS7hI6jgZhVmWXiv3b8eC9b0GE0QvhWYjwB7wHfIqZwdgyrnjcjvut4gtMpSCJU8eMxWPRtFYpE3CeWzN3nDC3NzMaz17NgSydC7nriMbX8lXnCc/d01Ypy+K/Yqyg8szVnyM49nQ8Lmhins9iOzgf/efY9JDzwvaxpPp6Htgx3mUWLmaI1Yu+Hl1hbRJTLn9JT9nmQGPIKimiF5QosyT9SjRy6klb9wS9y63M90snuUQAAAABJRU5ErkJggg==" width="16" height="16" style="display: inline-block; vertical-align: middle;" />';
  const globeIcon = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHnSURBVHgBrVQtWsNQEHwJGFwkMrg6uEHDCVpOQCJRVOJITwBIFOEEPBwo0hPQujrCDSJxMEMn7fY1OPb75ttk983svt/I9dh4PE7ogBFwAqRKzYEG+PbeV33cqEeMQg8ARWsJJko3QKsYv6ehcByI3cA9qZNToJDYncDvM+AImLEwONdWY8+IMXGlqsVyuWwGg8GNRC6AF2ACHCL/iLxHnjMs4RP8v64FIZbD3UqsVCyFq9gZYh6ELxAP8J/D3/MfqCV6Bb/A/7KbMrurOjFZJl+Z2K06zruAOLWmn8TqLmV3btvOORCExpBbkUfB2KkKjWMl55Yo407O3K49K+dMoVqFfgXTkIiuu6NS9wg2zGmNrS2A4wiJbw1qTDJRFzw+bUD8K5cSsftn23ebqzTpgprOh1sdI28JyGVwb0CB1NzEeQKGsVo/tiRtUOs2d9gaBVsrJhsCnxTkrmWqbI2EUY/gUDkXzIjr6ino1c11QOwKJQExAx6DseQ2fChiHdZCZCtaqdDExM7la1OEnNzpYkQmwUW9BEoUmSpWadp8XdgpN4O3pzBipTNvQBSsRan2K7e5iu9uc58nEk81LnOrx2M9i74HNtdgkubqLFW6VSzTdxEeqx3BQHgkse7uNhLkhnmt/5b9AAQI1deQEY9JAAAAAElFTkSuQmCC" width="16" height="16" style="display: inline-block; vertical-align: middle;" />';

  return `
<table border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td width="450" height="8" style="background: linear-gradient(90deg, rgba(106,58,199,1) 32%, rgba(55,199,130,1) 67%, rgba(160,211,50,1) 100%);"></td>
    </tr>
    <tr>
      <td>
        <table border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background-repeat: no-repeat;" width="450" bgcolor="#FFFFFF">
          <tbody>
            <tr>
              <td width="300" style="vertical-align: top; background: #fff; background-image: linear-gradient(#fff,#fff);">
                <table border="0" cellspacing="0" cellpadding="0" bgcolor="white" style="background: #fff; background-image: linear-gradient(#fff,#fff);">
                  <tbody>
                    <tr>
                      <td style="line-height: 15px; padding-top: 15px;" width="100%" colspan="2">
                        <span style="font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: bold; color: #6A3AC7;">${nombreCompleto}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 8px;">
                        <img src="${qrDataUrl}" alt="QR" width="70" />
                      </td>
                      <td style="padding-top: 8px; padding-left: 8px; vertical-align: top;">
                        <table border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                            <tr>
                              <td style="line-height: 12px; padding-bottom: 8px;" width="100%" colspan="2">
                                <span style="font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 600; color: #505050;">${colaborador.cargo}</span>
                              </td>
                            </tr>
                            ${telefono ? `
                            <tr>
                              <td width="12" style="vertical-align: middle;">
                                ${phoneIcon}
                              </td>
                              <td style="vertical-align: middle;">
                                <a href="https://wa.me/${telefono.replace(/\s/g, '')}" target="_blank" style="font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: normal; color: #505050; text-decoration: unset;">${telefono}</a>
                              </td>
                            </tr>
                            ` : ''}
                            <tr>
                              <td width="12" style="vertical-align: middle;">
                                ${emailIcon}
                              </td>
                              <td style="line-height: 12px; padding-left: 5px; padding-bottom: 5px; vertical-align: middle;">
                                <div>
                                  <a href="mailto:${colaborador.email}" style="font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: normal; color: #505050; text-decoration: unset;">${colaborador.email}</a>
                                </div>
                              </td>
                            </tr>
                            ${colaborador.personal_linkedin_url ? `
                            <tr>
                              <td width="12" style="vertical-align: middle;">
                                ${linkedinIcon}
                              </td>
                              <td style="line-height: 12px; padding-left: 5px; vertical-align: middle;">
                                <div>
                                  <a href="${colaborador.personal_linkedin_url}" target="_blank" style="font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: normal; color: #505050; text-decoration: unset;">Connect with me on LinkedIn</a>
                                </div>
                              </td>
                            </tr>
                            ` : ''}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table border="0" cellspacing="0" width="100%" cellpadding="0" style="padding-top: 12px; background: #fff; background-image: linear-gradient(#fff,#fff); text-align: center;">
                  <tbody>
                    ${fotoUrl ? `
                    <tr>
                      <td>
                        <div style="width: 105px; height: 105px; border-radius: 50%; border: 3px solid transparent; background: linear-gradient(135deg, rgb(112, 40, 228) 0%, rgb(23, 201, 100) 100%); padding: 3px; margin: 0 auto; display: inline-block;">
                          <img src="${fotoUrl}" alt="${nombreCompleto}" width="100%" height="100%" style="border-radius: 50%; display: block; object-fit: cover;" />
                        </div>
                      </td>
                    </tr>
                    ` : ''}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td cellspacing="0" cellpadding="0" bgcolor="white" width="300" style="background: #fff; background-image: linear-gradient(#fff,#fff);">
                <table border="0" cellspacing="0" width="70" cellpadding="0" bgcolor="white" style="background: #fff; background-image: linear-gradient(#fff,#fff);">
                  <tbody>
                    <tr>
                      <td width="15px" style="text-align: center;">
                        ${colaborador.linkedin_url ? `<a href="${colaborador.linkedin_url}" target="_blank" style="text-decoration: none;">${linkedinIconSocial}</a>` : `<span style="opacity: 0.9;">${linkedinIconSocial}</span>`}
                      </td>
                      <td width="15px" style="text-align: center;">
                        ${colaborador.instagram_url ? `<a href="${colaborador.instagram_url}" target="_blank" style="text-decoration: none;">${instagramIcon}</a>` : `<span style="opacity: 0.9;">${instagramIcon}</span>`}
                      </td>
                      <td width="15px" style="text-align: center;">
                        ${colaborador.facebook_url ? `<a href="${colaborador.facebook_url}" target="_blank" style="text-decoration: none;">${facebookIcon}</a>` : `<span style="opacity: 0.9;">${facebookIcon}</span>`}
                      </td>
                      <td width="15px" style="text-align: center;">
                        ${colaborador.website_url ? `<a href="${colaborador.website_url}" target="_blank" style="text-decoration: none;">${globeIcon}</a>` : `<span style="opacity: 0.9;">${globeIcon}</span>`}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style="text-align: center; background: #fff; background-image: linear-gradient(#fff,#fff); vertical-align: top; padding-top: 12px; padding-right: 20px;">
                <img src="https://ci3.googleusercontent.com/meips/ADKq_NamqidSGn8CZ-YPtqv2RJKTAEcqJQvOfUpQGwRfLkZnKUgiTR1fl3jbw0PlutsB6a6yBNgZeIMP-GxrfQfgpqz-XBPMppF1vetsHvHjxF5jvnW6c9Kx=s0-d-e1-ft#https://vortex-it.com/wp-content/uploads/2022/05/vortex-logo.png" width="68" alt="Vortex" />
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td width="450" height="8" style="background: linear-gradient(90deg, rgba(160,211,50,1) 32%, rgba(55,199,130,1) 67%, rgba(106,58,199,1) 100%);"></td>
    </tr>
  </tbody>
</table>
  `.trim();
}
