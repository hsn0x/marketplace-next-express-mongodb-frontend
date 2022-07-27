import { Card, Tabs } from "flowbite-react";
import React from "react";
import MediasBox from "./MediasBox";
import { useSelector } from "react-redux";

const MediasPageTabs = ({ authUser }) => {
    const profile = useSelector(({ auth }) => auth.profile);

    return (
        <div>
            {profile && (
                <Card>
                    <Tabs.Group aria-label="Pills" style="pills">
                        <Tabs.Item active={true} title="All">
                            <div className="grid grid-cols-4 gap-2">
                                <MediasBox
                                    title="Profile Covers"
                                    medias={profile.Images || []}
                                />
                                <MediasBox
                                    title="Profile Avatars"
                                    medias={profile.Avatars || []}
                                />
                                <MediasBox
                                    title="Markets Covers"
                                    mediasName="Images"
                                    medias={profile.Markets || []}
                                />
                                <MediasBox
                                    title="Markets Avatars"
                                    mediasName="Avatars"
                                    medias={profile.Markets || []}
                                />
                                <MediasBox
                                    title="Products Images"
                                    mediasName="Images"
                                    medias={profile.Products || []}
                                />
                            </div>
                        </Tabs.Item>
                        <Tabs.Item active={true} title="Images">
                            <div className="grid grid-cols-4 gap-2">
                                <MediasBox
                                    title="Profile Covers"
                                    medias={profile.Images || []}
                                />
                                <MediasBox
                                    title="Markets Covers"
                                    mediasName="Images"
                                    medias={profile.Markets || []}
                                />
                                <MediasBox
                                    title="Products Images"
                                    mediasName="Images"
                                    medias={profile.Products || []}
                                />
                            </div>
                        </Tabs.Item>
                        <Tabs.Item title="Videos">Videos</Tabs.Item>
                        <Tabs.Item title="Avatars">
                            <div className="grid grid-cols-4 gap-2">
                                <MediasBox
                                    title="Profile Avatars"
                                    medias={profile.Avatars || []}
                                />
                                <MediasBox
                                    title="Markets Avatars"
                                    mediasName="Avatars"
                                    medias={profile.Markets || []}
                                />
                            </div>
                        </Tabs.Item>
                    </Tabs.Group>
                </Card>
            )}
        </div>
    );
};

export default MediasPageTabs;
