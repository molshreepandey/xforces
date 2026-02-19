"use server"
import redis from "@/lib/redis";

export const PollSubmissionStatus = async (taskId: string): Promise<{ state: string; remark: string } | null> => {
    const status = await redis.hgetall(`status:${taskId}`);

    if (!status || Object.keys(status).length === 0) {
        return null;
    }

    return {
        state: status.state || "queued",
        remark: status.remark || "",
    };
};
