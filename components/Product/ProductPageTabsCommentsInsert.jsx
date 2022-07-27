import { Button, Card, Label, Textarea, TextInput } from "flowbite-react";
import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { commentsActions } from "../../redux/actions";
import { axiosServer } from "../../db/axios";

const ProductPageTabsCommentsInsert = () => {
    const dispatch = useDispatch();
    const { title, content } = useSelector(({ comments }) => comments);
    const { product, loading } = useSelector(({ product }) => product);

    const { updateProductCommentTitle, updateProductCommentContent } =
        bindActionCreators(commentsActions, dispatch);

    const handleCommentSave = (e) => {
        e.preventDefault();
        try {
            const comment = axiosServer.post("/comments", {
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
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="title"
                                    value="Your Comment Title"
                                />
                            </div>
                            <div>
                                <TextInput
                                    onChange={(event) =>
                                        updateProductCommentTitle(
                                            event.target.value
                                        )
                                    }
                                    id="title"
                                    type="text"
                                    placeholder="Comment Title"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="content"
                                    value="Your Comment Content"
                                />
                            </div>
                            <div>
                                <Textarea
                                    onChange={(event) =>
                                        updateProductCommentContent(
                                            event.target.value
                                        )
                                    }
                                    id="content"
                                    type="text"
                                    placeholder="Your Comment Content"
                                />
                            </div>
                        </div>
                        <div>
                            <Button onClick={(e) => handleCommentSave(e)}>
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ProductPageTabsCommentsInsert;
