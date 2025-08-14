import { NextRequest, NextResponse } from 'next/server';
import { verifyTurnstileToken } from '@/lib/turnstile';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: '缺少验证token' },
        { status: 400 }
      );
    }

    // 验证Turnstile token
    const isValid = await verifyTurnstileToken(token);

    if (isValid) {
      return NextResponse.json({ success: true });
    } else {
      console.error('Turnstile验证失败');
      return NextResponse.json(
        { error: '验证失败，请重试' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Turnstile验证异常:', error);
    return NextResponse.json(
      { error: '验证服务异常' },
      { status: 500 }
    );
  }
} 