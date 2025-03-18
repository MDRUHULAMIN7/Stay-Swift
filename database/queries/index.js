import { BookingModel } from "@/models/booking-model";
import { HotelModel } from "@/models/hotel-model";
import { RatingModel } from "@/models/rating-model";
import { ReviewModel } from "@/models/review-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";

import { isDateInbetween } from "@/utils/data-util";

export async function getAllHotels(destination, checkin, checkout,) {
    const regex = new RegExp(destination, "i");
    const hotelsByDestination = await HotelModel
        .find({ city: { $regex: regex } })
        .select(["thumbNailUrl", "name", "highRate", "lowRate", "city", "propertyCategory"])
        .lean();

    let allHotels = hotelsByDestination;

    if (checkin && checkout) {

        allHotels = await Promise.all(
            allHotels.map(async (hotel) => {
              const found = await findBooking(hotel._id, checkin, checkout);
              console.log(found);
              if (found) {
                hotel["isBooked"] = true;
              } else {
                hotel["isBooked"] = false;
              }
              return hotel;
            })
        );
    }

    return replaceMongoIdInArray(allHotels);
}

async function findBooking(hotelId, checkin, checkout) {
    const matches = await BookingModel
      .find({ hotelId: hotelId.toString() })
      .lean();

    const found = matches.find((match) => {
      return (
        isDateInbetween(checkin, match.checkin, match.checkout) ||
        isDateInbetween(checkout, match.checkin, match.checkout)
      );
    });
    console.log(found);

    return found;
  }

  export async function getHotelById(hotelId, checkin, checkout) {
    const hotel = await HotelModel.findById(hotelId).lean();

    if (checkin && checkout) {
        const found = await findBooking(hotel._id, checkin, checkout);
        if (found) {
            hotel["isBooked"] = true;
        }else {
            hotel["isBooked"] = false;
        }
    }
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