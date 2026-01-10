import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendNewsleopardEmail } from '@/lib/newsleopard';

export async function POST(req: Request) {
  try {
    const { name, contact_info, requirement } = await req.json();

    if (!name || !contact_info) {
      return NextResponse.json({ error: 'Name and contact info are required' }, { status: 400 });
    }

    // 1. Save to Database
    const { error: dbError } = await supabase
      .from("contacts")
      .insert([
        {
          name,
          contact_info,
          requirement,
          status: "pending"
        }
      ]);

    if (dbError) {
      console.error('Database insertion error:', dbError);
      // We continue even if DB fails, or we can stop here. 
      // Usually better to ensure DB record exists first.
      throw new Error('Failed to save contact request');
    }

    // 2. Determine if contact_info is an email
    const isEmail = contact_info.includes('@');
    const adminEmail = 'dorsi@hiinmusic.com';

    // 3. Send Email to User (if info is an email)
    if (isEmail) {
      try {
        await sendNewsleopardEmail({
          subject: '【Doris AI 學院】我們已收到您的諮詢申請',
          to_email: contact_info,
          content: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
              <h2>您好 ${name}，</h2>
              <p>感謝您對 Doris AI 學院的關注與支持！</p>
              <p>我們已經收到您的諮詢申請，以下是您的填寫內容：</p>
              <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>您的稱呼：</strong> ${name}</p>
                <p><strong>聯絡方式：</strong> ${contact_info}</p>
                <p><strong>諮詢需求：</strong> ${requirement || '未提供'}</p>
              </div>
              <p>我們的專人將會盡快與您聯繫（通常在 1-2 個工作天內）。</p>
              <p>祝您學習愉快！</p>
              <hr />
              <p style="font-size: 12px; color: #999;">此信件為系統自動發送，請勿直接回覆。</p>
            </div>
          `
        });
      } catch (err) {
        console.error('Failed to send notification email to user:', err);
        // Don't fail the whole request if one email fails
      }
    }

    // 4. Send Email to Admin (dorsi@hiinmusic.com)
    try {
      await sendNewsleopardEmail({
        subject: `【新諮詢通知】來自 ${name} 的諮詢申請`,
        to_email: adminEmail,
        content: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
            <h2>管理員您好，</h2>
            <p>網站收到一筆新的諮詢申請：</p>
            <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>稱呼：</strong> ${name}</p>
              <p><strong>聯絡資訊：</strong> ${contact_info}</p>
              <p><strong>需求內容：</strong> ${requirement || '無'}</p>
              <p><strong>提交時間：</strong> ${new Date().toLocaleString('zh-TW')}</p>
            </div>
            <p>請盡快前往後台查看並處理。</p>
          </div>
        `
      });
    } catch (err) {
      console.error('Failed to send notification email to admin:', err);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
