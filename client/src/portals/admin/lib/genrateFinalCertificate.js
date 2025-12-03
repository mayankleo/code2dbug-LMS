import { toPng } from 'html-to-image';
import certificateBG from '../../../assets/images/Certificatebackground.png';
import signature from '../../../assets/images/signature.png';

/**
 * Creates a hidden final certificate element and downloads it as PNG
 */
export const downloadFinalCertificate = async ({
  studentName = 'Student',
  courseName = 'Course',
  certificateId = 'C2D-XXXXX',
  completionDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
}) => {
  // Create a hidden container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  document.body.appendChild(container);

  // Create certificate element
  const certificateEl = document.createElement('div');
  certificateEl.style.width = '1200px';
  certificateEl.style.height = '850px';
  certificateEl.style.background = 'white';
  certificateEl.style.fontFamily = "Georgia, 'Times New Roman', serif";
  container.appendChild(certificateEl);

  // Create certificate HTML
  certificateEl.innerHTML = `
      <!-- Certificate Container -->
      <div style="position: relative; width: 100%; height: 100%; overflow: hidden; background: url('${certificateBG}') center/cover;">
        <!-- Overlay for better text visibility -->
        <div style="position: absolute; inset: 0; background: rgba(255, 255, 255, 0.85);"></div>

        <!-- Decorative Corner Elements -->
        <div style="position: absolute; top: 0; left: 0; width: 128px; height: 128px; z-index: 10;">
          <div style="position: absolute; top: 16px; left: 16px; width: 96px; height: 96px; border-left: 4px solid #f59e0b; border-top: 4px solid #f59e0b;"></div>
          <div style="position: absolute; top: 24px; left: 24px; width: 80px; height: 80px; border-left: 2px solid #fcd34d; border-top: 2px solid #fcd34d;"></div>
        </div>
        <div style="position: absolute; top: 0; right: 0; width: 128px; height: 128px; z-index: 10;">
          <div style="position: absolute; top: 16px; right: 16px; width: 96px; height: 96px; border-right: 4px solid #f59e0b; border-top: 4px solid #f59e0b;"></div>
          <div style="position: absolute; top: 24px; right: 24px; width: 80px; height: 80px; border-right: 2px solid #fcd34d; border-top: 2px solid #fcd34d;"></div>
        </div>
        <div style="position: absolute; bottom: 0; left: 0; width: 128px; height: 128px; z-index: 10;">
          <div style="position: absolute; bottom: 16px; left: 16px; width: 96px; height: 96px; border-left: 4px solid #f59e0b; border-bottom: 4px solid #f59e0b;"></div>
          <div style="position: absolute; bottom: 24px; left: 24px; width: 80px; height: 80px; border-left: 2px solid #fcd34d; border-bottom: 2px solid #fcd34d;"></div>
        </div>
        <div style="position: absolute; bottom: 0; right: 0; width: 128px; height: 128px; z-index: 10;">
          <div style="position: absolute; bottom: 16px; right: 16px; width: 96px; height: 96px; border-right: 4px solid #f59e0b; border-bottom: 4px solid #f59e0b;"></div>
          <div style="position: absolute; bottom: 24px; right: 24px; width: 80px; height: 80px; border-right: 2px solid #fcd34d; border-bottom: 2px solid #fcd34d;"></div>
        </div>

        <!-- Main Content -->
        <div style="position: relative; padding: 60px 80px; z-index: 5; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
          <!-- Header Section -->
          <div style="text-align: center;">
            <!-- Logo & Company Name -->
            <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 24px;">
              <div style="width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(to bottom right, #1e293b, #0f172a); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <span style="font-size: 28px; font-weight: bold; color: #fbbf24;">NS</span>
              </div>
              <div style="text-align: left;">
                <p style="font-size: 11px; color: #64748b; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; margin: 0;">N.A.I.R. Solutions</p>
                <p style="font-size: 22px; font-weight: bold; color: #1e293b; letter-spacing: 0.05em; margin: 0;">CODE2DBUG</p>
              </div>
            </div>

            <!-- Decorative Line -->
            <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 28px;">
              <div style="height: 1px; width: 120px; background: linear-gradient(to right, transparent, #f59e0b);"></div>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              <div style="height: 1px; width: 120px; background: linear-gradient(to left, transparent, #f59e0b);"></div>
            </div>

            <!-- Main Title -->
            <h1 style="font-size: 56px; font-weight: 300; color: #1e293b; letter-spacing: 0.2em; margin: 0 0 8px 0;">CERTIFICATE</h1>
            <p style="font-size: 16px; color: #475569; letter-spacing: 0.4em; font-weight: 300; text-transform: uppercase; margin: 0;">of Course Completion</p>
          </div>

          <!-- Divider -->
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin: 24px 0;">
            <div style="height: 1px; flex: 1; background: linear-gradient(to right, transparent, #cbd5e1);"></div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#f59e0b">
              <circle cx="12" cy="12" r="4"/>
            </svg>
            <div style="height: 1px; flex: 1; background: linear-gradient(to left, transparent, #cbd5e1);"></div>
          </div>

          <!-- Certificate Body -->
          <div style="text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center;">
            <p style="font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.25em; margin-bottom: 20px;">This certificate is proudly presented to</p>

            <!-- Student Name -->
            <div style="display: inline-block; position: relative; margin-bottom: 28px;">
              <h2 style="font-size: 56px; color: #1e293b; font-weight: 300; padding: 8px 48px; margin: 0;">${studentName}</h2>
              <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(to right, transparent, #f59e0b, transparent);"></div>
            </div>

            <p style="font-size: 18px; color: #475569; margin-bottom: 28px;">For successfully completing the course</p>

            <!-- Course Name -->
            <div style="display: inline-block; background: linear-gradient(to right, #1e293b, #0f172a); color: white; padding: 16px 48px; border-radius: 6px; margin-bottom: 28px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <span style="font-size: 24px; font-weight: 600; letter-spacing: 0.05em;">${courseName}</span>
            </div>

            <!-- Certificate ID & Date -->
            <div style="display: flex; justify-content: center; gap: 48px; margin-top: 20px;">
              <div style="text-align: center;">
                <p style="font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Certificate ID</p>
                <p style="font-size: 14px; color: #1e293b; font-weight: 600; margin: 0;">${certificateId}</p>
              </div>
              <div style="text-align: center;">
                <p style="font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Date of Completion</p>
                <p style="font-size: 14px; color: #1e293b; font-weight: 600; margin: 0;">${completionDate}</p>
              </div>
            </div>
          </div>

          <!-- Footer Section -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 32px; border-top: 1px solid #e2e8f0;">
            <!-- Signature -->
            <div style="text-align: center; flex: 1;">
              <img src="${signature}" alt="Signature" style="height: 60px; margin-bottom: 8px; object-fit: contain;" />
              <div style="border-top: 2px solid #1e293b; width: 200px; margin: 0 auto 8px;"></div>
              <p style="font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 4px;">Pravin R. Nair</p>
              <p style="font-size: 10px; color: #64748b; margin: 0;">Founder, N.A.I.R. Solutions</p>
            </div>

            <!-- Company Details -->
            <div style="text-align: center; flex: 1;">
              <h4 style="font-size: 10px; font-weight: bold; color: #334155; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">Issued By N.A.I.R. Solutions</h4>
              <div style="font-size: 10px; color: #64748b;">
                <p style="margin: 3px 0;">www.code2dbug.com | pravinrnair@nairsolutions.org</p>
                <p style="margin: 3px 0;">UDYAM-CG-05-0062143 | Bhilai, Durg, Chhattisgarh</p>
              </div>
            </div>

            <!-- Verification Icon -->
            <div style="text-align: center; flex: 1;">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p style="font-size: 10px; color: #10b981; font-weight: 600; margin-top: 4px;">VERIFIED</p>
            </div>
          </div>
        </div>

        <!-- Bottom Ribbon -->
        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 10px; background: linear-gradient(to right, #fbbf24, #f59e0b, #fbbf24); z-index: 10;"></div>
      </div>
  `;

  try {
    const dataUrl = await toPng(certificateEl, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    });

    const link = document.createElement('a');
    link.download = `${courseName.replace(/\s+/g, '_')}_Certificate_${certificateId}.png`;
    link.href = dataUrl;
    link.click();

    return true;
  } catch (error) {
    console.error('Failed to download certificate:', error);
    return false;
  } finally {
    document.body.removeChild(container);
  }
};
