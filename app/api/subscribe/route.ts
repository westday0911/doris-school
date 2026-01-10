import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendNewsleopardEmail } from '@/lib/newsleopard';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // 1. Save to Database
    const { error: dbError } = await supabase
      .from("subscribers")
      .upsert([{ email, status: 'active' }], { onConflict: 'email' });

    if (dbError) {
      console.error('Database insertion error:', dbError);
      throw new Error('Failed to save subscription');
    }

    // 2. Send Success Notification to User
    try {
      await sendNewsleopardEmail({
        subject: '【Doris AI 學院】恭喜您訂閱成功！',
        to_email: email,
        content: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background: #2563eb; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">訂閱成功！</h1>
            </div>
            <div style="padding: 30px;">
              <h2>歡迎加入 Doris AI 學院！</h2>
              <p>您好，感謝您訂閱我們的電子報。從現在起，您將會定期收到：</p>
              <ul>
                <li>最新 AI 趨勢分析與工具評測</li>
                <li>獨家 Prompt 提示詞框架分享</li>
                <li>自動化工作流實戰案例</li>
                <li>課程優先報名權與專屬優惠</li>
              </ul>
              <p>我們迫不及待想與您分享更多精彩內容！</p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://doris-ai-academy.com" style="background: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">回到學院網站</a>
              </div>
            </div>
            <div style="background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999;">
              <p>© 2026 Doris AI 學院. All rights reserved.</p>
              <p>如果您想取消訂閱，請點擊信件底部的取消訂閱連結（或直接聯繫我們）。</p>
            </div>
          </div>
        `
      });
    } catch (err) {
      console.error('Failed to send subscription email:', err);
      // We still return success since they are subscribed in DB
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Subscribe API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
