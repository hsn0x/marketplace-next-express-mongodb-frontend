import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { FaArrowUp } from "react-icons/fa";
import { getError } from "../../utils/error";
import { axiosServer } from "../../db/axios";
import { useSelector } from "react-redux";

const ProductBoxButtonsVote = ({ product }) => {
    const [vote, setVote] = useState(null);

    const { user } = useSelector(({ auth }) => auth);

    const handleProductButtonVote = async (ProductId) => {
        try {
            const { data } = await axiosServer.post("/votes", { ProductId });

            setVote(data.createdVote);
        } catch (error) {
            getError(error);
        }
    };
    const handleProductButtonUnVote = async (voteId) => {
        try {
            await axiosServer.delete(`/votes/${parseInt(voteId)}`);
            setVote(null);
        } catch (error) {
            getError(error);
        }
    };

    useEffect(() => {
        const isProductVoted = () => {
            return product.votes.find((vote) => vote.UserId === user?.id);
        };

        if (isProductVoted()) {
            setVote(isProductVoted());
        } else {
            setVote(0);
        }
    }, [product.votes, setVote, user?.id]);

    return (
        <div>
            <Button
                color={"gray"}
                pill={true}
                outline={vote ? false : true}
                onClick={() =>
                    vote
                        ? handleProductButtonUnVote(vote.id)
                        : handleProductButtonVote(product.id)
                }
            >
                <div>
                    <FaArrowUp />
                </div>
            </Button>
            <div className="text-center text-xl font-bold">
                {vote ? product.votes.length + 1 : product.votes?.length}
            </div>
        </div>
    );
};

export default ProductBoxButtonsVote;
