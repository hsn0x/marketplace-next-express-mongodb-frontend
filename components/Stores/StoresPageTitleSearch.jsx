import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { axiosServer } from "../../db/axios";
import { marketsSearchActions } from "../../redux/actions";
import { getError } from "../../utils/error";

const StoresPageTitleSearch = () => {
    const dispatch = useDispatch();
    const { markets, query, loading } = useSelector(
        ({ marketsSearch }) => marketsSearch
    );

    const {
        marketsSearchUpdateQuery,
        marketsSearchFetchFail,
        marketsSearchFetchRequest,
        marketsSearchFetchSuccess,
    } = bindActionCreators(marketsSearchActions, dispatch);

    const handleSearch = async (event) => {
        event.preventDefault();
        marketsSearchFetchRequest();
        try {
            const validQuery = query
                .trim()
                .split(" ")
                .filter((q) => q !== "")
                .join(" ");
            if (!validQuery) return;

            const { data } = await axiosServer.get(`/markets/q/${validQuery}`);
            marketsSearchFetchSuccess(data.rows);
        } catch (error) {
            marketsSearchFetchFail(getError(error));
        }
    };

    return (
        <div>
            <div className="w-96">
                <form onSubmit={(event) => handleSearch(event)}>
                    <div className="flex gap-1">
                        <div className="w-96">
                            <TextInput
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search for Store"
                                onChange={(event) =>
                                    marketsSearchUpdateQuery(event.target.value)
                                }
                            />
                        </div>
                        <div>
                            <Button type="submit">Search</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoresPageTitleSearch;
