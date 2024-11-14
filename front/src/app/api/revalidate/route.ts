import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, res: Response) {
    const { searchParams } = new URL(req.url)
    const tags = searchParams.get('tag')
    try {
        if (!tags) throw new Error("تگی ارسال نشده !")
        revalidateTag(tags)
        return NextResponse.json({ msg: true });
    } catch (err) {
        return NextResponse.json({ message: err || 'با خطا مواجه شدیم!!!' }, { status: 500 });
    }
}