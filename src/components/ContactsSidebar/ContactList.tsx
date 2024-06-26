import React from "react";
import ContactCard from "./ContactCard";
import GroupContactCard from "./GroupContactCard";
import { Contact, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from "@/lib/models/user";

type ContactListProps = {
    contacts: User[];
    showContactsLoader: boolean;
    handleChatNavigation: any;
};

const ContactList = ({
    contacts,
    showContactsLoader,
    handleChatNavigation,
}: ContactListProps) => {
    return (
        <div
            className={cn("flex flex-col flex-1 overflow-y-auto w-full", {
                "items-center justify-center":
                    showContactsLoader || contacts.length === 0,
            })}>
            {showContactsLoader ? (
                <div className="flex flex-col gap-2 items-center text-center">
                    <Loader className="animate-spin" />
                    <span className="">Loading contacts...</span>
                </div>
            ) : (
                <>
                    {contacts.length > 0 ? (
                        contacts.map((contact) => (
                            <ContactCard
                                contact={contact}
                                message="Oboy dash me 2k na"
                                has_unviewed_status={true}
                                number_of_unread_msgs={0}
                                timestamp={contact.last_login}
                                handleChatNavigation={handleChatNavigation}
                                key={contact.id}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col gap-2 items-center text-center">
                            <div className="flex justify-center gap-2">
                                <Contact />
                                <h2 className="font-semibold text-xl">
                                    No contacts
                                </h2>
                            </div>
                            <div>
                                <p>Add new contacts to start chatting</p>
                            </div>
                        </div>
                    )}
                    {/* 
                    <ContactCard
                        name="Gideon Nic"
                        image_url="/avatar-3.png"
                        message="Looking good on all sides. Trying to see if this long sentence get's truncated with some ellipsis. This should be long enough, I guess :)"
                        has_unviewed_status={false}
                        number_of_unread_msgs={10}
                        timestamp={new Date().toISOString()}
                    />
                    <GroupContactCard
                        name="Codegaminator 10.0 - UIUX Class"
                        image_url=""
                        message="Bryan: Submit your figma links here before the end of today. Failure to do so will result in point loss."
                        has_unviewed_status={true}
                        number_of_unread_msgs={0}
                        timestamp={new Date().toISOString()}
                    />
                    <ContactCard
                        name="Daniel Kalio"
                        image_url="/avatar-2.png"
                        message="Oboy dash me 2k na"
                        has_unviewed_status={true}
                        number_of_unread_msgs={293}
                        timestamp={new Date().toISOString()}
                    />
                    <ContactCard
                        name="Daniel Kalio"
                        image_url="/avatar-2.png"
                        message="Oboy dash me 2k na"
                        has_unviewed_status={true}
                        number_of_unread_msgs={0}
                        timestamp={new Date().toISOString()}
                    />
                    <GroupContactCard
                        name="Money Making Group"
                        image_url="/lol-img.png"
                        message="Mr Richard: Join GNCC today!"
                        has_unviewed_status={true}
                        number_of_unread_msgs={0}
                        timestamp={new Date().toISOString()}
                    />
                    <ContactCard
                        name="Daniel Kalio"
                        image_url="/avatar-2.png"
                        message="Oboy dash me 2k na"
                        has_unviewed_status={true}
                        number_of_unread_msgs={0}
                        timestamp={new Date().toISOString()}
                    />
                    <ContactCard
                        name="Daniel Kalio"
                        image_url="/avatar-2.png"
                        message="Oboy dash me 2k na"
                        has_unviewed_status={true}
                        number_of_unread_msgs={0}
                        timestamp={new Date().toISOString()}
                    />
                    <ContactCard
                        name="Daniel Kalio"
                        image_url="/avatar-2.png"
                        message="Oboy dash me 2k na"
                        has_unviewed_status={true}
                        number_of_unread_msgs={0}
                        timestamp={new Date().toISOString()}
                    />
                    <ContactCard
                        name="Daniel Kalio"
                        image_url="/avatar-2.png"
                        message="Oboy dash me 2k na"
                        has_unviewed_status={true}
                        number_of_unread_msgs={0}
                        timestamp={new Date().toISOString()}
                    />
                    <ContactCard
                        name="Daniel Kalio"
                        image_url="/avatar-2.png"
                        message="Oboy dash me 2k na"
                        has_unviewed_status={true}
                        number_of_unread_msgs={0}
                        timestamp={new Date().toISOString()}
                    />
                    <ContactCard
                        name="Daniel Kalio"
                        image_url="/avatar-2.png"
                        message="Oboy dash me 2k na"
                        has_unviewed_status={true}
                        number_of_unread_msgs={0}
                        timestamp={new Date().toISOString()}
                    />
                    <ContactCard
                        name="Daniel Kalio"
                        image_url="/avatar-2.png"
                        message="Oboy dash me 2k na"
                        has_unviewed_status={true}
                        number_of_unread_msgs={0}
                        timestamp={new Date().toISOString()}
                    />
                    <ContactCard
                        name="Daniel Kalio"
                        image_url="/avatar-2.png"
                        message="Oboy dash me 2k na"
                        has_unviewed_status={true}
                        number_of_unread_msgs={0}
                        timestamp={new Date().toISOString()}
                    />
                    <ContactCard
                        name="Daniel Kalio"
                        image_url="/avatar-2.png"
                        message="Oboy dash me 2k na"
                        has_unviewed_status={true}
                        number_of_unread_msgs={0}
                        timestamp={new Date().toISOString()}
                    /> */}
                </>
            )}
        </div>
    );
};

export default ContactList;
