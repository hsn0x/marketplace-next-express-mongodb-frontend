import {
    Button,
    Card,
    Carousel,
    Rating,
    Spinner,
    Tabs,
    TextInput,
} from "flowbite-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import ProductsBox from "../../../components/Products/ProductsBox";
import MemberPageContent from "../../../components/Member/MemberPageContent";
import MemberPageHeader from "../../../components/Member/MemberPageHeader";
import MemberPageTabs from "../../../components/Member/MemberPageTabs";
import { axiosServer } from "../../../db/axios";
import { memberActions } from "../../../redux/actions";
import { getError } from "../../../utils/error";
import { notRequireAuthentication } from "../../../HOC/notRequireAuthentication";
import { updateAuth, updateIsAuthenticated } from "../../../redux/actions/auth";

const MemberUsernamePage = ({ params, authUser }) => {
    const { username } = params;
    const dispatch = useDispatch();
    const { member, loading } = useSelector(({ member }) => member);
    const { memberFetchFail, memberFetchRequest, memberFetchSuccess } =
        bindActionCreators(memberActions, dispatch);

    useEffect(() => {
        dispatch(updateAuth(authUser));
        dispatch(updateIsAuthenticated(!!authUser));
        const fetchMember = async () => {
            memberFetchRequest();
            try {
                const { data } = await axiosServer.get(
                    `/users/username/${username}`
                );
                memberFetchSuccess(data);
            } catch (error) {
                memberFetchFail(getError(error));
                console.log(error);
            }
        };
        fetchMember();
    }, []);

    return (
        <div>
            {loading && (
                <div className="flex justify-center items-center">
                    <Spinner
                        aria-label="Extra small spinner example"
                        size="xl"
                    />
                </div>
            )}
            {member && (
                <div className="grid grid-cols-1 gap-1">
                    <div>
                        <MemberPageHeader
                            Images={member.Images}
                            Avatars={member.Avatars}
                            firstName={member.firstName}
                            lastName={member.lastName}
                            username={member.username}
                        />
                    </div>

                    <div>
                        <MemberPageContent description={member.description} />
                    </div>

                    <div>
                        <MemberPageTabs
                            products={member.Products}
                            markets={member.Markets}
                            about={member.about}
                            comments={member.Comments}
                            reviews={member.Reviews}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export const getServerSideProps = notRequireAuthentication(({ params }) => {
    return {
        params,
    };
});

export default MemberUsernamePage;
