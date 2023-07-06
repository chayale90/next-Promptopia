import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//  GET (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response("Prompt not found", { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 200 })
    }
    catch (error) {
        console.log(error);
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}

//  PATCH (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    console.log({ prompt, tag });
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id)
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 })
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        // Save the changes to the database
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    }
    catch (err) {
        console.log(err);
        return new Response("Failed to update prompt", { status: 500 });
    }
}

//  DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id)
        return new Response('prompt deleted successfully', { status: 200 })

    } catch (err) {
        return new Response("Failed to delete prompt", { status: 500 });

    }

}