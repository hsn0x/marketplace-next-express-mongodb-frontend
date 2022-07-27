import { Button, Card, Checkbox, Label } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { axiosServer } from "../../../db/axios";
import { marketEditActions } from "../../../redux/actions";
import { getError } from "../../../utils/error";

const StoreEditPageContentSubmit = () => {
    const dispatch = useDispatch();
    const { edit: marketEdit } = useSelector(({ marketEdit }) => marketEdit);
    const { market } = useSelector(({ market }) => market);

    const {} = bindActionCreators(marketEditActions, dispatch);

    const handleEditStore = async () => {
        try {
            const marketEditData = {
                ...marketEdit,
                CategoriesIds: marketEdit.CategoriesIds.filter(
                    (p) => !isNaN(p)
                ),
            };
            await axiosServer.put(`/markets/${market.id}`, marketEditData);
        } catch (error) {
            getError(error);
        }
    };

    return (
        <div>
            {" "}
            <div className="">
                <Card>
                    <div className="flex flex-col gap-4" id="checkbox">
                        <h2 className="text-lg font-bold underline">Submit</h2>
                        <div className="flex items-center gap-2">
                            <Checkbox id="accept" defaultChecked={true} />
                            <Label htmlFor="accept">
                                I agree to the
                                <a
                                    href="/forms"
                                    className="text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    terms and conditions
                                </a>
                            </Label>
                        </div>
                    </div>

                    <Button
                        gradientMonochrome="info"
                        onClick={() => handleEditStore()}
                    >
                        Update Store
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default StoreEditPageContentSubmit;
