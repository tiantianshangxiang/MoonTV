// Turnstile配置
export const TURNSTILE_CONFIG = {
  // 站点密钥 - 用于前端显示
  SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAABri7OqoFEkpgi9C',
  // 密钥 - 用于后端验证
  SECRET_KEY: process.env.TURNSTILE_SECRET_KEY || '0x4AAAAAABri7EJZ5VKGV-D6ZFKtQHS8AM8',
};

// 验证Turnstile token
export async function verifyTurnstileToken(token: string): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('secret', TURNSTILE_CONFIG.SECRET_KEY);
    formData.append('response', token);

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Turnstile验证失败:', error);
    return false;
  }
} 