import React from "react";
import SidebarHeader from "./SidebarHeader";
import SearchBar from "./SearchBar";
import ContactList from "./ContactList";
import { User } from "@/lib/models/user";

type Props = {
    contacts: User[];
    showContactsLoader: boolean;
    handleChatNavigation: any;
};

const ContactsSidebar = ({
    contacts,
    showContactsLoader,
    handleChatNavigation,
}: Props) => {
    return (
        <div className="flex flex-col w-[35%] lg:w-[40%] xl:w-[30%] min-h-screen max-h-full overflow-auto bg-white">
            <SidebarHeader />
            <SearchBar />
            <ContactList
                contacts={contacts}
                showContactsLoader={showContactsLoader}
                handleChatNavigation={handleChatNavigation}
            />
        </div>
    );
};

export default ContactsSidebar;
