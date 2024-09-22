import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
    pinataJwt: import.meta.env.VITE_PINATA_JWT,
    pinataGateway: `https://${import.meta.env.VITE_GATEWAY_URL}`
});

export default pinata;