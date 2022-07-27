import { Card } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import MemberPageHeaderAvatar from "./MemberPageHeaderAvatar";
import MemberPageHeaderImages from "./MemberPageHeaderImages";
import MemberPageHeaderOwner from "./MemberPageHeaderOwner";

const MemberPageHeader = ({
    firstName,
    lastName,
    Images,
    Avatars,
    username,
}) => {
    return (
        <div>
            <Card>
                <MemberPageHeaderImages Images={Images} />
                <MemberPageHeaderAvatar
                    Avatars={Avatars}
                    firstName={firstName}
                    lastName={lastName}
                    username={username}
                />
            </Card>
        </div>
    );
};

export default MemberPageHeader;
