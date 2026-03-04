import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { WaitlistEntry, UserRole } from '@/lib/types';

// 验证邮箱格式
function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// GET - 获取 waitlist 列表（可用于管理后台）
export async function GET() {
	try {
		const { data, error } = await supabase
			.from('waitlist_entries')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Supabase GET error:', error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({
			count: data?.length || 0,
			entries: data || [],
		});
	} catch (error) {
		console.error('Waitlist API error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

// POST - 添加到 waitlist
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { email, ageConfirmed, roles = ['supporter'], tags = [], country = null } = body;

		// 验证必填字段
		if (!email || typeof email !== 'string') {
			return NextResponse.json({ error: 'Email is required' }, { status: 400 });
		}

		if (!isValidEmail(email)) {
			return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
		}

		if (ageConfirmed !== true) {
			return NextResponse.json({ error: 'Age confirmation is required' }, { status: 400 });
		}

		// 检查是否已存在
		const { data: existing } = await supabase
			.from('waitlist_entries')
			.select('id')
			.eq('email', email.toLowerCase())
			.single();

		if (existing) {
			// 更新现有记录
			const { data: updated, error: updateError } = await supabase
				.from('waitlist_entries')
				.update({
					roles: roles as UserRole[],
					tags,
					country,
				})
				.eq('email', email.toLowerCase())
				.select()
				.single();

			if (updateError) {
				console.error('Supabase UPDATE error:', updateError);
				return NextResponse.json({ error: updateError.message }, { status: 500 });
			}

			return NextResponse.json({
				success: true,
				message: 'Preferences updated',
				entry: updated,
			});
		}

		// 创建新记录
		const { data: newEntry, error: insertError } = await supabase
			.from('waitlist_entries')
			.insert({
				email: email.toLowerCase(),
				age_confirmed: ageConfirmed,
				roles: roles as UserRole[],
				tags,
				country,
			})
			.select()
			.single();

		if (insertError) {
			console.error('Supabase INSERT error:', insertError);
			return NextResponse.json({ error: insertError.message }, { status: 500 });
		}

		// 转换为 WaitlistEntry 类型
		const entry: WaitlistEntry = {
			id: newEntry.id,
			email: newEntry.email,
			ageConfirmed: newEntry.age_confirmed,
			roles: newEntry.roles as UserRole[],
			tags: newEntry.tags || [],
			country: newEntry.country,
			createdAt: newEntry.created_at,
			updatedAt: newEntry.updated_at,
		};

		return NextResponse.json({
			success: true,
			message: 'Successfully added to waitlist',
			entry,
		});
	} catch (error) {
		console.error('Waitlist API error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
