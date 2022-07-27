import {
    Button,
    Card,
    Label,
    Rating,
    Textarea,
    TextInput,
} from "flowbite-react";
import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { reviewsActions } from "../../redux/actions";
import { axiosServer } from "../../db/axios";

const ProductPageTabsReviewsInsert = () => {
    const dispatch = useDispatch();
    const { rate, title, content } = useSelector(({ reviews }) => reviews);
    const { product, loading } = useSelector(({ product }) => product);

    const {
        updateProductReviewRate,
        updateProductReviewTitle,
        updateProductReviewContent,
    } = bindActionCreators(reviewsActions, dispatch);

    const handleReviewSave = (e) => {
        e.preventDefault();
        try {
            const review = axiosServer.post("/reviews", {
                rate,
                title,
                content,
                productId: product.id,
            });
        } catch (error) {}
    };
    return (
        <div>
            <Card>
                <form>
                    <div className="flex flex-col gap-1">
                        <div>
                            <h2 className="text-2xl font-bold">
                                Create Review
                            </h2>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="rating" value="Your Rating" />
                            </div>
                            <div>
                                <Rating size={"md"}>
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <span
                                            key={item}
                                            onClick={() =>
                                                updateProductReviewRate(item)
                                            }
                                            className="cursor-pointer"
                                        >
                                            <Rating.Star
                                                filled={
                                                    item > rate ? false : true
                                                }
                                            />
                                        </span>
                                    ))}
                                </Rating>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="title"
                                    value="Your Review Title"
                                />
                            </div>
                            <div>
                                <TextInput
                                    onChange={(event) =>
                                        updateProductReviewTitle(
                                            event.target.value
                                        )
                                    }
                                    id="title"
                                    type="text"
                                    placeholder="Review Title"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="content"
                                    value="Your Review Content"
                                />
                            </div>
                            <div>
                                <Textarea
                                    onChange={(event) =>
                                        updateProductReviewContent(
                                            event.target.value
                                        )
                                    }
                                    id="content"
                                    type="text"
                                    placeholder="Your Review Content"
                                />
                            </div>
                        </div>
                        <div>
                            <Button onClick={(e) => handleReviewSave(e)}>
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ProductPageTabsReviewsInsert;
