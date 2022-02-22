import { UDPPort } from 'osc';

const osc = new UDPPort({
    localAddress: '0.0.0.0',
    localPort: '09000',
    metadata: true,
});

export default osc;
