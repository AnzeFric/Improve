import Config from "react-native-config";

export const API_BASE_URL = `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api`;
export const OPENAI_API_KEY = Config.OPENAI_API_KEY;
