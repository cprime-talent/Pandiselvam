import { redirect } from "react-router-dom";
import store from "../store";
import { remove as removeBoard } from "../redux/slices/boardsSlice";

export async function action({ params }) {
    store.dispatch(removeBoard({ id: params.boardId }));

    return redirect(`/boards`);
}