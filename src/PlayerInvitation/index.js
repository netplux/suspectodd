import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { API_END_POINT } from "../utils";
import { toast, ToastContainer } from "react-toastify";

const PlayerInvitation = ({ socketObj }) => {
  const params = useParams();
  const history = useHistory();

  const { userId, gameId } = params;
  useEffect(() => {
    const url = `${API_END_POINT}/join-game`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        gameId,
        newUserId: sessionStorage.getItem("userId"),
      }),
    })
      .then(async (response) => {
        const res = await response.json();
        if (response.status >= 400 && response.status < 600) {
          throw new Error(res.error);
        } else {
          return res;
        }
      })
      .then((data) => {
        const { gameId, userId } = data;
        sessionStorage.setItem("userId", userId);
        if (socketObj) {
          socketObj.emit("friend-joined", { userId, gameId });
        }
        history.push({ pathname: `/games/${gameId}/lobby`, state: { gameId } });
      })
      .catch((error) => {
        toast.error(error.toString());
        console.log("the error is: =====", error);
      });
  }, [gameId, history, socketObj, userId]);

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default PlayerInvitation;
