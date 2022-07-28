import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { axiosServer } from "../../db/axios";

const StoreBoxAction = ({ user, store }) => {
    const handleStoreDelete = async (storeId) => {
        await axiosServer.delete(`/markets/${storeId}`);
    };

    return (
        <div>
            {user && user.id === store.UserId && (
                <div className="flex justify-end">
                    <div className="mr-2">
                        <Link href={`/stores/edit/${store.slug}`} passHref>
                            <div>
                                <Button size="xs" color="info">
                                    <span className="mr-2">Edit</span>
                                    <FaPen />
                                </Button>
                            </div>
                        </Link>
                    </div>

                    <div>
                        <div>
                            <Button
                                size="xs"
                                color="failure"
                                onClick={() => handleStoreDelete(store._id)}
                            >
                                Delete
                                <FaTrash />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreBoxAction;
