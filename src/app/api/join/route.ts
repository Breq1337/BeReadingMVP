import { NextRequest, NextResponse } from "next/server";
import { currentTeacher } from "@/lib/mock-data";

// Validate an invite code and return class info
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "missing_code" }, { status: 400 });
  }

  const cls = currentTeacher.classes.find(
    (c) => c.inviteCode?.toUpperCase() === code.toUpperCase()
  );

  if (!cls) {
    return NextResponse.json({ error: "invalid_code" }, { status: 404 });
  }

  // Check expiry
  if (cls.inviteExpiry && new Date(cls.inviteExpiry) < new Date()) {
    return NextResponse.json({ error: "expired_code" }, { status: 410 });
  }

  return NextResponse.json({
    classId: cls.id,
    className: cls.name,
    grade: cls.grade,
    teacher: currentTeacher.name,
    school: currentTeacher.school,
    activeBook: cls.activeBook,
    studentCount: cls.studentCount,
  });
}

// Handle student enrollment
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { code, name, email } = body;

  if (!code || !name || !email) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const cls = currentTeacher.classes.find(
    (c) => c.inviteCode?.toUpperCase() === code.toUpperCase()
  );

  if (!cls) {
    return NextResponse.json({ error: "invalid_code" }, { status: 404 });
  }

  if (cls.inviteExpiry && new Date(cls.inviteExpiry) < new Date()) {
    return NextResponse.json({ error: "expired_code" }, { status: 410 });
  }

  // In production, this would:
  // 1. Create/find user profile in Supabase
  // 2. Insert into class_students table
  // 3. Initialize student_stats
  // For now, return success with class info

  return NextResponse.json({
    success: true,
    student: {
      name,
      email,
      classId: cls.id,
      className: cls.name,
      teacher: currentTeacher.name,
      school: currentTeacher.school,
    },
  });
}
