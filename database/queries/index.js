import { HotelModel } from "@/models/hotel-model";
import { RatingModel } from "@/models/rating-model";
import { ReviewModel } from "@/models/review-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";

export async function getAllHotels() {
    const hotels = await HotelModel
    .find().select(["thumbNailUrl", "name", "highRate", "lowRate", "city", "propertyCategory"]).lean();

    return replaceMongoIdInArray(hotels);
}

export async function getHotelById(hotelId) {
    const hotel = await HotelModel.findById(hotelId).lean();
    return replaceMongoIdInObject(hotel);
}

export async function getRatingsForAHotel(hotelId) {
    const ratings = await RatingModel.find({hotelId: hotelId}).lean();
    return replaceMongoIdInArray(ratings);
}

export async function getReviewsForAHotel(hotelId) {
    const reviews = await ReviewModel.find({ hotelId: hotelId }).lean();
    return replaceMongoIdInArray(reviews);
}