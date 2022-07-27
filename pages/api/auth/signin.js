// pages/api/signin.js

import { withSessionRoute } from "../../../lib/withSession";
import nc from "next-connect";

const handler = nc();

async function loginRoute(req, res) {
    const authUser = req.body.user;
    if (authUser) {
        req.session.user = {
            ...authUser,
            Markets: [],
            Products: [],
            Comments: [],
            Reviews: [],
            Likes: [],
            Votes: [],
            Favorites: [],
        };
        await req.session.save();
        return res.send({ ok: true, message: "Logged in" });
    } else {
        return res.send({ ok: false, message: "Invalid user" });
    }
}

handler.post(withSessionRoute(loginRoute));

export default handler;
