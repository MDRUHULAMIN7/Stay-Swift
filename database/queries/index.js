import { HotelModel } from "@/models/hotel-model";
import { replaceMongoIdInArray } from "@/utils/data-util";

export async function getAllHotels() {
    const hotels = await HotelModel
    .find().lean();

    return replaceMongoIdInArray(hotels);
}