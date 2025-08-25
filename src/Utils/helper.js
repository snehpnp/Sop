import { GET_EXPIRY_DATE } from "../components/CommonAPI/Admin";
import { getToken } from "../components/CommonAPI/User";
import { connectWebSocketForSingleChannel } from "../components/user/UserDashboard/LivePriceForSingleChannel";

export const GetLivePricefromSymbol = async (exchange, symbol) => {
    let currentWebSocket = null;
    let livePrice = null;

    return new Promise((resolve, reject) => {
        const showLivePrice = async (singleChannel) => {
            if (currentWebSocket && typeof currentWebSocket.close === "function") {
                currentWebSocket.close();
            }
            currentWebSocket = connectWebSocketForSingleChannel(singleChannel, (data) => {
                if (data.lp && data.tk) {
                    livePrice = data.lp;
                    if (currentWebSocket && typeof currentWebSocket.close === "function") {
                        currentWebSocket.close();
                    }
                    resolve(livePrice);
                }
            });
        };

        const tokenMap = {};

        const getExpriyData = async (exchange, symbol) => {
            const data = { Exchange: exchange, Instrument: "FUTIDX", Symbol: symbol, Strike: "" };
            await GET_EXPIRY_DATE(data)
                .then((response) => {
                    if (response.Status) {
                        getTokenfn(response["Expiry Date"][0], symbol);
                    } else {
                        reject("Expiry date not found");
                    }
                })
                .catch((err) => {
                    console.log("Error in finding the Expriy Data", err);
                    reject(err);
                });
        };
        
        const getTokenfn = async (expiry, symbol) => {
            try {
                if (expiry && symbol) {
                    const res = await getToken({
                        Exchange: exchange,
                        Instrument: "FUTIDX",
                        Symbol: symbol,
                        OptionType: "",
                        Strike: "",
                        Expiry: expiry,
                    });

                    const token = Array.isArray(res?.Token) ? res.Token[0] : null;

                    if (token) {
                        const singleChannel = `NFO|${token}`;
                        tokenMap[token] = symbol;
                        showLivePrice(singleChannel);
                    } else {
                        console.warn("Token not found in response:", res);
                    }
                }
            } catch (error) {
                console.error("Error in getTokenfn:", error);
            }
        };


        getExpriyData(exchange, symbol);
    });
};