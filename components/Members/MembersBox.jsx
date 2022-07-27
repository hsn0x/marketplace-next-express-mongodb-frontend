import React from "react";
import MemberBox from "../Member/MemberBox";

const MembersBox = ({ members }) => {
    return (
        <div className="grid grid-cols-3 gap-3">
            {members.map((member) => (
                <div key={member._id} className="">
                    <MemberBox member={member} />
                </div>
            ))}
        </div>
    );
};

export default MembersBox;
