import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";

const ProductBoxAction = ({ user, product }) => {
    return (
        <div>
            {user && user.id === product.UserId && (
                <div className="flex justify-end">
                    <div className="mr-2">
                        <Link href={`/products/edit/${product.slug}`} passHref>
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
                                onClick={() => handleProductDelete()}
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

export default ProductBoxAction;
