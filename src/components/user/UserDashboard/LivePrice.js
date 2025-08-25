import axios from "axios";
import { getSessionId } from "../../CommonAPI/User";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";

const WS_URL = "wss://ws1.aliceblueonline.com/NorenWS";
const SESSION_API =
  "https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/ws/createWsSession";

const client_id = "YOUR_CLIENT_ID";
const api_key = "YOUR_API_KEY";

let ws = null;

export const getSessionIdFromAPI = async () => {
  try {
    const response = await getSessionId();
    return {
      userId: response.Userid,
      sessionId: response.Access_Token,

    };
  } catch (error) {
    console.error("Error fetching credentials:", error);
    return null;
  }
};

export async function CreateSocketSession(type, userid, userSession1) {
  return axios.post(SESSION_API, type, {
    headers: {
      Authorization: `Bearer ${userid} ${userSession1}`,
    },
  });
}
async function ConnectSocket(onResponse, channelList, userId, userSession) {
  const url = "wss://ws1.aliceblueonline.com/NorenWS/";
  let socket;

  socket = new WebSocket(url);

  socket.onopen = function () {
    var encrcptToken = CryptoJS.SHA256(
      CryptoJS.SHA256(userSession).toString()
    ).toString();

    var initCon = {
      susertoken: encrcptToken,
      t: "c",
      actid: userId + "_" + "API",
      uid: userId + "_" + "API",
      source: "API",
    };

    socket.send(JSON.stringify(initCon));
  };

 socket.onmessage = async function (msg) {
  try {
    var response = JSON.parse(msg.data);

    // Price Response
    if (response.lp) {
      await onResponse(response);
    }

    // Subscription ACK
    if (response.s === "OK") {

      if (Array.isArray(channelList) && channelList.length > 0) {
        for (let ch of channelList) {
          let json = { k: ch, t: "t" };
          socket.send(JSON.stringify(json));
        }
      } else if (typeof channelList === "string") {
        let json = { k: channelList, t: "t" };
        socket.send(JSON.stringify(json));
      }
    } else if (response.s === "not_ok") {
      console.error("Subscription Failed:", response); // 👈 यहाँ reason मिलेगा
    }
  } catch (err) {
    console.error("Message parse error:", err, msg.data);
  }
};


  socket.onerror = function (error) {
    console.error("WebSocket Error:", error);
  };
  socket.onclose = function (event) {
    if (event.wasClean) {
    } else {
      console.error("Connection closed unexpectedly");
    }
  };
}

export const connectWebSocket = async (
  credentials,
  instrument,
  onPriceUpdate
) => {
  const type = { loginType: "API" };

  if (!credentials || !credentials.userId || !credentials.sessionId) {
      credentials = await getSessionIdFromAPI();
  }

  // const { userId, sessionId } = credentials;



    let userId = "799513";
   let sessionId = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyam9lOFVScGxZU3FTcDB3RDNVemVBQkgxYkpmOE4wSDRDMGVVSWhXUVAwIn0.eyJleHAiOjE3NjEyNzQ4MDYsImlhdCI6MTc1NjA5MDgwNiwianRpIjoiNjdiYWU3YWItYmM1MC00MGFkLWJhMWEtOThhYTNlZjdiYjQ2IiwiaXNzIjoiaHR0cHM6Ly9pZGFhcy5hbGljZWJsdWVvbmxpbmUuY29tL2lkYWFzL3JlYWxtcy9BbGljZUJsdWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNGY1ODdjYmQtMjUzMC00ZDJkLWE4MTgtOTFlZjI4NjJjOWFlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWxpY2Uta2IiLCJzaWQiOiIxYjRlNDhiZS1jNjUzLTQzODktODhkNy03YzY2YjE1NzRjNmYiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDozMDAyIiwiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiaHR0cDovL2xvY2FsaG9zdDo5OTQzIiwiaHR0cDovL2xvY2FsaG9zdDo5MDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtYWxpY2VibHVla2IiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFsaWNlLWtiIjp7InJvbGVzIjpbIkdVRVNUX1VTRVIiLCJBQ1RJVkVfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIG9wZW5pZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ1Y2MiOiI3OTk1MTMiLCJjbGllbnRSb2xlIjpbIkdVRVNUX1VTRVIiLCJBQ1RJVkVfVVNFUiJdLCJuYW1lIjoiS09NQUwgTUFMVkkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiI3OTk1MTMiLCJnaXZlbl9uYW1lIjoiS09NQUwiLCJmYW1pbHlfbmFtZSI6Ik1BTFZJIn0.eChFEexcTM7dDg8mcwVJ8GGUOUMUHU3iYeLx2nMeM8_fAkfJFIpLO5jy1t9CQCrYxTyfwhNXAcNNwwjUnsBtyC3IRvt5dxT2JjnLgSCEA0opFIGMuTuHlz_mlxnfGAyCaOyapFDnQlgztrG8n_dfZkoaarediJDk6Cmgt0w5PiSrvUrROqJxzSlR6BpmPEmUjRRvO6_wLgRb_mciV6ZjdHrH91nnl_f1rxEi47rDUdP-Vdp-fBVHLi_djjGa7vDqXlwBBdlOxsIEKID-4-BRhpIXNMMLvosBxs_nagUe4_bPSaniOc2JkkG4U6jFWC6goCxHeqHzS9PbdEYitX-jcg";



  if (!userId || !sessionId) {
    Swal.fire("Error", "Missing userId or sessionId", "error");
    return;
  }

  try {
    const res = await CreateSocketSession(type, userId, sessionId);
  

    ConnectSocket(onPriceUpdate, instrument, userId, sessionId);
  } catch (error) {
    console.error("Error during WebSocket setup:", error);
  }
};
