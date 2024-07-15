import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
    const { _id, name, description, pricePerNight, imageUrl } = room;
    return (
        <div>
            <Link to={`/roomDetails/${_id}`} key={room._id} className="block">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">{name}</h2>
                        <p className="text-gray-700 mb-2">{description}</p>
                        <p className="text-lg font-bold">${pricePerNight}/night</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            View Details
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RoomCard;