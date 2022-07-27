import { Card } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import StorePageHeaderAvatar from "./StorePageHeaderAvatar";
import StorePageHeaderImages from "./StorePageHeaderImages";
import StorePageHeaderOwner from "./StorePageHeaderOwner";

const StorePageHeader = ({ Images, Avatars, name, username, user }) => {
    return (
        <div>
            <Card>
                <StorePageHeaderImages Images={Images} />
                <StorePageHeaderAvatar
                    Avatars={Avatars}
                    name={name}
                    username={username}
                />
                <StorePageHeaderOwner username={user.username} />
            </Card>
        </div>
    );
};

export default StorePageHeader;
