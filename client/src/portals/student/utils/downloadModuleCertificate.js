import { toPng } from 'html-to-image';

/**
 * Creates a hidden certificate element and downloads it as PNG
 */
export const downloadModuleCertificate = async ({
  studentName = 'Student',
  courseName = 'Course',
  moduleTitle = 'Module',
}) => {
  // Create a hidden container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  document.body.appendChild(container);

  // Create certificate element
  const certificateEl = document.createElement('div');
  certificateEl.style.width = '900px';
  certificateEl.style.background = 'white';
  certificateEl.style.fontFamily = "Georgia, 'Times New Roman', serif";
  container.appendChild(certificateEl);

  // Create certificate HTML
  certificateEl.innerHTML = `
      <!-- Certificate Container -->
      <div style="position: relative; background: white; overflow: hidden;">
        <!-- Decorative Corner Elements -->
        <div style="position: absolute; top: 0; left: 0; width: 128px; height: 128px;">
          <div style="position: absolute; top: 16px; left: 16px; width: 96px; height: 96px; border-left: 4px solid #f59e0b; border-top: 4px solid #f59e0b;"></div>
          <div style="position: absolute; top: 24px; left: 24px; width: 80px; height: 80px; border-left: 2px solid #fcd34d; border-top: 2px solid #fcd34d;"></div>
        </div>
        <div style="position: absolute; top: 0; right: 0; width: 128px; height: 128px;">
          <div style="position: absolute; top: 16px; right: 16px; width: 96px; height: 96px; border-right: 4px solid #f59e0b; border-top: 4px solid #f59e0b;"></div>
          <div style="position: absolute; top: 24px; right: 24px; width: 80px; height: 80px; border-right: 2px solid #fcd34d; border-top: 2px solid #fcd34d;"></div>
        </div>
        <div style="position: absolute; bottom: 0; left: 0; width: 128px; height: 128px;">
          <div style="position: absolute; bottom: 16px; left: 16px; width: 96px; height: 96px; border-left: 4px solid #f59e0b; border-bottom: 4px solid #f59e0b;"></div>
          <div style="position: absolute; bottom: 24px; left: 24px; width: 80px; height: 80px; border-left: 2px solid #fcd34d; border-bottom: 2px solid #fcd34d;"></div>
        </div>
        <div style="position: absolute; bottom: 0; right: 0; width: 128px; height: 128px;">
          <div style="position: absolute; bottom: 16px; right: 16px; width: 96px; height: 96px; border-right: 4px solid #f59e0b; border-bottom: 4px solid #f59e0b;"></div>
          <div style="position: absolute; bottom: 24px; right: 24px; width: 80px; height: 80px; border-right: 2px solid #fcd34d; border-bottom: 2px solid #fcd34d;"></div>
        </div>

        <!-- Main Content -->
        <div style="position: relative; padding: 48px 64px;">
          <!-- Header Section -->
          <div style="text-align: center; margin-bottom: 32px;">
            <!-- Logo & Company Name -->
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 24px;">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(to bottom right, #1e293b, #0f172a); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <span style="font-size: 24px; font-weight: bold; color: #fbbf24;">NS</span>
              </div>
              <div style="text-align: left;">
                <p style="font-size: 10px; color: #64748b; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; margin: 0;">N.A.I.R. Solutions</p>
                <p style="font-size: 18px; font-weight: bold; color: #1e293b; letter-spacing: 0.05em; margin: 0;">CODE2DBUG</p>
              </div>
            </div>

            <!-- Decorative Line -->
            <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 24px;">
              <div style="height: 1px; width: 96px; background: linear-gradient(to right, transparent, #f59e0b);"></div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M12 15l-2 5l9-9-5-2 2-5-9 9z"/></svg>
              <div style="height: 1px; width: 96px; background: linear-gradient(to left, transparent, #f59e0b);"></div>
            </div>

            <!-- Main Title -->
            <h1 style="font-size: 48px; font-weight: 300; color: #1e293b; letter-spacing: 0.2em; margin: 0 0 8px 0;">CERTIFICATE</h1>
            <p style="font-size: 14px; color: #475569; letter-spacing: 0.4em; font-weight: 300; text-transform: uppercase; margin: 0;">of Module Completion</p>
          </div>

          <!-- Divider -->
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 32px;">
            <div style="height: 1px; flex: 1; background: linear-gradient(to right, transparent, #cbd5e1);"></div>
            <div style="width: 8px; height: 8px; transform: rotate(45deg); background: #f59e0b;"></div>
            <div style="height: 1px; flex: 1; background: linear-gradient(to left, transparent, #cbd5e1);"></div>
          </div>

          <!-- Certificate Body -->
          <div style="text-align: center; margin-bottom: 40px;">
            <p style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.25em; margin-bottom: 16px;">This certificate is proudly presented to</p>

            <!-- Student Name -->
            <div style="display: inline-block; position: relative; margin-bottom: 24px;">
              <h2 style="font-size: 48px; color: #1e293b; font-weight: 300; padding: 8px 32px; margin: 0;">${studentName}</h2>
              <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, transparent, #f59e0b, transparent);"></div>
            </div>

            <p style="font-size: 16px; color: #475569; margin-bottom: 24px;">In recognition of successful completion of the module</p>

            <!-- Module Name -->
            <div style="display: inline-block; background: linear-gradient(to right, #1e293b, #0f172a); color: white; padding: 12px 32px; border-radius: 4px; margin-bottom: 24px;">
              <span style="font-size: 18px; font-weight: 600; letter-spacing: 0.05em;">${moduleTitle}</span>
            </div>

            <p style="font-size: 16px; color: #475569; margin-bottom: 8px;">from the course</p>

            <!-- Course Name -->
            <p style="font-size: 20px; font-weight: 600; color: #334155; margin: 0;">${courseName}</p>
          </div>

          <!-- Footer Section -->
          <div style="display: flex; justify-content: center; padding-top: 32px; border-top: 1px solid #e2e8f0;">
            <div style="text-align: center;">
              <h4 style="font-size: 10px; font-weight: bold; color: #334155; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;">Issued By N.A.I.R. Solutions</h4>
              <div style="font-size: 11px; color: #64748b;">
                <p style="margin: 4px 0;">www.code2dbug.com | pravinrnair@nairsolutions.org</p>
                <p style="margin: 4px 0;">UDYAM-CG-05-0062143 | Bhilai, Durg, Chhattisgarh</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Ribbon -->
        <div style="height: 8px; background: linear-gradient(to right, #fbbf24, #f59e0b, #fbbf24);"></div>
      </div>
  `;

  try {
    const dataUrl = await toPng(certificateEl, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    });

    const link = document.createElement('a');
    link.download = `${moduleTitle.replace(/\s+/g, '_')}_Certificate.png`;
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
