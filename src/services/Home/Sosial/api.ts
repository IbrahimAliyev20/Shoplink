import { get } from "@/lib/api";
import { Sosial } from "@/types/home/hometypes";

type SosialApiResponse = Sosial;

const getSosial = async () => {
    const response = await get<SosialApiResponse>("api/sosial-media");
    return response;
};

export { getSosial };