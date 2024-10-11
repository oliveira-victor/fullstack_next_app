import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

// POST method: Create a new topic
export async function POST(request: Request) {
    const { title, description }: { title: string; description: string } = await request.json();
    await connectMongoDB();
    await Topic.create({ title, description });
    
    return NextResponse.json({ message: "Topic created" }, { status: 201 });
}

// GET method: Get all topics
export async function GET() {
    await connectMongoDB();
    const topics = await Topic.find();
    
    return NextResponse.json({ topics }, { status: 200 });
}

// DELETE method: Delete a topic by ID
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url); // Parse the URL
    const id = searchParams.get("id"); // Get the 'id' from the query parameters

    if (!id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await connectMongoDB();
    await Topic.findByIdAndDelete(id);

    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
