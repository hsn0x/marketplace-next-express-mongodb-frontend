import React, { useEffect, useRef } from "react";
import axios from "axios";
import { axiosServer } from "../../db/axios";
import { useDispatch, useSelector } from "react-redux";
import { membersActions } from "../../redux/actions";
import { bindActionCreators } from "redux";
import { getError } from "../../utils/error";
import { Card, Carousel, Spinner } from "flowbite-react";
import Link from "next/link";
import MemberBox from "../../components/Member/MemberBox";
import MemberPageTitle from "../../components/Members/MembersPageTitle";
import MemberPageLoading from "../../components/Members/MembersPageLoading";
import { notRequireAuthentication } from "../../HOC/notRequireAuthentication";
import { updateAuth, updateIsAuthenticated } from "../../redux/actions/auth";
import MembersBox from "../../components/Members/MembersBox";

const Members = ({ authUser }) => {
    const dispatch = useDispatch();
    const { members, loading } = useSelector(({ members }) => members);

    const { membersFetchFail, membersFetchRequest, membersFetchSuccess } =
        bindActionCreators(membersActions, dispatch);

    useEffect(() => {
        dispatch(updateAuth(authUser));
        dispatch(updateIsAuthenticated(!!authUser));
        const fetchMembers = async () => {
            membersFetchRequest();
            try {
                const { data } = await axiosServer.get("/users");
                membersFetchSuccess(data.rows);
            } catch (error) {
                membersFetchFail(getError(error));
            }
        };
        fetchMembers();
    }, []);

    return (
        <div>
            <MemberPageLoading loading={loading} />
            <MemberPageTitle title="All Members" />
            <MembersBox members={members} />
        </div>
    );
};

export const getServerSideProps = notRequireAuthentication((context) => {
    return {};
});

export default Members;
