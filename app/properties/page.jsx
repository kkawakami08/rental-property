import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Pagination from "@/components/Pagination";

//url.com/properties?page=1
const PropertiesPage = async ({ searchParams: { page = 1, pageSize = 9 } }) => {
  await connectDB();

  //page defaults to one and pageSize = number of items on the page
  //if two items per page, then page 2 will start on 3rd item
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});

  //.lean() returns plan json objects rather than mongodb objects --> faster but for read only (if you don't alter the data etc)
  //.find({}) returns everything
  const properties = await Property.find({}).skip(skip).limit(pageSize);

  //if only 1 page, don't show pagination
  const showPagination = total > pageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length == 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            totalItems={total}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
