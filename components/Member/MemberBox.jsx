import { Card, Carousel } from "flowbite-react";
import Link from "next/link";
import React from "react";
import MemberBoxAvatars from "./MemberBoxAvatars";
import MemberBoxDescription from "./MemberBoxDescription";
import MemberBoxFooter from "./MemberBoxFooter";
import MemberBoxImages from "./MemberBoxImages";
import MemberBoxTitle from "./MemberBoxTitle";

const MemberBox = ({ member }) => {
    return (
        <div className="hover:scale-105 transition duration-300">
            <Card style={{ height: "100%" }}>
                <div className="h-full flex flex-col gap-3">
                    <MemberBoxImages Images={member.Images} />
                    <div className="flex flex-row gap-2">
                        <MemberBoxAvatars Avatars={member.Avatars} />
                        <div>
                            <MemberBoxTitle
                                firstName={member.firstName}
                                lastName={member.lastName}
                                username={member.username}
                            />
                            <MemberBoxFooter
                                gender={member.gender}
                                age={member.age}
                            />
                        </div>
                    </div>
                    <MemberBoxDescription description={member.description} />
                </div>
            </Card>
        </div>
    );
};

export default MemberBox;
