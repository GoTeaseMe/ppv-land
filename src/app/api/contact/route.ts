import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// 验证邮箱格式
function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// POST - 提交联系表单
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, subject, message } = body;

		// 验证必填字段
		if (!name || typeof name !== 'string' || name.trim().length === 0) {
			return NextResponse.json({ error: 'Name is required' }, { status: 400 });
		}

		if (!email || typeof email !== 'string' || !isValidEmail(email)) {
			return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
		}

		if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
			return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
		}

		if (!message || typeof message !== 'string' || message.trim().length === 0) {
			return NextResponse.json({ error: 'Message is required' }, { status: 400 });
		}

		// 保存到数据库
		const { data, error } = await supabase
			.from('contact_messages')
			.insert({
				name: name.trim(),
				email: email.toLowerCase().trim(),
				subject: subject.trim(),
				message: message.trim(),
			})
			.select()
			.single();

		if (error) {
			console.error('Supabase INSERT error:', error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({
			success: true,
			message: 'Message sent successfully',
			entry: data,
		});
	} catch (error) {
		console.error('Contact API error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
