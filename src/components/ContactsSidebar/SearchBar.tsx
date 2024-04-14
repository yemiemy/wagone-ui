import { ListFilterIcon, SearchIcon } from "lucide-react";
import React from "react";

type Props = {};

const SearchBar = (props: Props) => {
    return (
        <div className="w-full h-[74px] flex justify-between gap-4 items-center pl-[13px] pr-[15px] py-[13px] border-b border-gray-300">
            <div className="w-[90%] h-full flex gap-4 items-center pl-5  bg-[#F0F2F5] rounded-md">
                <label htmlFor="search-bar">
                    <SearchIcon color="#54656F" />
                </label>

                <input
                    type="text"
                    id="search-bar"
                    className="w-full h-full p-2 rounded-md appearance-none bg-[#F0F2F5]"
                    placeholder="Search or start new chat"
                />
                {/* <span className="text-[#54656F]">Search or start new chat</span> */}
            </div>
            <span>
                <ListFilterIcon color="#54656F" />
            </span>
        </div>
    );
};

export default SearchBar;
