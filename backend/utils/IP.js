import os from 'os';
import ip from 'ip';

const port = process.env.PORT || 3000;

export const IP = (req, res) => {
    let ips = '';

    try {
        const net = os.networkInterfaces();

        // Loop through network interfaces
        for (let i in net) {
            net[i].forEach((iface) => {
                // Only consider IPv4 addresses and ignore internal (loopback) addresses
                if (iface.family === 'IPv4' && !iface.internal) {
                    ips += `${i}: ${iface.address}\n`;
                }
            });
        }
    } catch (err) {
        // Use the 'ip' module as a fallback
        const ip = require('ip');
        ips = ip.address();
    } finally {
        // Send response with IP and port
        res.setHeader('Content-Type', 'text/plain');
        res.end(ips + ' port:' + port);
    }

    // try{
    //     let net=os.networkInterfaces();
    //     for (i in net){
    //         ips = ips.concat(i, ':', net[i][1].address, '\n');
    //     }
    // }
    // catch(err){
    //     ips = ip.address();
    // }
    // finally{
    //     res.end(ips+' port:'+port);
    // }
};
