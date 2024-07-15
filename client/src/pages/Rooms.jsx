import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard.jsx';
import axios from 'axios';

function Rooms() {
    const [rooms, setRooms] = useState([]);

    const [sort, setSort] = useState('');

    const [search, setSearch] = useState('');
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/rooms?sort=${sort}&search=${search}`);

            setRooms(data)
        }
        getData();
    }, [search, sort]);

    const handleReset = () => {

        setSort('')
        setSearch('')
        setSearchText('')
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const text = e.target.search.value
        setSearch(text)
    }

    return (
        <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
                <form onSubmit={handleSearch}>
                    <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                        <input
                            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent flex-grow"
                            type="text"
                            value={search}
                            onChange={handleSearch}
                            placeholder="Enter Room Name or Location"
                            aria-label="Enter Room Name or Location"
                        />
                        <button
                            type="submit"
                            className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
                        >
                            Search
                        </button>
                    </div>
                </form>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border p-4 rounded-md"
                >
                    <option value="">Sort By Deadline</option>
                    <option value="dsc">Descending Order</option>
                    <option value="asc">Ascending Order</option>
                </select>

                <button onClick={handleReset} className="btn">Reset</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {rooms.map(room => (
                    <RoomCard key={room._id} room={room} />
                ))}
            </div>
        </div>
    );
}

export default Rooms;
