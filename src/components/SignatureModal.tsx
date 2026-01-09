import { useEffect, useState, useRef } from 'react';
import { X, Download, Copy, ExternalLink } from 'lucide-react';
import type { Colaborador } from '../types';
import { generateVCardQRCode } from '../utils/qrcode';
import { generatePixelPerfectSignatureHTML, generatePixelPerfectSignatureForEmail } from '../utils/signatureNew';

type Props = {
  colaborador: Colaborador;
  onClose: () => void;
};

export function SignatureModal({ colaborador, onClose }: Props) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const signatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateQR = async () => {
      const telefono = colaborador.telefono_numero
        ? `${colaborador.telefono_pais}${colaborador.telefono_numero}`
        : '';

      const qr = await generateVCardQRCode(
        colaborador.nombre,
        colaborador.apellido,
        colaborador.cargo,
        telefono,
        colaborador.email,
        colaborador.organizacion || 'Vortex IT',
        colaborador.website_url || 'https://vortex-it.com/',
        140
      );
      setQrDataUrl(qr);
    };

    generateQR();
  }, [colaborador]);

  const handleCopyHTML = async () => {
    const html = generatePixelPerfectSignatureForEmail(colaborador, qrDataUrl);

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([html], { type: 'text/plain' }),
        }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      alert('Error al copiar. Intente de nuevo.');
    }
  };

  const handleDownloadPNG = async () => {
    if (!signatureRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(signatureRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `firma-${colaborador.apellido}-${colaborador.nombre}.png`;
        a.click();
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Error al generar PNG. Intente de nuevo.');
    }
  };

  const handleOpenPreview = () => {
    const html = generatePixelPerfectSignatureHTML(colaborador, qrDataUrl);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const telefono = colaborador.telefono_numero
    ? `${colaborador.telefono_pais} ${colaborador.telefono_numero}`
    : '';
  
  // Colores para futuras implementaciones
  // const colorPrincipal = colaborador.color_principal || '#7028e4';
  // const colorAccent = '#17c964';
  // const colorContact = '#A0D332';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-vortex-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-vortex-border">
        <div className="p-6 border-b border-vortex-border flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-heading-md font-display text-vortex-text-primary">Firma Digital</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-vortex-gray-bg rounded-lg transition-all duration-200"
          >
            <X className="w-6 h-6 text-vortex-text-primary" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-body-sm font-semibold text-vortex-text-secondary mb-4">Vista Previa:</h4>
            <div
              ref={signatureRef}
              className="overflow-hidden mx-auto bg-white max-w-[450px] relative"
              style={{ fontFamily: 'Montserrat, Helvetica, Arial, sans-serif' }}
            >
              <div className="h-[8px]" style={{ background: 'linear-gradient(90deg, rgb(106,58,199) 32%, rgb(55,199,130) 67%, rgb(160,211,50) 100%)' }}></div>
              <div className="py-[15px] px-[20px] bg-white">
                <table cellPadding="0" cellSpacing="0" className="w-full" style={{ borderCollapse: 'collapse', background: '#fff' }}>
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: 'top', background: '#fff', width: '300px' }}>
                        <table cellPadding="0" cellSpacing="0" style={{ background: '#fff' }}>
                          <tbody>
                            <tr>
                              <td style={{ lineHeight: '15px', paddingTop: '15px' }} colSpan={2}>
                                <span style={{ fontFamily: 'Montserrat, Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#6A3AC7' }}>
                                  {colaborador.nombre.toUpperCase()} {colaborador.apellido.toUpperCase()}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ paddingTop: '8px', verticalAlign: 'top' }}>
                                {qrDataUrl && <img src={qrDataUrl} alt="QR" width="70" />}
                              </td>
                              <td style={{ paddingTop: '8px', paddingLeft: '8px', verticalAlign: 'top' }}>
                                <table cellPadding="0" cellSpacing="0">
                                  <tbody>
                                    <tr>
                                      <td style={{ lineHeight: '12px', paddingBottom: '8px' }} colSpan={2}>
                                        <span style={{ fontFamily: 'Montserrat, Helvetica, Arial, sans-serif', fontSize: '12px', fontWeight: 600, color: '#505050' }}>
                                          {colaborador.cargo}
                                        </span>
                                      </td>
                                    </tr>
                                    {telefono && (
                                      <tr>
                                        <td style={{ width: '12px', verticalAlign: 'middle' }}>
                                          <i className="fas fa-phone" style={{ color: '#A0D332', fontSize: '10px' }}></i>
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                          <a href={`https://wa.me/${telefono.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Montserrat, Helvetica, Arial, sans-serif', fontSize: '11px', fontWeight: 'normal', color: '#505050', textDecoration: 'none' }}>
                                            {telefono}
                                          </a>
                                        </td>
                                      </tr>
                                    )}
                                    <tr>
                                      <td style={{ width: '12px', verticalAlign: 'middle' }}>
                                        <i className="fas fa-envelope" style={{ color: '#A0D332', fontSize: '10px' }}></i>
                                      </td>
                                      <td style={{ lineHeight: '12px', paddingLeft: '5px', paddingBottom: '5px', verticalAlign: 'middle' }}>
                                        <a href={`mailto:${colaborador.email}`} style={{ fontFamily: 'Montserrat, Helvetica, Arial, sans-serif', fontSize: '11px', fontWeight: 'normal', color: '#505050', textDecoration: 'none' }}>
                                          {colaborador.email}
                                        </a>
                                      </td>
                                    </tr>
                                    {colaborador.personal_linkedin_url && (
                                      <tr>
                                        <td style={{ width: '12px', verticalAlign: 'middle' }}>
                                          <i className="fab fa-linkedin-in" style={{ color: '#505050', fontSize: '10px' }}></i>
                                        </td>
                                        <td style={{ lineHeight: '12px', paddingLeft: '5px', verticalAlign: 'middle' }}>
                                          <a href={colaborador.personal_linkedin_url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Montserrat, Helvetica, Arial, sans-serif', fontSize: '11px', fontWeight: 'normal', color: '#505050', textDecoration: 'none' }}>
                                            Connect with me on LinkedIn
                                          </a>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td style={{ verticalAlign: 'top', paddingTop: '12px', paddingRight: '20px', textAlign: 'center' }}>
                        {colaborador.foto_url && (
                          <div style={{ width: '105px', height: '105px', borderRadius: '50%', border: '3px solid transparent', background: 'linear-gradient(135deg, rgb(112, 40, 228) 0%, rgb(23, 201, 100) 100%)', padding: '3px', margin: '0 auto', display: 'inline-block' }}>
                            <img src={colaborador.foto_url} alt={`${colaborador.nombre} ${colaborador.apellido}`} width="100%" height="100%" style={{ borderRadius: '50%', display: 'block', objectFit: 'cover' }} />
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ background: '#fff' }}>
                        <table cellPadding="0" cellSpacing="0" style={{ background: '#fff', width: '125px' }}>
                          <tbody>
                            <tr>
                              <td style={{ width: '25px', textAlign: 'center' }}>
                                {colaborador.linkedin_url ? (
                                  <a href={colaborador.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ color: '#505050', textDecoration: 'none' }}>
                                    <i className="fab fa-linkedin-in" style={{ fontSize: '16px' }}></i>
                                  </a>
                                ) : (
                                  <i className="fab fa-linkedin-in" style={{ fontSize: '16px', color: '#505050', opacity: 0.3 }}></i>
                                )}
                              </td>
                              <td style={{ width: '25px', textAlign: 'center' }}>
                                {colaborador.instagram_url ? (
                                  <a href={colaborador.instagram_url} target="_blank" rel="noopener noreferrer" style={{ color: '#505050', textDecoration: 'none' }}>
                                    <i className="fab fa-instagram" style={{ fontSize: '16px' }}></i>
                                  </a>
                                ) : (
                                  <i className="fab fa-instagram" style={{ fontSize: '16px', color: '#505050', opacity: 0.3 }}></i>
                                )}
                              </td>
                              <td style={{ width: '25px', textAlign: 'center' }}>
                                {colaborador.facebook_url ? (
                                  <a href={colaborador.facebook_url} target="_blank" rel="noopener noreferrer" style={{ color: '#505050', textDecoration: 'none' }}>
                                    <i className="fab fa-facebook-f" style={{ fontSize: '16px' }}></i>
                                  </a>
                                ) : (
                                  <i className="fab fa-facebook-f" style={{ fontSize: '16px', color: '#505050', opacity: 0.3 }}></i>
                                )}
                              </td>
                              <td style={{ width: '25px', textAlign: 'center' }}>
                                {colaborador.website_url ? (
                                  <a href={colaborador.website_url} target="_blank" rel="noopener noreferrer" style={{ color: '#505050', textDecoration: 'none' }}>
                                    <i className="fas fa-globe" style={{ fontSize: '16px' }}></i>
                                  </a>
                                ) : (
                                  <i className="fas fa-globe" style={{ fontSize: '16px', color: '#505050', opacity: 0.3 }}></i>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td style={{ textAlign: 'center', background: '#fff', verticalAlign: 'top', paddingTop: '12px', paddingRight: '20px' }}>
                        <img src="https://ci3.googleusercontent.com/meips/ADKq_NamqidSGn8CZ-YPtqv2RJKTAEcqJQvOfUpQGwRfLkZnKUgiTR1fl3jbw0PlutsB6a6yBNgZeIMP-GxrfQfgpqz-XBPMppF1vetsHvHjxF5jvnW6c9Kx=s0-d-e1-ft#https://vortex-it.com/wp-content/uploads/2022/05/vortex-logo.png" width="68" alt="Vortex" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="h-[8px]" style={{ background: 'linear-gradient(90deg, rgb(160,211,50) 32%, rgb(55,199,130) 67%, rgb(106,58,199) 100%)' }}></div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCopyHTML}
              className="btn-primary flex items-center gap-2"
            >
              <Copy className="w-5 h-5" />
              {copied ? 'Copiado!' : 'Copiar HTML'}
            </button>
            <button
              onClick={handleDownloadPNG}
              className="btn-accent flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Descargar PNG
            </button>
            <button
              onClick={handleOpenPreview}
              className="btn-secondary flex items-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Vista Previa HTML
            </button>
          </div>

          <div className="mt-6 p-4 bg-vortex-primary/10 border border-vortex-primary/30 rounded-lg">
            <p className="text-body-sm text-vortex-primary">
              <strong>Tip:</strong> Usa "Copiar HTML" para pegar directamente en clientes de correo
              como Outlook o Gmail. El formato, el código QR vCard y las redes sociales se mantendrán correctamente.
              El QR puede escanearse para agregar el contacto automáticamente al teléfono.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
