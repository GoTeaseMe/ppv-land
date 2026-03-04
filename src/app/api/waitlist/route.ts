import { NextRequest, NextResponse } from 'next/server';
import { type WaitlistEntry, type UserRole } from '@/lib/types';

// 简单的内存存储（生产环境应使用数据库）
const waitlistStore = new Map<string, WaitlistEntry>();

// 生成唯一 ID
function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// 验证邮箱格式
function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// GET - 获取 waitlist 列表（可用于管理后台）
export async function GET() {
	return NextResponse.json({
		count: waitlistStore.size,
		entries: Array.from(waitlistStore.values()).sort(
			(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		),
	});
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
		for (const entry of waitlistStore.values()) {
			if (entry.email.toLowerCase() === email.toLowerCase()) {
				// 更新现有记录
				const updatedEntry: WaitlistEntry = {
					...entry,
					roles: roles as UserRole[],
					tags,
					country,
					updatedAt: new Date().toISOString(),
				};
				waitlistStore.set(entry.id, updatedEntry);
				return NextResponse.json({ success: true, message: 'Preferences updated' });
			}
		}

		// 创建新记录
		const newEntry: WaitlistEntry = {
			id: generateId(),
			email: email.toLowerCase(),
			ageConfirmed,
			roles: roles as UserRole[],
			tags,
			country,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		waitlistStore.set(newEntry.id, newEntry);

		return NextResponse.json({
			success: true,
			message: 'Successfully added to waitlist',
			entry: newEntry,
		});
	} catch (error) {
		console.error('Waitlist API error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
