import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json(
		{
			message: 'Hello from the Bandan portfolio API',
			timestamp: new Date().toISOString(),
		},
		{
			headers: {
				'X-Robots-Tag': 'noindex, nofollow',
			},
		}
	);
}
