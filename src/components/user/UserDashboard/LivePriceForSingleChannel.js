import axios from "axios";
import { getSessionId } from "../../CommonAPI/User";
import CryptoJS from 'crypto-js';


const WS_URL = "wss://ws1.aliceblueonline.com/NorenWS";
const SESSION_API = "https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/ws/createWsSession";

const client_id = "YOUR_CLIENT_ID";
const api_key = "YOUR_API_KEY";

let ws = null;
let currentSocket = null; // Track the current active socket


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
            'Authorization': `Bearer ${userid} ${userSession1}`
        }
    });
};

async function ConnectSocket(onResponse, channelList, userId1, userSession1) {
    const url = "wss://ws1.aliceblueonline.com/NorenWS/";

    // Disconnect the old socket if it exists
    if (currentSocket) {
        currentSocket.close();
        currentSocket = null;
    }

    const socket = new WebSocket(url);
    currentSocket = socket; // Set the new socket as the current one

    socket.onopen = function () {
        const encrcptToken = CryptoJS.SHA256(CryptoJS.SHA256(userSession1).toString()).toString();
        const initCon = {
            susertoken: encrcptToken,
            t: "c",
            actid: userId1 + "_" + "API",
            uid: userId1 + "_" + "API",
            source: "API"
        };

        socket.send(JSON.stringify(initCon));
    };

    socket.onmessage = async function (msg) {
        const response = JSON.parse(msg.data);

        if (response.lp) {
            await onResponse(response);
        }

        if (response.s === 'OK') {
            const json = {
                k: channelList,
                t: 't'
            };

            await socket.send(JSON.stringify(json));
        }
    };

    socket.onclose = function () {
        console.log("Socket closed");
    };

    socket.onerror = function (error) {
        console.error("Socket error:", error);
    };
}

export const connectWebSocketForSingleChannel = async (instrument, onPriceUpdate) => {

    const type = { loginType: "API" };

    const credentials = await getSessionIdFromAPI();
    if (!credentials) return;

    // const { userId, sessionId } = credentials;

  let userId = "799513";
  let sessionId =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyam9lOFVScGxZU3FTcDB3RDNVemVBQkgxYkpmOE4wSDRDMGVVSWhXUVAwIn0.eyJleHAiOjE3NjA3NTY0MDYsImlhdCI6MTc1NTU3MjQwNiwianRpIjoiZDM0YWE3NzItMzgwMi00YmI2LTk5ZjktYmY2NGQ1ZTJmZDQ2IiwiaXNzIjoiaHR0cHM6Ly9pZGFhcy5hbGljZWJsdWVvbmxpbmUuY29tL2lkYWFzL3JlYWxtcy9BbGljZUJsdWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNGY1ODdjYmQtMjUzMC00ZDJkLWE4MTgtOTFlZjI4NjJjOWFlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWxpY2Uta2IiLCJzaWQiOiIwNzI2NDU3OS0xNzY5LTQ5YjctYjQwMC1mMmM0NDk5ZTQyYWQiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDozMDAyIiwiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiaHR0cDovL2xvY2FsaG9zdDo5OTQzIiwiaHR0cDovL2xvY2FsaG9zdDo5MDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtYWxpY2VibHVla2IiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFsaWNlLWtiIjp7InJvbGVzIjpbIkdVRVNUX1VTRVIiLCJBQ1RJVkVfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIG9wZW5pZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ1Y2MiOiI3OTk1MTMiLCJjbGllbnRSb2xlIjpbIkdVRVNUX1VTRVIiLCJBQ1RJVkVfVVNFUiJdLCJuYW1lIjoiS09NQUwgTUFMVkkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiI3OTk1MTMiLCJnaXZlbl9uYW1lIjoiS09NQUwiLCJmYW1pbHlfbmFtZSI6Ik1BTFZJIn0.b1j-XEadofxBlKaYu8KJy2sS20uAHscGC3jmTzJNNxIwYnuR6qeI-738hlT7MzUMo5lkhkbC59T0IR45igjD_49M8BMoiarGbdFF6lmtWgcreWmNPU2b7U4FJC3VdHl6zKL09hYcDXd6G-9nEpZI4Dj9X5E5tYFXonq1M28aSHK4nsjOagACxHuG7p9c8dUEQR1o6DX-cF3VJJfZBHhmKLP8L00SVxsbN3QzGJleOA144CulM0F0AAdxpUPjIGFRx3IsoHktxTs0aDLFBOEeN2YfxNUK8hKkyPohF9VGI2W7qZgBsPWpjBfWG_EAv959Ogh8rzA5qoaqEm3Lu7syaA";


    try {

        const res = await CreateSocketSession(type, userId, sessionId);
        const wsSession = res.data.result.wsSess;

        ConnectSocket(onPriceUpdate, instrument, userId, sessionId)

    } catch (error) {
        console.error("Error during WebSocket setup:", error);
    }
};