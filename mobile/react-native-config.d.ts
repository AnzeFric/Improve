declare module "react-native-config" {
  export interface NativeConfig {
    API_DEVELOPMENT_IP?: string;
    API_PORT?: string;
    OPENAI_API_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
