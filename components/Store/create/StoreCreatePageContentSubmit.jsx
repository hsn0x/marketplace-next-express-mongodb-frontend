import { Button, Card, Checkbox, Label } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { axiosServer } from "../../../db/axios";
import { marketCreateActions } from "../../../redux/actions";
import { getError } from "../../../utils/error";

const StoreCreatePageContentSubmit = () => {
    const dispatch = useDispatch();
    const { create: marketCreate } = useSelector(
        ({ marketCreate }) => marketCreate
    );

    const handleCreateStore = async () => {
        try {
            const marketCreateData = {
                ...marketCreate,
                CategoriesIds: marketCreate.CategoriesIds.filter(
                    (p) => !isNaN(p)
                ),
            };
            await axiosServer.post("/markets", marketCreateData);
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
                        onClick={() => handleCreateStore()}
                    >
                        Create Store
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default StoreCreatePageContentSubmit;
