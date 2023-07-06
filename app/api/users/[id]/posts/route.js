import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const promps = await Prompt.find({
            creator: params.id
        }).populate('creator');
        return new Response(JSON.stringify(promps), { status: 200 })
    }
    catch (error) {
        console.log(error);
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}