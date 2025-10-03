import { ApiResponse, TrackNumber } from "@/types/home/hometypes";
import { get } from "@/lib/api";

const getTrackNumber = async (slug: string) => {
    const response = await get<ApiResponse<TrackNumber>>(`/api/track-number/${slug}`);
    return response.data;
};

export default getTrackNumber;