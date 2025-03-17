import { getAllHotels } from "@/database/queries";
import HotelCard from "./HotelCard";

const HotelList = async() => {
  const allHotels = await getAllHotels();
  console.log(allHotels);

  return (
    <div className="col-span-9">
      <div className="space-y-4">
      {
          allHotels.map((hotel) =>(
            <HotelCard
              key={hotel.id}
              hotelInfo={hotel}/>
          ))
        }

      </div>
    </div>
  );
};

export default HotelList;
